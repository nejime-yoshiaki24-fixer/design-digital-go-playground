#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, existsSync, readdirSync, promises as fs } from "fs";
import { join, resolve } from "path";

// ===== Types =====
interface DesignTokens {
  colors: Record<string, any>;
  typography: Record<string, any>;
  spacing: Record<string, string>;
  elevation: Record<string, string>;
  borderRadius: Record<string, string>;
  breakpoints: Record<string, string>;
  grid: Record<string, any>;
}

interface ErrorContext {
  operation: string;
  timestamp: string;
  component?: string;
  path?: string;
  details?: Record<string, any>;
}

interface StandardErrorResponse {
  [key: string]: unknown;
  content: Array<{ type: "text"; text: string; [key: string]: unknown }>;
  isError: true;
}

interface StandardSuccessResponse {
  [key: string]: unknown;
  content: Array<{ type: "text"; text: string; [key: string]: unknown }>;
  isError?: false;
}

// ===== Secure Configuration Management =====
interface ServerConfig {
  tokensPath: string;
  logLevel: string;
  allowedPaths: string[];
  maxFileSize: number;
  isDevelopment: boolean;
  allowedOrigins: string[];
}

class ConfigManager {
  private static instance: ConfigManager;
  private config: ServerConfig;

  private constructor() {
    this.config = this.loadSecureConfig();
    this.validateConfig();
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadSecureConfig(): ServerConfig {
    const currentDir = new URL('.', import.meta.url).pathname;
    
    return {
      tokensPath: process.env.DESIGN_TOKENS_PATH || 
                  join(currentDir, "../../design-tokens/tokens.json"),
      logLevel: process.env.LOG_LEVEL || "INFO",
      allowedPaths: process.env.ALLOWED_PATHS?.split(',').map(p => p.trim()) || [],
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "100000"), // 100KB default
      isDevelopment: process.env.NODE_ENV === 'development',
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || []
    };
  }

  private validateConfig(): void {
    // 必須ファイルの存在確認
    if (!existsSync(this.config.tokensPath)) {
      console.error(`[ConfigManager] Design tokens file not found: ${this.config.tokensPath}`);
      console.error(`[ConfigManager] Current working directory: ${process.cwd()}`);
      console.error(`[ConfigManager] Please check DESIGN_TOKENS_PATH environment variable or file location`);
      process.exit(1);
    }

    // ファイルサイズ制限の検証
    if (this.config.maxFileSize < 1000 || this.config.maxFileSize > 10000000) {
      console.warn(`[ConfigManager] MAX_FILE_SIZE ${this.config.maxFileSize} may be inappropriate. Recommended: 1000-10000000 bytes`);
    }

    // ログレベルの検証
    const validLogLevels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    if (!validLogLevels.includes(this.config.logLevel)) {
      console.warn(`[ConfigManager] Invalid LOG_LEVEL '${this.config.logLevel}'. Using 'INFO'. Valid levels: ${validLogLevels.join(', ')}`);
      this.config.logLevel = 'INFO';
    }

    console.error(`[ConfigManager] Configuration loaded successfully`);
    if (this.config.isDevelopment) {
      console.error(`[ConfigManager] Development mode enabled`);
    }
  }

  getConfig(): ServerConfig {
    return { ...this.config }; // 設定の不変性を保証
  }

  isLogLevelEnabled(level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'): boolean {
    const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    const currentIndex = levels.indexOf(this.config.logLevel);
    const requestedIndex = levels.indexOf(level);
    return requestedIndex >= currentIndex;
  }
}

// ===== Unified Error Handler =====
class DesignSystemErrorHandler {
  private static logger: Logger;
  private static configManager: ConfigManager;

  static createErrorContext(operation: string, component?: string, path?: string, details?: Record<string, any>): ErrorContext {
    return {
      operation,
      timestamp: new Date().toISOString(),
      component,
      path,
      details
    };
  }

