// ===== All Type Definitions =====

// Design Token Types - Matching actual JSON structure
export type ColorValue = string;
export type ColorScale = Record<string, ColorValue>;
export type ColorToken = ColorValue | ColorScale | { 
  [key: string]: ColorValue | ColorScale;
};

export interface TypographyToken {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string;
}

export interface GridToken {
  columns?: number;
  gap?: string;
  margin?: string;
}

// Main design tokens interface matching actual data structure
export interface DesignTokens {
  colors: Record<string, ColorToken>;
  typography?: Record<string, TypographyToken>;
  spacing?: Record<string, string>;
  elevation?: Record<string, string>;
  borderRadius?: Record<string, string>;
  breakpoints?: Record<string, string>;
  grid?: Record<string, GridToken>;
}

// Logging Types
export interface LogContext {
  [key: string]: string | number | boolean | undefined;
}

export interface ToolExecutionContext extends LogContext {
  component_name?: string;
  css_length?: number;
  issues_found?: number;
  component_path?: string;
  files_count?: number;
  recommendations_count?: number;
  overall_status?: string;
  checks_count?: number;
  errors?: number;
  warnings?: number;
}

// Health Check Types
export interface HealthCheckResult {
  status: "healthy" | "error" | "warning" | "degraded";
  [key: string]: string | number | boolean | undefined;
}

export interface HealthStatus {
  status: string;
  timestamp: string;
  version: string;
  service: string;
  checks: Record<string, HealthCheckResult>;
  duration_ms: number;
}

// Server and Error Handling Types
export interface ErrorContext {
  operation: string;
  timestamp: string;
  component?: string;
  path?: string;
  details?: LogContext;
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