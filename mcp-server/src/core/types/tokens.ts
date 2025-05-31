export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      onDark: string;
      mono: string;
    };
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      dark: string;
      accent: string;
      surface: string;
    };
    border: {
      default: string;
      light: string;
      focused: string;
      divider: string;
    };
    semantic: {
      error: {
        main: string;
        dark: string;
        light: string;
      };
      warning: {
        main: string;
        dark: string;
        light: string;
      };
      success: {
        main: string;
        dark: string;
        light: string;
      };
      info: {
        main: string;
        dark: string;
        light: string;
      };
      alert: {
        main: string;
        dark: string;
      };
    };
    neutral: {
      [key: string]: string;
    };
    link: {
      default: string;
      hover: string;
      visited: string;
      active: string;
    };
  };
  typography: {
    fontFamily: {
      primary: string;
      mono: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
    display: {
      fontSize: string;
      lineHeight: string;
      fontWeight: number;
      letterSpacing: string;
    };
    standard: {
      [key: string]: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
    };
    dense: {
      [key: string]: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
    };
    oneline: {
      [key: string]: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
    };
    mono: {
      [key: string]: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
      };
    };
    link: {
      [key: string]: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        letterSpacing: string;
        textDecoration: string;
      };
    };
  };
  spacing: {
    [key: string]: string;
  };
  elevation: {
    [key: string]: string;
  };
  borderRadius: {
    [key: string]: string;
  };
  breakpoints: {
    [key: string]: string;
  };
  grid: {
    columns: {
      [key: string]: number;
    };
    gap: {
      [key: string]: string;
    };
    margin: {
      [key: string]: string;
    };
  };
  zIndex: {
    [key: string]: number;
  };
  transition: {
    duration: {
      [key: string]: string;
    };
    easing: {
      [key: string]: string;
    };
  };
}