  static logError(context: ErrorContext, error: Error): void {
    if (!this.configManager) {
      // Fallback to console.error if config is not available
      console.error(`[DesignSystemMCP] Error during ${context.operation}:`, error.message);
      return;
    }

    const config = this.configManager.getConfig();
    const errorContext = {
      component: context.component,
      path: context.path,
      details: config.isDevelopment ? {
        stack: error.stack,
        ...context.details
      } : context.details
    };

    if (this.logger) {
      this.logger.error(context.operation, error.message, errorContext);
    } else {
      console.error(`[DesignSystemMCP] Error during ${context.operation}:`, error.message);
    }
  }

  static initialize(logger: Logger, configManager: ConfigManager): void {
    this.logger = logger;
    this.configManager = configManager;
  }

  static async handleToolError<T>(
    operation: () => Promise<T>,
    context: ErrorContext,
    fallbackValue?: T
  ): Promise<StandardErrorResponse | StandardSuccessResponse | T> {
    try {
      return await operation();
    } catch (error) {
      this.logError(context, error as Error);
      
      if (fallbackValue !== undefined) {
        return fallbackValue;
      }
      
      const config = this.configManager?.getConfig();
      const errorMessage = config?.isDevelopment 
        ? `エラーが発生しました: ${(error as Error).message}` 
        : "処理中にエラーが発生しました。管理者にお問い合わせください。";
      
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            operation: context.operation,
            error: errorMessage,
            timestamp: context.timestamp,
            component: context.component
          }, null, 2)
        }],
        isError: true
      };
    }
  }

  static handleValidationError(error: Error, component: string): StandardErrorResponse {
    const context = this.createErrorContext('validation', component);
    this.logError(context, error);

    const config = this.configManager?.getConfig();
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          component,
          error: config?.isDevelopment ? error.message : "検証中にエラーが発生しました",
          timestamp: context.timestamp,
          type: "validation_error"
        }, null, 2)
      }],
      isError: true
    };
  }

  static handleComponentAnalysisError(error: Error, path: string): StandardErrorResponse {
    const context = this.createErrorContext('component_analysis', undefined, path);
    this.logError(context, error);
    
    // パス関連のエラーの場合は具体的なメッセージを提供
    if ((error as any).code === 'ENOENT') {
      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            path,
            error: `コンポーネントパス '${path}' が見つかりません`,
            timestamp: context.timestamp,
            type: "path_not_found"
          }, null, 2)
        }],
        isError: true
      };
    }
    
    // その他のエラーは一般的なメッセージ
    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          path,
          error: "コンポーネント分析中にエラーが発生しました",
          timestamp: context.timestamp,
          type: "analysis_error"
        }, null, 2)
      }],
      isError: true
    };
  }

  static handleResourceError(error: Error, resourceUri: string): StandardErrorResponse {
    const context = this.createErrorContext('resource_access', undefined, resourceUri);
    this.logError(context, error);

    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          resource: resourceUri,
          error: "リソースアクセス中にエラーが発生しました",
          timestamp: context.timestamp,
          type: "resource_error"
        }, null, 2)
      }],
      isError: true
    };
  }

  static sanitizeInput(input: string): string {
    // 基本的なサニタイゼーション
    return input
      .replace(/<script.*?>.*?<\/script>/gi, '') // スクリプトタグを除去
      .replace(/javascript:/gi, '') // javascript: プロトコルを除去
      .trim();
  }

  static validateFileSize(content: string, maxSize: number = 100000): boolean {
    return content.length <= maxSize;
  }

  static validateFilePath(path: string, allowedPaths: string[] = []): boolean {
    if (allowedPaths.length === 0) return false; // デフォルト拒否（セキュア）
    
    const absolutePath = resolve(path);
    return allowedPaths.some(allowed => absolutePath.startsWith(allowed));
  }
}

// ===== Constants & Utilities =====
const configManager = ConfigManager.getInstance();
const config = configManager.getConfig();

