/**
 * デザイントークン検証ユーティリティ
 * Figmaから取得したデザイントークンと実装の整合性をチェック
 */

// Figmaから取得したデザイントークン（デジタル庁デザインシステム）
export const FIGMA_DESIGN_TOKENS = {
  colors: {
    primary: '#0017C1',
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      420: '#949494',
      536: '#767676',
      333: '#333333',
    },
    error: '#D32F2F',
    hover: '#F5F5F5',
    disabled: 0.5, // opacity
  },
  typography: {
    fontFamily: "'Noto Sans JP', sans-serif",
    fontWeights: {
      regular: 400,
      bold: 700,
    },
    sizes: {
      small: 14,
      medium: 16,
      large: 18,
    },
    lineHeight: 1.3,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
  },
  components: {
    button: {
      padding: {
        small: '8px 12px',
        medium: '12px 16px',
        large: '16px', // Figma仕様
      },
      fontSize: {
        small: 14,
        medium: 16,
        large: 16, // Figma仕様
      },
      gap: 4,
      lineHeight: 1,
      letterSpacing: '0.02em',
    },
    checkbox: {
      sizes: {
        small: 20,
        medium: 32,
        large: 40,
      },
      borderWidth: 2,
      iconScale: 0.7, // アイコンのサイズ比率
    },
    divider: {
      colors: {
        'gray-420': '#949494',
        'gray-536': '#767676',
        'black': '#000000',
      },
      weights: {
        thin: 1,
        medium: 2,
        thick: 3,
        'extra-thick': 4,
      },
    },
    accordion: {
      borderColor: '#949494',
      padding: {
        header: '16px 16px 16px 0',
        content: '0 16px 16px 0',
      },
      iconSize: {
        desktop: 24,
        mobile: 20,
      },
    },
  },
};

// 実装とデザイントークンの整合性をチェックする関数
export function validateDesignTokens(componentName: string, actualStyles: CSSStyleDeclaration): {
  valid: boolean;
  mismatches: Array<{
    property: string;
    expected: string | number;
    actual: string;
  }>;
} {
  const mismatches: Array<{
    property: string;
    expected: string | number;
    actual: string;
  }> = [];

  // コンポーネント別の検証ロジック
  switch (componentName) {
    case 'button':
      // 背景色チェック
      if (actualStyles.backgroundColor !== 'rgb(0, 23, 193)') { // #0017C1
        mismatches.push({
          property: 'backgroundColor',
          expected: FIGMA_DESIGN_TOKENS.colors.primary,
          actual: actualStyles.backgroundColor,
        });
      }
      break;

    case 'checkbox':
      // ボーダー色チェック
      if (actualStyles.borderColor !== 'rgb(148, 148, 148)') { // #949494
        mismatches.push({
          property: 'borderColor',
          expected: FIGMA_DESIGN_TOKENS.colors.gray[420],
          actual: actualStyles.borderColor,
        });
      }
      break;

    case 'divider':
      // 実装に応じて検証
      break;

    case 'accordion':
      // 実装に応じて検証
      break;
  }

  return {
    valid: mismatches.length === 0,
    mismatches,
  };
}

// 視覚的な比較のためのメタデータ生成
export function generateVisualComparisonMetadata() {
  return {
    timestamp: new Date().toISOString(),
    figmaFile: '9j4ZiexATdYbwkE4CBIMGM',
    components: [
      {
        name: 'Button',
        figmaNodeId: '8392:32301',
        variants: ['solid', 'outline'],
        sizes: ['small', 'medium', 'large'],
      },
      {
        name: 'Checkbox',
        figmaNodeId: '62:19726',
        sizes: ['small', 'medium', 'large'],
        states: ['unchecked', 'checked', 'disabled'],
      },
      {
        name: 'Divider',
        figmaNodeId: '2206:4232',
        variants: ['solid', 'dashed'],
        colors: ['gray-420', 'gray-536', 'black'],
      },
      {
        name: 'Accordion',
        figmaNodeId: '8201:29125',
        states: ['collapsed', 'expanded'],
      },
    ],
  };
}