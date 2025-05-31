#!/usr/bin/env node

/**
 * Figmaの詳細データから完全なデザイントークンを生成
 */

const fs = require('fs').promises;
const path = require('path');

// Figmaから抽出した完全なカラーパレット
const COLOR_PALETTE = {
  blue: {
    50: '#E8F1FE',
    100: '#D9E6FF',
    200: '#C5D7FB',
    300: '#9DB7F9',
    400: '#7096F8',
    500: '#4979F5',
    600: '#3460FB',
    700: '#264AF4',
    800: '#0031D8',
    900: '#0017C1',
    1000: '#00118F',
    1100: '#000071',
    1200: '#000060'
  },
  lightBlue: {
    50: '#F0F9FF',
    100: '#DCF0FF',
    200: '#C0E4FF',
    300: '#97D3FF',
    400: '#57B8FF',
    500: '#39ABFF',
    600: '#008BF2',
    700: '#0877D7',
    800: '#0066BE',
    900: '#0055AD',
    1000: '#00428C',
    1100: '#00316A',
    1200: '#00234B'
  },
  cyan: {
    50: '#E9F7F9',
    100: '#C8F8FF',
    200: '#99F2FF',
    300: '#79E2F2',
    400: '#2BC8E4',
    500: '#01B7D6',
    600: '#00A3BF',
    700: '#008DA6',
    800: '#008299',
    900: '#006F83',
    1000: '#006173',
    1100: '#004C59',
    1200: '#003741'
  },
  green: {
    50: '#E6F5EC',
    100: '#C2E5D1',
    200: '#9BD4B5',
    300: '#71C598',
    400: '#51B883',
    500: '#2CAC6E',
    600: '#259D63',
    700: '#1D8B56',
    800: '#197A4B',
    900: '#115A36',
    1000: '#0C472A',
    1100: '#08351F',
    1200: '#032213'
  },
  lime: {
    50: '#EBFAD9',
    100: '#D0F5A2',
    200: '#C0F354',
    300: '#ADE830',
    400: '#9DDD15',
    500: '#8CC80C',
    600: '#7EB40D',
    700: '#6FA104',
    800: '#618E00',
    900: '#507500',
    1000: '#3E5A00',
    1100: '#2C4100',
    1200: '#1E2D00'
  },
  yellow: {
    50: '#FBF5E0',
    100: '#FFF0B3',
    200: '#FFE380',
    300: '#FFD43D',
    400: '#FFC700',
    500: '#EBB700',
    600: '#D2A400',
    700: '#B78F00',
    800: '#A58000',
    900: '#927200',
    1000: '#806300',
    1100: '#6E5600',
    1200: '#604B00'
  },
  orange: {
    50: '#FFEEE2',
    100: '#FFDFCA',
    200: '#FFC199',
    300: '#FFA66D',
    400: '#FF8D44',
    500: '#FF7628',
    600: '#FB5B01',
    700: '#E25100',
    800: '#C74700',
    900: '#AC3E00',
    1000: '#8B3200',
    1100: '#6D2700',
    1200: '#541E00'
  },
  red: {
    50: '#FDEEEE',
    100: '#FFDADA',
    200: '#FFBBBB',
    300: '#FF9696',
    400: '#FF7171',
    500: '#FF5454',
    600: '#FE3939',
    700: '#FA0000',
    800: '#EC0000',
    900: '#CE0000',
    1000: '#A90000',
    1100: '#850000',
    1200: '#620000'
  },
  magenta: {
    50: '#F3E5F4',
    100: '#FFD0FF',
    200: '#FFAEFF',
    300: '#FF8EFF',
    400: '#F661F6',
    500: '#F137F1',
    600: '#DB00DB',
    700: '#C000C0',
    800: '#AA00AA',
    900: '#8B008B',
    1000: '#6C006C',
    1100: '#500050',
    1200: '#3B003B'
  },
  purple: {
    50: '#F1EAFA',
    100: '#ECDDFF',
    200: '#DDC2FF',
    300: '#CDA6FF',
    400: '#BB87FF',
    500: '#A565F8',
    600: '#8843E1',
    700: '#6F23D0',
    800: '#5C10BE',
    900: '#5109AD',
    1000: '#41048E',
    1100: '#30016C',
    1200: '#21004B'
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F2F2F2',
    100: '#F0F0F0',
    200: '#EBEBEB',
    300: '#D9D9D9',
    400: '#B8B8B8',
    500: '#949494',
    600: '#767676',
    700: '#595959',
    800: '#333333',
    900: '#1A1A1C',
    1000: '#000000'
  }
};