// Load design tokens with secure configuration
let DESIGN_TOKENS: DesignTokens;
try {
  const tokensJson = readFileSync(config.tokensPath, "utf-8");
  DESIGN_TOKENS = JSON.parse(tokensJson);
  console.error(`[DesignSystemMCP] Design tokens loaded from: ${config.tokensPath}`);
} catch (error) {
  const context = DesignSystemErrorHandler.createErrorContext('config_initialization', undefined, config.tokensPath);
  DesignSystemErrorHandler.logError(context, error as Error);
  console.error("Failed to load design tokens:", error);
  process.exit(1);
}

// Extract valid values for validation
function collectColorValues(obj: unknown, values: Set<string> = new Set()): Set<string> {
  if (!obj || typeof obj !== "object") return values;
  for (const key in obj as Record<string, unknown>) {
    const value = (obj as Record<string, unknown>)[key];
    if (typeof value === "string" && value.startsWith("#")) {
      values.add(value.toUpperCase());
    } else if (typeof value === "object" && value !== null) {
      collectColorValues(value, values);
    }
  }
  return values;
}

const VALID_COLORS = collectColorValues(DESIGN_TOKENS.colors);
const VALID_SPACING = new Set(Object.values(DESIGN_TOKENS.spacing));

// ===== Structured Logging System =====
class Logger {
  private static instance: Logger;
  private configManager: ConfigManager;

  private constructor() {
    this.configManager = ConfigManager.getInstance();
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatLogMessage(level: string, operation: string, message: string, context?: Record<string, any>): string {
    const config = this.configManager.getConfig();
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      service: 'DesignSystemMCP',
      operation,
      message,
      ...context
    };

    if (config.isDevelopment) {
      return JSON.stringify(logEntry, null, 2);
    } else {
      return JSON.stringify(logEntry);
    }
  }

  debug(operation: string, message: string, context?: Record<string, any>): void {
    if (this.configManager.isLogLevelEnabled('DEBUG')) {
      console.log(this.formatLogMessage('DEBUG', operation, message, context));
    }
  }

  info(operation: string, message: string, context?: Record<string, any>): void {
    if (this.configManager.isLogLevelEnabled('INFO')) {
      console.error(this.formatLogMessage('INFO', operation, message, context));
    }
  }

  warn(operation: string, message: string, context?: Record<string, any>): void {
    if (this.configManager.isLogLevelEnabled('WARN')) {
      console.error(this.formatLogMessage('WARN', operation, message, context));
    }
  }

  error(operation: string, message: string, context?: Record<string, any>): void {
    if (this.configManager.isLogLevelEnabled('ERROR')) {
      console.error(this.formatLogMessage('ERROR', operation, message, context));
    }
  }

  logToolExecution(toolName: string, params: Record<string, any>, duration?: number): void {
    const config = this.configManager.getConfig();
    const sanitizedParams = config.isDevelopment ? params : this.sanitizeLogParams(params);
    
    this.info('tool_execution', `Tool ${toolName} executed`, {
      tool: toolName,
      params: sanitizedParams,
      duration_ms: duration
    });
  }

  logResourceAccess(resourceUri: string, success: boolean, duration?: number): void {
    this.info('resource_access', `Resource ${resourceUri} accessed`, {
      resource: resourceUri,
      success,
      duration_ms: duration
    });
  }

  private sanitizeLogParams(params: Record<string, any>): Record<string, any> {
    const sanitized = { ...params };
    
    // CSSコンテンツやパスなどの機密情報をマスク
    if (sanitized.css_content && typeof sanitized.css_content === 'string') {
      sanitized.css_content = `[CSS_CONTENT_${sanitized.css_content.length}_CHARS]`;
    }
    
    if (sanitized.component_path && typeof sanitized.component_path === 'string') {
      sanitized.component_path = sanitized.component_path.split('/').slice(-2).join('/'); // 最後の2つのパスセグメントのみ
    }

    return sanitized;
  }
}

// ===== Design Token Provider =====
class DesignTokensProvider {
  getTokens() {
    return DESIGN_TOKENS;
  }

  getColors() {
    return DESIGN_TOKENS.colors;
  }

