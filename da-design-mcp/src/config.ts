import { existsSync } from "fs";
import { join } from "path";
import { ServerConfig } from "./types.js";

// ===== Secure Configuration Management =====
export class ConfigManager {
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
    // More consistent path resolution - use dirname of current module
    const moduleDir = new URL('.', import.meta.url).pathname;
    
    return {
      tokensPath: process.env.DESIGN_TOKENS_PATH || 
                  join(moduleDir, "data", "tokens.json"),
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