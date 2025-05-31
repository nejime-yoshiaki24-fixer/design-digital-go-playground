import { VALID_TYPOGRAPHY } from "../../core/constants/index.js";

type TypographyCategory = {
  [key: string]: {
    fontSize?: string;
    lineHeight?: string;
    fontWeight?: number;
    letterSpacing?: string;
    textDecoration?: string;
  };
};

export class TypographyValidator {
  constructor(private validTypography = VALID_TYPOGRAPHY) {}

  validate(cssContent: string): string[] {
    const issues: string[] = [];

    // フォントファミリーの検証
    const fontFamilyMatches = cssContent.matchAll(/font-family:\s*([^;]+);/g);
    for (const match of fontFamilyMatches) {
      const fontFamilyMatch = match[1];
      if (!fontFamilyMatch) continue;
      const fontFamily = fontFamilyMatch.trim().replace(/['"]/g, "");
      const validFonts = [
        this.validTypography.fontFamily.primary,
        this.validTypography.fontFamily.mono,
        "inherit",
        "initial",
        "unset",
      ];

      if (!validFonts.some((valid) => fontFamily.includes(valid))) {
        issues.push(
          `未承認のフォントファミリー '${fontFamily}' が使用されています`,
        );
      }
    }

    // フォントサイズの検証
    const fontSizeMatches = cssContent.matchAll(
      /font-size:\s*(\d+(?:\.\d+)?(?:px|rem|em))/g,
    );
    for (const match of fontSizeMatches) {
      const fontSize = match[1];
      if (!fontSize) continue;
      const validSizes = this.collectFontSizes();

      if (
        fontSize &&
        !validSizes.has(fontSize) &&
        !fontSize.includes("rem") &&
        !fontSize.includes("em")
      ) {
        issues.push(
          `未承認のフォントサイズ '${fontSize}' が使用されています。承認済みサイズ: ${Array.from(validSizes).join(", ")}`,
        );
      }
    }

    // フォントウェイトの検証
    const fontWeightMatches = cssContent.matchAll(
      /font-weight:\s*(\d+|normal|bold)/g,
    );
    for (const match of fontWeightMatches) {
      const fontWeight = match[1];
      if (!fontWeight) continue;
      const validWeights = Object.values(this.validTypography.fontWeight).map(
        String,
      );
      validWeights.push("normal", "bold", "inherit");

      if (!validWeights.includes(fontWeight)) {
        issues.push(
          `未承認のフォントウェイト '${fontWeight}' が使用されています`,
        );
      }
    }

    // line-heightの検証
    const lineHeightMatches = cssContent.matchAll(/line-height:\s*([^;]+);/g);
    for (const match of lineHeightMatches) {
      const lineHeightMatch = match[1];
      if (!lineHeightMatch) continue;
      const lineHeight = lineHeightMatch.trim();
      const validLineHeights = this.collectLineHeights();

      // 数値のみ、または承認済みの値を許可
      if (
        lineHeight &&
        !validLineHeights.has(lineHeight) &&
        !lineHeight.match(/^\d+(\.\d+)?$/) &&
        !["normal", "inherit", "initial"].includes(lineHeight)
      ) {
        issues.push(`未承認のline-height '${lineHeight}' が使用されています`);
      }
    }

    // letter-spacingの検証
    const letterSpacingMatches = cssContent.matchAll(
      /letter-spacing:\s*([^;]+);/g,
    );
    for (const match of letterSpacingMatches) {
      const letterSpacingMatch = match[1];
      if (!letterSpacingMatch) continue;
      const letterSpacing = letterSpacingMatch.trim();
      const validLetterSpacings = this.collectLetterSpacings();

      if (
        letterSpacing &&
        !validLetterSpacings.has(letterSpacing) &&
        !["normal", "inherit", "initial", "0"].includes(letterSpacing)
      ) {
        issues.push(
          `未承認のletter-spacing '${letterSpacing}' が使用されています`,
        );
      }
    }

    return [...new Set(issues)];
  }

  private collectFontSizes(): Set<string> {
    const sizes = new Set<string>();

    // Displayサイズ
    if (this.validTypography.display.fontSize) {
      sizes.add(this.validTypography.display.fontSize);
    }

    // Standard, Dense, Oneline, Mono, Linkの各サイズ
    const categories = ["standard", "dense", "oneline", "mono", "link"];
    categories.forEach((category) => {
      const categoryObj = this.validTypography[
        category as keyof typeof this.validTypography
      ] as TypographyCategory | undefined;
      if (categoryObj && typeof categoryObj === "object") {
        Object.values(categoryObj).forEach((value) => {
          if (
            typeof value === "object" &&
            value !== null &&
            "fontSize" in value &&
            value.fontSize
          ) {
            sizes.add(value.fontSize);
          }
        });
      }
    });

    return sizes;
  }

  private collectLineHeights(): Set<string> {
    const lineHeights = new Set<string>();

    // Displayのline-height
    if (this.validTypography.display.lineHeight) {
      lineHeights.add(this.validTypography.display.lineHeight);
    }

    // その他のカテゴリ
    const categories = ["standard", "dense", "oneline", "mono", "link"];
    categories.forEach((category) => {
      const categoryObj = this.validTypography[
        category as keyof typeof this.validTypography
      ] as TypographyCategory | undefined;
      if (categoryObj && typeof categoryObj === "object") {
        Object.values(categoryObj).forEach((value) => {
          if (
            typeof value === "object" &&
            value !== null &&
            "lineHeight" in value &&
            value.lineHeight
          ) {
            lineHeights.add(value.lineHeight);
          }
        });
      }
    });

    return lineHeights;
  }

  private collectLetterSpacings(): Set<string> {
    const letterSpacings = new Set<string>();

    // Displayのletter-spacing
    if (this.validTypography.display.letterSpacing) {
      letterSpacings.add(this.validTypography.display.letterSpacing);
    }

    // その他のカテゴリ
    const categories = ["standard", "dense", "oneline", "mono", "link"];
    categories.forEach((category) => {
      const categoryObj = this.validTypography[
        category as keyof typeof this.validTypography
      ] as TypographyCategory | undefined;
      if (categoryObj && typeof categoryObj === "object") {
        Object.values(categoryObj).forEach((value) => {
          if (
            typeof value === "object" &&
            value !== null &&
            "letterSpacing" in value &&
            value.letterSpacing
          ) {
            letterSpacings.add(value.letterSpacing);
          }
        });
      }
    });

    return letterSpacings;
  }
}

