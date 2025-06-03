// ===== All Type Definitions =====

// Design Token Types
export interface DesignTokens {
  colors: Record<string, any>;
  typography: Record<string, any>;
  spacing: Record<string, string>;
  elevation: Record<string, string>;
  borderRadius: Record<string, string>;
  breakpoints: Record<string, string>;
  grid: Record<string, any>;
}

// Server and Error Handling Types
export interface ErrorContext {
  operation: string;
  timestamp: string;
  component?: string;
  path?: string;
  details?: Record<string, any>;
}

export interface StandardErrorResponse {
  [key: string]: unknown;
  content: Array<{ type: "text"; text: string; [key: string]: unknown }>;
  isError: true;
}

export interface StandardSuccessResponse {
  [key: string]: unknown;
  content: Array<{ type: "text"; text: string; [key: string]: unknown }>;
  isError?: false;
}

export interface ServerConfig {
  tokensPath: string;
  logLevel: string;
  allowedPaths: string[];
  maxFileSize: number;
  isDevelopment: boolean;
  allowedOrigins: string[];
}