  getSpacing() {
    return DESIGN_TOKENS.spacing;
  }

  getTypography() {
    return DESIGN_TOKENS.typography;
  }

  getElevation() {
    return DESIGN_TOKENS.elevation;
  }

  getBorderRadius() {
    return DESIGN_TOKENS.borderRadius;
  }

  getBreakpoints() {
    return DESIGN_TOKENS.breakpoints;
  }

  getGrid() {
    return DESIGN_TOKENS.grid;
  }
}

// ===== Validators =====
class DesignTokenValidator {
  validate(cssContent: string): string[] {
    const issues: string[] = [];

    // Color validation
    const colorMatches = cssContent.matchAll(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g);
    for (const match of colorMatches) {
      const color = match[0].toUpperCase();
      if (!VALID_COLORS.has(color)) {
        issues.push(`未承認の色 '${color}' が使用されています`);
      }
    }

    // Spacing validation
    const spacingMatches = cssContent.matchAll(/\b\d+px\b/g);
    for (const match of spacingMatches) {
      const spacing = match[0];
      if (!VALID_SPACING.has(spacing)) {
        issues.push(`未承認のスペーシング '${spacing}' が使用されています`);
      }
    }

    return [...new Set(issues)];
  }
}

class ComponentAnalyzer {
  analyzeStructure(componentPath: string) {
    const result = {
      hasStyles: false,
      hasTests: false,
      hasStories: false,
      hasIndex: false,
      files: [] as string[]
    };

    try {
      const files = readdirSync(componentPath);
      result.files = files;
      
      // const componentName = componentPath.split("/").pop() ?? "";
      result.hasStyles = files.some(f => f.includes(".css"));
      result.hasTests = files.some(f => f.includes(".test.") || f.includes(".spec."));
      result.hasStories = files.some(f => f.includes(".stories."));
      result.hasIndex = files.includes("index.ts") || files.includes("index.tsx");
    } catch (error) {
      // Silently handle errors
    }

    return result;
  }
}

// ===== Initialize dependencies =====
const tokensProvider = new DesignTokensProvider();
const designValidator = new DesignTokenValidator();
const componentAnalyzer = new ComponentAnalyzer();
const logger = Logger.getInstance();

// Initialize the error handler with logger and config manager
DesignSystemErrorHandler.initialize(logger, configManager);

// ===== Create MCP Server =====
const server = new McpServer({
  name: "design-system-validator",
  version: "1.0.0",
});

// ===== Resources =====
server.resource(
  "design-tokens-all",
  "design-tokens://all",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(tokensProvider.getTokens(), null, 2),
      },
    ],
  }),
);

server.resource(
  "design-tokens-colors",
  "design-tokens://colors",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(tokensProvider.getColors(), null, 2),
      },
    ],
  }),
);

server.resource(
  "design-tokens-spacing",
  "design-tokens://spacing",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: JSON.stringify(tokensProvider.getSpacing(), null, 2),
      },
    ],
  }),
);

// ===== Tools =====
server.tool(
  "validate_design_tokens",
  {
    css_content: z.string()
      .max(config.maxFileSize, `CSSコンテンツは${config.maxFileSize}文字以下である必要があります`)
      .describe("検証するCSSの内容"),
    component_name: z.string().optional()
      .transform(val => val ? DesignSystemErrorHandler.sanitizeInput(val) : val)
      .describe("コンポーネント名（オプション）"),
  },
  async ({ css_content, component_name }) => {
    const startTime = Date.now();
    const context = DesignSystemErrorHandler.createErrorContext(
      'validate_design_tokens',
      component_name || 'Unknown',
      undefined,
      { css_length: css_content.length }
    );

    return DesignSystemErrorHandler.handleToolError(
      async () => {
        // 入力のサニタイゼーション
        const sanitizedCSS = DesignSystemErrorHandler.sanitizeInput(css_content);
        
        // バリデーション実行
        const issues = designValidator.validate(sanitizedCSS);
        const duration = Date.now() - startTime;
        
        // 実行ログ
        logger.logToolExecution('validate_design_tokens', {
          component_name,
          css_length: sanitizedCSS.length,
          issues_found: issues.length
        }, duration);
        
        const result = {
          component: component_name || "Unknown",
          is_compliant: issues.length === 0,
          issues,
          summary: issues.length === 0 
            ? "デザイントークンに完全に準拠しています ✓"
            : `${issues.length}件の準拠違反が見つかりました`,
          timestamp: new Date().toISOString(),
          duration_ms: duration
        };

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      },
      context
    );
  },
);

