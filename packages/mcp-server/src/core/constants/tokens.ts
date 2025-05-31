import { readFileSync } from "fs";
import { DESIGN_TOKENS_PATH } from "./paths.js";
import type { DesignTokens } from "../types/index.js";

// デザイントークンを読み込み
const tokensJson = readFileSync(DESIGN_TOKENS_PATH, "utf-8");
export const DESIGN_TOKENS: DesignTokens = JSON.parse(tokensJson);

// カラー値を再帰的に収集する関数
function collectColorValues(
  obj: unknown,
  values: Set<string> = new Set(),
): Set<string> {
  if (!obj || typeof obj !== "object") return values;

  for (const key in obj as Record<string, unknown>) {
    const value = (obj as Record<string, unknown>)[key];
    if (typeof value === "string" && value.startsWith("#")) {
      values.add(value);
    } else if (typeof value === "object" && value !== null) {
      collectColorValues(value, values);
    }
  }
  return values;
}

// バリデーション用の定数
export const VALID_COLORS = collectColorValues(DESIGN_TOKENS.colors);

export const VALID_SPACING = new Set(Object.values(DESIGN_TOKENS.spacing));

export const VALID_TYPOGRAPHY = DESIGN_TOKENS.typography;

export const VALID_ELEVATION = new Set(Object.values(DESIGN_TOKENS.elevation));

export const VALID_BORDER_RADIUS = new Set(
  Object.values(DESIGN_TOKENS.borderRadius),
);

export const VALID_BREAKPOINTS = DESIGN_TOKENS.breakpoints;

export const VALID_GRID = DESIGN_TOKENS.grid;

