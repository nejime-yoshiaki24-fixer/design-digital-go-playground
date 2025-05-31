import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { DesignTokens } from "../../core/types/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class DesignTokensProvider {
  private tokens: DesignTokens;

  constructor() {
    // Load design tokens from shared directory
    const tokensPath = join(__dirname, "../../../shared/design-tokens.json");
    this.tokens = JSON.parse(readFileSync(tokensPath, "utf-8"));
  }

  getTokens() {
    return this.tokens;
  }

  getColors() {
    return this.tokens.colors || {};
  }

  getSpacing() {
    return this.tokens.spacing || {};
  }

  getTypography() {
    return this.tokens.typography || {};
  }

  getElevation() {
    return this.tokens.elevation || {};
  }

  getBorderRadius() {
    return this.tokens.borderRadius || {};
  }

  getBreakpoints() {
    return this.tokens.breakpoints || {};
  }

  getGrid() {
    return this.tokens.grid || {};
  }

  getTransition() {
    return this.tokens.transition || {};
  }

  getZIndex() {
    return this.tokens.zIndex || {};
  }
}

