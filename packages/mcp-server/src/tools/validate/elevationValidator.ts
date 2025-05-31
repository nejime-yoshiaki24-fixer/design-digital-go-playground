import {
  VALID_ELEVATION,
  VALID_BORDER_RADIUS,
} from "../../core/constants/index.js";

export class ElevationValidator {
  constructor(
    private validElevation: Set<string> = VALID_ELEVATION,
    private validBorderRadius: Set<string> = VALID_BORDER_RADIUS,
  ) {}

  validate(cssContent: string): string[] {
    const issues: string[] = [];

    // box-shadowの検証
    const boxShadowMatches = cssContent.matchAll(/box-shadow:\s*([^;]+);/g);
    for (const match of boxShadowMatches) {
      const boxShadow = match[1]?.trim();
      if (!boxShadow) continue;

      // none, initial, inherit, unsetは許可
      if (["none", "initial", "inherit", "unset"].includes(boxShadow)) {
        continue;
      }

      // 承認済みのエレベーション値かチェック
      let isValid = false;
      for (const validShadow of this.validElevation) {
        // 値を正規化して比較（スペースや改行を統一）
        const normalizedValid = validShadow.replace(/\s+/g, " ").trim();
        const normalizedActual = boxShadow.replace(/\s+/g, " ").trim();

        if (normalizedValid === normalizedActual) {
          isValid = true;
          break;
        }
      }

      if (!isValid) {
        issues.push(`未承認のbox-shadow '${boxShadow}' が使用されています`);
      }
    }

    // border-radiusの検証
    const borderRadiusMatches = cssContent.matchAll(
      /border-radius:\s*([^;]+);/g,
    );
    for (const match of borderRadiusMatches) {
      const borderRadius = match[1]?.trim();
      if (!borderRadius) continue;

      // 承認済みの値かチェック
      if (
        !this.validBorderRadius.has(borderRadius) &&
        !["initial", "inherit", "unset"].includes(borderRadius)
      ) {
        // 複数値の場合（例: "8px 8px 0 0"）も検証
        const values = borderRadius.split(/\s+/);
        const allValid = values.every(
          (v) => this.validBorderRadius.has(v) || v === "0",
        );

        if (!allValid) {
          issues.push(
            `未承認のborder-radius '${borderRadius}' が使用されています。承認済み値: ${Array.from(this.validBorderRadius).join(", ")}`,
          );
        }
      }
    }

    // filter: drop-shadowの検証（もし使用されている場合）
    const dropShadowMatches = cssContent.matchAll(
      /filter:\s*drop-shadow\(([^)]+)\)/g,
    );
    for (const match of dropShadowMatches) {
      const dropShadow = match[1]?.trim();
      if (!dropShadow) continue;
      issues.push(
        `drop-shadowの使用は推奨されません。代わりにbox-shadowを使用してください: '${dropShadow}'`,
      );
    }

    return [...new Set(issues)];
  }
}