server.tool(
  "analyze_component_structure",
  {
    component_path: z.string()
      .transform(val => DesignSystemErrorHandler.sanitizeInput(val))
      .refine(val => DesignSystemErrorHandler.validateFilePath(val, config.allowedPaths), {
        message: "指定されたパスへのアクセスが許可されていません"
      })
      .describe("分析するコンポーネントのパス"),
  },
  async ({ component_path }) => {
    const startTime = Date.now();
    const context = DesignSystemErrorHandler.createErrorContext(
      'analyze_component_structure',
      undefined,
      component_path
    );

    return DesignSystemErrorHandler.handleToolError(
      async () => {
        // パスの存在確認
        if (!existsSync(component_path)) {
          // ENOENT エラーの場合は handleComponentAnalysisError で特別処理される
          return DesignSystemErrorHandler.handleComponentAnalysisError(
            Object.assign(new Error(`Component path '${component_path}' not found`), { code: 'ENOENT' }),
            component_path
          );
        }

        // 構造分析実行
        const structure = componentAnalyzer.analyzeStructure(component_path);
        const duration = Date.now() - startTime;
        
        // 推奨事項の生成
        const recommendations = [];
        if (!structure.hasStyles) {
          recommendations.push("スタイルファイル（.css または .module.css）を追加してください");
        }
        if (!structure.hasTests) {
          recommendations.push("テストファイル（.test.tsx または .spec.tsx）を追加してください");
        }
        if (!structure.hasStories) {
          recommendations.push("Storybookストーリー（.stories.tsx）を追加してください");
        }
        if (!structure.hasIndex) {
          recommendations.push("index.tsファイルを追加してエクスポートを整理してください");
        }

        // 実行ログ
        logger.logToolExecution('analyze_component_structure', {
          component_path,
          files_count: structure.files.length,
          recommendations_count: recommendations.length
        }, duration);

        const result = {
          path: component_path,
          structure,
          recommendations,
          timestamp: new Date().toISOString(),
          duration_ms: duration
        };

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      },
      context
    );
  },
);