async function generateCompleteTokens() {
  console.log('🎨 完全なデザイントークンを生成します...\n');

  const tokens = {
    colors: {
      // プライマリカラー（Blue-900, Blue-1000）
      primary: COLOR_PALETTE.blue[900],
      secondary: COLOR_PALETTE.blue[1000],
      
      // 完全なカラーパレット
      blue: COLOR_PALETTE.blue,
      lightBlue: COLOR_PALETTE.lightBlue,
      cyan: COLOR_PALETTE.cyan,
      green: COLOR_PALETTE.green,
      lime: COLOR_PALETTE.lime,
      yellow: COLOR_PALETTE.yellow,
      orange: COLOR_PALETTE.orange,
      red: COLOR_PALETTE.red,
      magenta: COLOR_PALETTE.magenta,
      purple: COLOR_PALETTE.purple,
      
      // ニュートラルカラー
      neutral: COLOR_PALETTE.neutral,
      
      // テキストカラー
      text: {
        primary: COLOR_PALETTE.neutral[800], // #333333
        secondary: COLOR_PALETTE.neutral[700], // #595959
        tertiary: COLOR_PALETTE.neutral[600], // #767676
        disabled: COLOR_PALETTE.neutral[400], // #B8B8B8
        onDark: COLOR_PALETTE.neutral[0], // #FFFFFF
        mono: COLOR_PALETTE.neutral[900], // #1A1A1C
        link: {
          default: COLOR_PALETTE.blue[900], // #0017C1
          hover: COLOR_PALETTE.blue[1000], // #00118F
          visited: COLOR_PALETTE.purple[900], // #5109AD
          active: COLOR_PALETTE.red[900] // #CE0000
        }
      },
      
      // 背景カラー
      background: {
        primary: COLOR_PALETTE.neutral[0], // #FFFFFF
        secondary: '#F5F5F5',
        tertiary: COLOR_PALETTE.neutral[50], // #F2F2F2
        quaternary: COLOR_PALETTE.neutral[200], // #EBEBEB
        dark: COLOR_PALETTE.neutral[900], // #1A1A1C
        accent: '#CCCCCC',
        surface: COLOR_PALETTE.neutral[100] // #F0F0F0
      },
      
      // ボーダーカラー
      border: {
        default: COLOR_PALETTE.neutral[300], // #D9D9D9
        light: '#E6E6E6',
        focused: COLOR_PALETTE.blue[900], // #0017C1
        divider: COLOR_PALETTE.neutral[500] // #949494
      },
      
      // セマンティックカラー
      semantic: {
        error: {
          main: COLOR_PALETTE.red[900], // #CE0000
          light: COLOR_PALETTE.orange[600], // #FB5B01
          dark: COLOR_PALETTE.red[800], // #EC0000
          background: COLOR_PALETTE.red[50] // #FDEEEE
        },
        warning: {
          main: COLOR_PALETTE.yellow[700], // #B78F00
          light: COLOR_PALETTE.yellow[400], // #FFC700
          dark: COLOR_PALETTE.yellow[900], // #927200
          background: COLOR_PALETTE.yellow[50] // #FBF5E0
        },
        success: {
          main: COLOR_PALETTE.green[600], // #259D63
          light: COLOR_PALETTE.green[400], // #51B883
          dark: COLOR_PALETTE.green[800], // #197A4B
          background: COLOR_PALETTE.green[50] // #E6F5EC
        },
        info: {
          main: COLOR_PALETTE.lightBlue[600], // #008BF2
          light: COLOR_PALETTE.lightBlue[400], // #57B8FF
          dark: COLOR_PALETTE.lightBlue[800], // #0066BE
          background: COLOR_PALETTE.lightBlue[50] // #F0F9FF
        },
        alert: {
          main: COLOR_PALETTE.orange[600], // #FB5B01
          dark: COLOR_PALETTE.orange[800] // #C74700
        }
      }
    },
    
    typography: {
      fontFamily: {
        primary: 'Noto Sans JP',
        mono: 'monospace',
        fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700
      },
      display: {
        fontSize: '45px',
        lineHeight: '1.4',
        fontWeight: 700,
        letterSpacing: '0'
      },
      standard: {
        xlarge: {
          fontSize: '32px',
          lineHeight: '1.5',
          fontWeight: 700,
          letterSpacing: '0.01em'
        },
        large: {
          fontSize: '28px',
          lineHeight: '1.5',
          fontWeight: 700,
          letterSpacing: '0.01em'
        },
        medium: {
          fontSize: '20px',
          lineHeight: '1.5',
          fontWeight: 700,
          letterSpacing: '0'
        },
        base: {
          fontSize: '16px',
          lineHeight: '1.7',
          fontWeight: 400,
          letterSpacing: '0.02em'
        },
        small: {
          fontSize: '14px',
          lineHeight: '1.5',
          fontWeight: 400,
          letterSpacing: '0.005em'
        }
      },
      dense: {
        xlarge: {
          fontSize: '28px',
          lineHeight: '1.3',
          fontWeight: 700,
          letterSpacing: '0'
        },
        large: {
          fontSize: '24px',
          lineHeight: '1.3',
          fontWeight: 700,
          letterSpacing: '0'
        },
        medium: {
          fontSize: '18px',
          lineHeight: '1.3',
          fontWeight: 700,
          letterSpacing: '0'
        },
        base: {
          fontSize: '14px',
          lineHeight: '1.5',
          fontWeight: 400,
          letterSpacing: '0.01em'
        }
      },
      oneline: {
        xlarge: {
          fontSize: '28px',
          lineHeight: '1',
          fontWeight: 700,
          letterSpacing: '0'
        },
        large: {
          fontSize: '24px',
          lineHeight: '1',
          fontWeight: 700,
          letterSpacing: '0'
        },
        medium: {
          fontSize: '18px',
          lineHeight: '1',
          fontWeight: 700,
          letterSpacing: '0'
        },
        base: {
          fontSize: '14px',
          lineHeight: '1',
          fontWeight: 400,
          letterSpacing: '0'
        }
      },
      mono: {
        large: {
          fontSize: '18px',
          lineHeight: '1.5',
          fontWeight: 400,
          letterSpacing: '0'
        },
        base: {
          fontSize: '14px',
          lineHeight: '1.5',
          fontWeight: 400,
          letterSpacing: '0'
        }
      },
      link: {
        standard: {
          fontSize: '16px',
          lineHeight: '1.7',
          fontWeight: 400,
          letterSpacing: '0.02em',
          textDecoration: 'underline'
        },
        dense: {
          fontSize: '14px',
          lineHeight: '1.5',
          fontWeight: 400,
          letterSpacing: '0.01em',
          textDecoration: 'underline'
        },
        oneline: {
          fontSize: '14px',
          lineHeight: '1',
          fontWeight: 400,
          letterSpacing: '0',
          textDecoration: 'underline'
        }
      }
    },
    
    spacing: {
      xxs: '2px',
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
      xxxl: '64px',
      huge: '80px',
      massive: '120px'
    },
    
    elevation: {
      none: 'none',
      level1: '0px 1px 5px 0px rgba(0, 0, 0, 0.3), 0px 2px 8px 1px rgba(0, 0, 0, 0.1)',
      level2: '0px 1px 6px 0px rgba(0, 0, 0, 0.3), 0px 2px 12px 2px rgba(0, 0, 0, 0.1)',
      level3: '0px 1px 6px 0px rgba(0, 0, 0, 0.3), 0px 4px 16px 3px rgba(0, 0, 0, 0.1)',
      level4: '0px 2px 6px 0px rgba(0, 0, 0, 0.3), 0px 6px 20px 4px rgba(0, 0, 0, 0.1)',
      level5: '0px 2px 10px 0px rgba(0, 0, 0, 0.3), 0px 8px 24px 5px rgba(0, 0, 0, 0.1)',
      level6: '0px 3px 12px 0px rgba(0, 0, 0, 0.3), 0px 10px 30px 6px rgba(0, 0, 0, 0.1)',
      level7: '0px 3px 14px 0px rgba(0, 0, 0, 0.3), 0px 12px 36px 7px rgba(0, 0, 0, 0.1)',
      level8: '0px 3px 16px 0px rgba(0, 0, 0, 0.3), 0px 14px 40px 7px rgba(0, 0, 0, 0.1)',
      simple: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
    },
    
    borderRadius: {
      none: '0px',
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      round: '50%'
    },
    
    breakpoints: {
      mobile: '767px',
      tablet: '1024px',
      desktop: '1280px',
      wide: '1440px',
      full: '1920px'
    },
    
    grid: {
      columns: {
        mobile: 4,
        tablet: 8,
        desktop: 12,
        wide: 12,
        full: 12
      },
      gap: {
        mobile: '16px',
        tablet: '24px',
        desktop: '24px',
        wide: '32px',
        full: '32px'
      },
      margin: {
        mobile: '16px',
        tablet: '32px',
        desktop: '64px',
        wide: '80px',
        full: '120px'
      }
    },
    
    zIndex: {
      base: 0,
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      modalBackdrop: 1040,
      modal: 1050,
      popover: 1060,
      tooltip: 1070
    },
    
    transition: {
      duration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms'
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
      }
    },
    
    // コンポーネント固有のトークン
    components: {
      button: {
        padding: {
          small: '8px 16px',
          medium: '12px 24px',
          large: '16px 32px'
        },
        borderRadius: '8px',
        minHeight: {
          small: '32px',
          medium: '40px',
          large: '48px'
        },
        fontSize: {
          small: '14px',
          medium: '16px',
          large: '18px'
        }
      },
      input: {
        padding: '12px 16px',
        borderRadius: '8px',
        borderWidth: '1px',
        minHeight: '48px',
        fontSize: '16px'
      },
      checkbox: {
        size: '20px',
        borderRadius: '4px',
        borderWidth: '2px',
        checkmarkWidth: '3px'
      },
      radio: {
        size: '20px',
        innerSize: '8px',
        borderWidth: '2px'
      },
      table: {
        cellPadding: '16px',
        borderWidth: '1px',
        headerBackground: COLOR_PALETTE.neutral[100],
        stripedBackground: COLOR_PALETTE.neutral[50]
      },
      divider: {
        thickness: {
          thin: '1px',
          medium: '2px',
          thick: '4px'
        },
        style: {
          solid: 'solid',
          dashed: 'dashed',
          dotted: 'dotted'
        }
      },
      accordion: {
        padding: '16px',
        borderRadius: '8px',
        borderWidth: '1px',
        iconSize: '24px'
      }
    }
  };

  // ファイルに保存
  const tokensPath = path.join(__dirname, '../design-tokens/tokens.json');
  await fs.writeFile(tokensPath, JSON.stringify(tokens, null, 2));
  
  console.log('✅ 完全なデザイントークンを生成しました');
  console.log(`   保存先: ${tokensPath}`);
  
  // サマリーを表示
  console.log('\n📊 生成されたトークンのサマリー:');
  console.log(`   カラーパレット: ${Object.keys(COLOR_PALETTE).length}種類`);
  console.log(`   各色の階調: 最大13段階（50-1200）`);
  console.log(`   タイポグラフィ: ${Object.keys(tokens.typography).length}カテゴリ`);
  console.log(`   スペーシング: ${Object.keys(tokens.spacing).length}段階`);
  console.log(`   エレベーション: ${Object.keys(tokens.elevation).length}レベル`);
  console.log(`   コンポーネント: ${Object.keys(tokens.components).length}種類`);
  
  // 検証スクリプトの実行を促す
  console.log('\n💡 次のコマンドで検証を実行できます:');
  console.log('   npm run validate:tokens');
}

// 実行
if (require.main === module) {
  generateCompleteTokens().catch(console.error);
}