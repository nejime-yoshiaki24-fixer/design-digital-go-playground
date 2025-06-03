import { resolve } from "path";
import { ErrorContext, StandardErrorResponse, StandardSuccessResponse, LogContext, ToolExecutionContext } from "../types.js";
import { ConfigManager } from "../config.js";

// ===== Structured Logging System =====
export class Logger {
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

  private formatLogMessage(level: string, operation: string, message: string, context?: LogContext): string {
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

  debug(operation: string, message: string, context?: LogContext): void {
    if (this.configManager.isLogLevelEnabled('DEBUG')) {
      // eslint-disable-next-line no-console
      console.log(this.formatLogMessage('DEBUG', operation, message, context));
    }
  }

  info(operation: string, message: string, context?: LogContext): void {
    if (this.configManager.isLogLevelEnabled('INFO')) {
      console.error(this.formatLogMessage('INFO', operation, message, context));
    }
  }

  warn(operation: string, message: string, context?: LogContext): void {
    if (this.configManager.isLogLevelEnabled('WARN')) {
      console.error(this.formatLogMessage('WARN', operation, message, context));
    }
  }

  error(operation: string, message: string, context?: LogContext): void {
    if (this.configManager.isLogLevelEnabled('ERROR')) {
      console.error(this.formatLogMessage('ERROR', operation, message, context));
    }
  }

  logToolExecution(toolName: string, params: ToolExecutionContext, duration?: number): void {
    const config = this.configManager.getConfig();
    const sanitizedParams = config.isDevelopment ? params : this.sanitizeLogParams(params);
    
    this.info('tool_execution', `Tool ${toolName} executed`, {
      tool: toolName,
      ...sanitizedParams,
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

  private sanitizeLogParams(params: ToolExecutionContext): ToolExecutionContext {
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

// ===== Unified Error Handler =====
export class DesignSystemErrorHandler {
  private static logger: Logger;
  private static configManager: ConfigManager;

  static createErrorContext(operation: string, component?: string, path?: string, details?: LogContext): ErrorContext {
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
    const errorDetails = config.isDevelopment ? {
      stack: error.stack,
      ...context.details
    } : context.details;

    if (this.logger) {
      this.logger.error(context.operation, error.message, {
        component: context.component,
        path: context.path,
        ...errorDetails
      });
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
    if ('code' in error && error.code === 'ENOENT') {
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