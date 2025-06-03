import { z } from "zod";
import { existsSync, promises as fs } from "fs";
import { DesignSystemErrorHandler, Logger } from "../core/utils.js";
import { DesignTokenValidator, ComponentAnalyzer } from "../core/providers.js";
import { ConfigManager } from "../config.js";
import { HealthStatus, HealthCheckResult } from "../types.js";

// ===== Constants =====
const MEMORY_WARNING_THRESHOLD_MB = 100;
const BYTES_TO_MB = 1024 * 1024;

// ===== Design Token Validation Tool =====
export function createValidateDesignTokensTool(
  designValidator: DesignTokenValidator,
  logger: Logger,
  config: ReturnType<ConfigManager['getConfig']>
) {
  return {
    schema: {
      css_content: z.string()
        .max(config.maxFileSize, `CSSコンテンツは${config.maxFileSize}文字以下である必要があります`)
        .describe("検証するCSSの内容"),
      component_name: z.string().optional()
        .transform(val => val ? DesignSystemErrorHandler.sanitizeInput(val) : val)
        .describe("コンポーネント名（オプション）"),
    },
    handler: async ({ css_content, component_name }: { css_content: string; component_name?: string }) => {
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
            content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
          };
        },
        context
      );
    }
  };
}

// ===== Component Structure Analysis Tool =====
export function createAnalyzeComponentStructureTool(
  componentAnalyzer: ComponentAnalyzer,
  logger: Logger,
  config: ReturnType<ConfigManager['getConfig']>
) {
  return {
    schema: {
      component_path: z.string()
        .transform(val => DesignSystemErrorHandler.sanitizeInput(val))
        .refine(val => DesignSystemErrorHandler.validateFilePath(val, config.allowedPaths), {
          message: "指定されたパスへのアクセスが許可されていません"
        })
        .describe("分析するコンポーネントのパス"),
    },
    handler: async ({ component_path }: { component_path: string }) => {
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
            content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
          };
        },
        context
      );
    }
  };
}

// ===== Health Check Tool =====
export function createHealthCheckTool(
  designValidator: DesignTokenValidator,
  logger: Logger,
  config: ReturnType<ConfigManager['getConfig']>
) {
  return {
    schema: {},
    handler: async () => {
      const startTime = Date.now();
      const context = DesignSystemErrorHandler.createErrorContext('health_check');

      return DesignSystemErrorHandler.handleToolError(
        async () => {
          const health: HealthStatus = {
            status: "healthy",
            timestamp: new Date().toISOString(),
            version: "1.0.0",
            service: "design-system-validator",
            checks: {} as Record<string, HealthCheckResult>,
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
            status: memUsage.heapUsed < MEMORY_WARNING_THRESHOLD_MB * BYTES_TO_MB ? "healthy" : "warning",
            heap_used_mb: Math.round(memUsage.heapUsed / BYTES_TO_MB),
            heap_total_mb: Math.round(memUsage.heapTotal / BYTES_TO_MB),
            external_mb: Math.round(memUsage.external / BYTES_TO_MB)
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
          const allChecks = Object.values(health.checks);
          const errorChecks = allChecks.filter(check => check.status === 'error');
          const warningChecks = allChecks.filter(check => check.status === 'warning');
          
          if (errorChecks.length > 0) {
            health.status = "unhealthy";
          } else if (warningChecks.length > 0) {
            health.status = "degraded";
          }

          // ヘルスチェック実行ログ
          logger.logToolExecution('health_check', {
            overall_status: health.status,
            checks_count: Object.keys(health.checks).length,
            errors: errorChecks.length,
            warnings: warningChecks.length
          }, duration);

          return {
            content: [{ type: "text" as const, text: JSON.stringify(health, null, 2) }],
          };
        },
        context
      );
    }
  };
}