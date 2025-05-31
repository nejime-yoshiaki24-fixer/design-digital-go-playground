import { VALID_BREAKPOINTS, VALID_GRID } from "../../core/constants/index.js";

export class LayoutValidator {
  constructor(
    private validBreakpoints = VALID_BREAKPOINTS,
    private validGrid = VALID_GRID,
  ) {}

  validate(cssContent: string): string[] {
    const issues: string[] = [];

    // メディアクエリのブレークポイント検証
    const mediaQueryMatches = cssContent.matchAll(
      /@media[^{]+\((?:min|max)-width:\s*(\d+)px\)/g,
    );
    const validBreakpointValues = Object.values(this.validBreakpoints)
      .filter((v): v is string => v !== undefined)
      .map((v) => parseInt(v));

    for (const match of mediaQueryMatches) {
      const breakpoint = parseInt(match[1]);

      // 許容範囲をチェック（完全一致または±1pxの差を許容）
      const isValid = validBreakpointValues.some(
        (valid) => Math.abs(breakpoint - valid) <= 1,
      );

      if (!isValid) {
        const closest = this.findClosestBreakpoint(breakpoint);
        issues.push(
          `非標準のブレークポイント '${breakpoint}px' が使用されています。` +
            `最も近い標準値: ${closest.name} (${closest.value})`,
        );
      }
    }

    // グリッドシステムの検証
    const gridColumnsMatches = cssContent.matchAll(
      /grid-template-columns:\s*repeat\((\d+),/g,
    );
    for (const match of gridColumnsMatches) {
      const columns = parseInt(match[1]);
      const validColumns = Object.values(this.validGrid.columns).filter(
        (v): v is number => v !== undefined,
      );

      if (!validColumns.includes(columns)) {
        issues.push(
          `非標準のグリッド列数 '${columns}' が使用されています。` +
            `標準値: ${validColumns.join(", ")}`,
        );
      }
    }

    // グリッドギャップの検証
    const gapMatches = cssContent.matchAll(
      /(?:gap|grid-gap|column-gap|row-gap):\s*(\d+px)/g,
    );
    const validGaps = Object.values(this.validGrid.gap).filter(
      (v): v is string => v !== undefined,
    );

    for (const match of gapMatches) {
      const gap = match[1];

      if (!validGaps.includes(gap)) {
        issues.push(
          `非標準のグリッドギャップ '${gap}' が使用されています。` +
            `標準値: ${validGaps.join(", ")}`,
        );
      }
    }

    // コンテナマージンの検証
    const marginMatches = cssContent.matchAll(
      /margin(?:-(?:left|right))?\s*:\s*(\d+px)/g,
    );
    const validMargins = Object.values(this.validGrid.margin).filter(
      (v): v is string => v !== undefined,
    );

    for (const match of marginMatches) {
      const margin = match[1];

      // auto, 0, または標準値を許可
      if (margin !== "0" && !validMargins.includes(margin)) {
        // 大きなマージン値の場合のみ警告（コンテナマージンの可能性）
        const marginValue = parseInt(margin);
        if (marginValue >= 16) {
          issues.push(
            `非標準のマージン '${margin}' が使用されています。` +
              `コンテナマージンの標準値: ${validMargins.join(", ")}`,
          );
        }
      }
    }

    // max-widthの検証（ブレークポイントと一致するべき）
    const maxWidthMatches = cssContent.matchAll(/max-width:\s*(\d+)px/g);

    for (const match of maxWidthMatches) {
      const maxWidth = parseInt(match[1]);

      // ブレークポイント値または一般的なコンテナ幅を許可
      const isValidBreakpoint = validBreakpointValues.some(
        (valid) => Math.abs(maxWidth - valid) <= 1,
      );

      // 一般的なコンテナ幅（ブレークポイント - マージン）も許可
      const commonContainerWidths = [
        1024 - 64, // tablet - margin
        1280 - 128, // desktop - margin
        1440 - 160, // wide - margin
        1920 - 240, // full - margin
      ];

      const isValidContainer = commonContainerWidths.some(
        (width) => Math.abs(maxWidth - width) <= 1,
      );

      if (!isValidBreakpoint && !isValidContainer && maxWidth > 600) {
        issues.push(
          `非標準のmax-width '${maxWidth}px' が使用されています。` +
            `ブレークポイントまたはコンテナ幅に合わせることを推奨します`,
        );
      }
    }

    return [...new Set(issues)];
  }

  private findClosestBreakpoint(value: number): {
    name: string;
    value: string;
  } {
    let closest = { name: "", value: "", diff: Infinity };

    for (const [name, breakpoint] of Object.entries(this.validBreakpoints)) {
      if (breakpoint !== undefined) {
        const bpValue = String(breakpoint);
        const diff = Math.abs(parseInt(bpValue) - value);
        if (diff < closest.diff) {
          closest = { name, value: bpValue, diff };
        }
      }
    }

    return { name: closest.name || "unknown", value: closest.value || "0" };
  }
}