// ===== Health Check Tool =====
server.tool(
  "health_check",
  {},
  async () => {
    const startTime = Date.now();
    const context = DesignSystemErrorHandler.createErrorContext('health_check');

    return DesignSystemErrorHandler.handleToolError(
      async () => {
        const health = {
          status: "healthy",
          timestamp: new Date().toISOString(),
          version: "1.0.0",
          service: "design-system-validator",
          checks: {} as Record<string, any>,
          duration_ms: 0
        };

        // デザイントークンファイルの存在確認（非同期）
        try {
          const tokensExist = existsSync(config.tokensPath);
          const tokensSize = tokensExist ? (await fs.readFile(config.tokensPath, 'utf-8')).length : 0;
          
          health.checks.design_tokens = {
            status: tokensExist ? "healthy" : "error",
            path: config.tokensPath,
            size_bytes: tokensSize,
            readable: tokensExist
          };
        } catch (error) {
          health.checks.design_tokens = {
            status: "error",
            error: "Failed to access design tokens file"
          };
          health.status = "degraded";
        }

        // 設定の検証
        health.checks.configuration = {
          status: "healthy",
          log_level: config.logLevel,
          max_file_size: config.maxFileSize,
          development_mode: config.isDevelopment,
          allowed_paths_count: config.allowedPaths.length
        };

        // メモリ使用量チェック
        const memUsage = process.memoryUsage();
        health.checks.memory = {
          status: memUsage.heapUsed < 100 * 1024 * 1024 ? "healthy" : "warning", // 100MB threshold
          heap_used_mb: Math.round(memUsage.heapUsed / 1024 / 1024),
          heap_total_mb: Math.round(memUsage.heapTotal / 1024 / 1024),
          external_mb: Math.round(memUsage.external / 1024 / 1024)
        };

        // バリデーター機能のテスト
        try {
          const testCSS = ".test { color: #0017C1; padding: 8px; }";
          const issues = designValidator.validate(testCSS);
          health.checks.validator = {
            status: "healthy",
            test_passed: issues.length === 0,
            validator_responsive: true
          };
        } catch (error) {
          health.checks.validator = {
            status: "error",
            error: "Validator test failed"
          };
          health.status = "degraded";
        }

        // 実行時間の記録
        const duration = Date.now() - startTime;
        health.duration_ms = duration;

        // 全体的なステータスの評価
        const errorChecks = Object.values(health.checks).filter(check => check.status === 'error');
        if (errorChecks.length > 0) {
          health.status = "unhealthy";
        } else {
          const warningChecks = Object.values(health.checks).filter(check => check.status === 'warning');
          if (warningChecks.length > 0) {
            health.status = "degraded";
          }
        }

        // ヘルスチェック実行ログ
        logger.logToolExecution('health_check', {
          overall_status: health.status,
          checks_count: Object.keys(health.checks).length,
          errors: errorChecks.length,
          warnings: Object.values(health.checks).filter(check => check.status === 'warning').length
        }, duration);

        return {
          content: [{ type: "text", text: JSON.stringify(health, null, 2) }],
        };
      },
      context
    );
  },
);

// ===== Prompts =====
server.prompt(
  "design_system_review",
  {
    component_name: z.string().optional().describe("コンポーネント名"),
    css_content: z.string().optional().describe("検証するCSS内容")
  },
  async ({ component_name, css_content }) => {
    const instructions = `
# デザインシステム準拠性レビュー

以下の手順でコンポーネントを包括的に検証してください：

## 1. デザイントークン検証
\`validate_design_tokens\` ツールを使用してCSSの準拠性を確認

## 2. 承認済みカラーパレット確認
\`design-tokens://colors\` リソースで承認済みカラーを確認

## 3. レポート生成
以下の形式でレポートを作成：

### ✅ 準拠項目
- 使用されている承認済みトークン

### ⚠️ 改善推奨項目  
- 未承認トークンの代替案
- 修正具体例

### 📋 チェックリスト
- [ ] カラートークン準拠
- [ ] スペーシング準拠
- [ ] タイポグラフィ準拠

${component_name ? `\n対象コンポーネント: ${component_name}` : ""}
${css_content ? `\n\nCSS:\n\`\`\`css\n${css_content}\n\`\`\`` : ""}
`;

    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text",
            text: instructions,
          },
        },
      ],
    };
  },
);

server.prompt(
  "component_audit",
  {
    component_path: z.string().optional().describe("監査するコンポーネントパス")
  },
  async ({ component_path }) => {
    const instructions = `
# コンポーネント構造監査

以下の手順でコンポーネント構造を監査してください：

## 1. 構造分析
\`analyze_component_structure\` ツールを使用して構造を分析

## 2. ベストプラクティス確認
- ファイル命名規則
- ディレクトリ構成
- 必須ファイルの存在

## 3. 改善提案
具体的な改善アクションプランを提示

## 4. 優先度評価
- 🔴 高優先度（必須）
- 🟡 中優先度（推奨）
- 🟢 低優先度（任意）

${component_path ? `\n対象パス: ${component_path}` : ""}
`;

    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text",
            text: instructions,
          },
        },
      ],
    };
  },
);

// ===== Start Server =====
const transport = new StdioServerTransport();
server.connect(transport).then(() => {
  console.error("Design System Validator MCP Server started");
}).catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
