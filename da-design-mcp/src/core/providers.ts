import { readFileSync, readdirSync } from "fs";
import { DesignTokens } from "../types.js";
import { ConfigManager } from "../config.js";

// ===== Design Token Provider =====
export class DesignTokensProvider {
  private tokens!: DesignTokens;
  private validColors!: Set<string>;
  private validSpacing!: Set<string>;

  constructor() {
    this.loadTokens();
    this.initializeValidationSets();
  }

  private loadTokens(): void {
    const configManager = ConfigManager.getInstance();
    const config = configManager.getConfig();

    try {
      const tokensJson = readFileSync(config.tokensPath, "utf-8");
      this.tokens = JSON.parse(tokensJson);
      console.error(`[DesignSystemMCP] Design tokens loaded from: ${config.tokensPath}`);
    } catch (error) {
      console.error("Failed to load design tokens:", error);
      process.exit(1);
    }
  }

  private initializeValidationSets(): void {
    this.validColors = this.collectColorValues(this.tokens.colors);
    this.validSpacing = new Set(Object.values(this.tokens.spacing));
  }

  private collectColorValues(obj: unknown, values: Set<string> = new Set()): Set<string> {
    if (!obj || typeof obj !== "object") return values;
    for (const key in obj as Record<string, unknown>) {
      const value = (obj as Record<string, unknown>)[key];
      if (typeof value === "string" && value.startsWith("#")) {
        values.add(value.toUpperCase());
      } else if (typeof value === "object" && value !== null) {
        this.collectColorValues(value, values);
      }
    }
    return values;
  }

  getTokens(): DesignTokens {
    return this.tokens;
  }

  getColors() {
    return this.tokens.colors;
  }

  getSpacing() {
    return this.tokens.spacing;
  }

  getTypography() {
    return this.tokens.typography;
  }

  getElevation() {
    return this.tokens.elevation;
  }

  getBorderRadius() {
    return this.tokens.borderRadius;
  }

  getBreakpoints() {
    return this.tokens.breakpoints;
  }

  getGrid() {
    return this.tokens.grid;
  }

  getValidColors(): Set<string> {
    return this.validColors;
  }

  getValidSpacing(): Set<string> {
    return this.validSpacing;
  }
}

// ===== Design Token Validator =====
export class DesignTokenValidator {
  private tokensProvider: DesignTokensProvider;

  constructor(tokensProvider: DesignTokensProvider) {
    this.tokensProvider = tokensProvider;
  }

  validate(cssContent: string): string[] {
    const issues: string[] = [];
    const validColors = this.tokensProvider.getValidColors();
    const validSpacing = this.tokensProvider.getValidSpacing();

    // Color validation
    const colorMatches = cssContent.matchAll(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g);
    for (const match of colorMatches) {
      const color = match[0].toUpperCase();
      if (!validColors.has(color)) {
        issues.push(`未承認の色 '${color}' が使用されています`);
      }
    }

    // Spacing validation
    const spacingMatches = cssContent.matchAll(/\b\d+px\b/g);
    for (const match of spacingMatches) {
      const spacing = match[0];
      if (!validSpacing.has(spacing)) {
        issues.push(`未承認のスペーシング '${spacing}' が使用されています`);
      }
    }

    return [...new Set(issues)];
  }
}

// ===== Component Analyzer =====
export class ComponentAnalyzer {
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