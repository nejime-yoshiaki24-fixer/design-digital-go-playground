import { VALID_COLORS, VALID_SPACING } from "../../core/constants/index.js";

export class DesignTokenValidator {
  constructor(
    private validColors: Set<string> = VALID_COLORS as Set<string>,
    private validSpacing: Set<string> = VALID_SPACING as Set<string>,
  ) {}

  validate(cssContent: string): string[] {
    const issues: string[] = [];

    // Extract color values from CSS
    const colorMatches = cssContent.matchAll(
      /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g,
    );
    for (const match of colorMatches) {
      const color = match[0].toUpperCase();
      if (!this.validColors.has(color)) {
        issues.push(`未承認の色 '${color}' が使用されています`);
      }
    }

    // Extract spacing values
    const spacingMatches = cssContent.matchAll(/\b\d+px\b/g);
    for (const match of spacingMatches) {
      const spacing = match[0];
      if (!this.validSpacing.has(spacing)) {
        issues.push(`未承認のスペーシング '${spacing}' が使用されています`);
      }
    }

    return [...new Set(issues)]; // Remove duplicates
  }
}

