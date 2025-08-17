import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// 🎯 Premium Design System for Poker App
export const PremiumTheme = {
  // 🎨 Premium Color Palette - Inspired by luxury casinos and finance apps
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // Main brand color
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    
    // Premium Gold Accents
    gold: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',  // Main gold
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    // Sophisticated Grays
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    
    // Premium Dark Background
    dark: {
      50: '#18181b',
      100: '#27272a',
      200: '#3f3f46',
      300: '#52525b',
      400: '#71717a',
      500: '#a1a1aa',
      600: '#d4d4d8',
      700: '#e4e4e7',
      800: '#f4f4f5',
      900: '#fafafa',
    },
    
    // Semantic Colors
    success: {
      light: '#10b981',
      DEFAULT: '#059669',
      dark: '#047857',
    },
    error: {
      light: '#ef4444',
      DEFAULT: '#dc2626',
      dark: '#b91c1c',
    },
    warning: {
      light: '#f59e0b',
      DEFAULT: '#d97706',
      dark: '#b45309',
    },
    
    // Poker Specific Colors
    poker: {
      felt: '#0B4D2C',    // Premium poker table green
      feltDark: '#083D22', 
      chips: {
        red: '#dc2626',
        green: '#16a34a',
        blue: '#2563eb',
        gold: '#f59e0b',
        purple: '#9333ea',
        black: '#1f2937',
      },
      cards: {
        red: '#dc2626',
        black: '#1f2937',
        back: '#1e3a8a',
      }
    }
  },

  // 📏 Spacing System (8px base unit)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
    '4xl': 96,
  },

  // 📐 Border Radius Scale
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },

  // 🔤 Typography Scale
  typography: {
    // Font Sizes
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
    },
    
    // Font Weights
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    
    // Line Heights
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6,
      loose: 1.8,
    }
  },

  // 🌟 Advanced Shadow System
  shadows: {
    // Subtle shadows
    xs: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    
    // Medium shadows
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 8,
    },
    
    // Premium shadows
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 12,
    },
    '2xl': {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.25,
      shadowRadius: 25,
      elevation: 20,
    },
    
    // Colored shadows for premium effects
    goldGlow: {
      shadowColor: '#f59e0b',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    blueGlow: {
      shadowColor: '#0ea5e9',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    }
  },

  // 📱 Responsive Breakpoints
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },

  // ⚡ Animation Timing
  animation: {
    duration: {
      fast: 150,
      normal: 250,
      slow: 350,
      slower: 500,
    },
    
    easing: {
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Spring-like bounce
    }
  },

  // 🎯 Component Variants
  variants: {
    // Button variants
    button: {
      primary: {
        backgroundColor: '#0ea5e9',
        borderColor: '#0ea5e9',
      },
      secondary: {
        backgroundColor: 'transparent',
        borderColor: '#0ea5e9',
      },
      success: {
        backgroundColor: '#059669',
        borderColor: '#059669',
      },
      danger: {
        backgroundColor: '#dc2626',
        borderColor: '#dc2626',
      },
      gold: {
        backgroundColor: '#f59e0b',
        borderColor: '#f59e0b',
      }
    },
    
    // Card variants
    card: {
      elevated: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
      },
      glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
      }
    }
  },

  // 📏 Layout Constants
  layout: {
    headerHeight: 100,
    tabBarHeight: 80,
    screenPadding: 20,
    cardPadding: 24,
    
    // Common dimensions
    buttonHeight: 56,
    inputHeight: 48,
    iconSize: 24,
    avatarSize: 40,
  },

  // 🎨 Gradient Presets
  gradients: {
    primary: ['#0ea5e9', '#0284c7'],
    gold: ['#f59e0b', '#d97706'],
    dark: ['#0f172a', '#1e293b'],
    success: ['#059669', '#047857'],
    danger: ['#dc2626', '#b91c1c'],
    
    // Premium casino gradients
    casino: ['#0B4D2C', '#083D22', '#062A18'],
    royal: ['#1e3a8a', '#3730a3', '#581c87'],
    sunset: ['#f59e0b', '#f97316', '#dc2626'],
  }
};

// 🛠️ Helper Functions
export const getSpacing = (multiplier = 1) => PremiumTheme.spacing.md * multiplier;
export const getFontSize = (size) => PremiumTheme.typography.fontSize[size] || PremiumTheme.typography.fontSize.md;
export const getColor = (colorPath) => {
  const paths = colorPath.split('.');
  let color = PremiumTheme.colors;
  
  for (const path of paths) {
    color = color[path];
    if (!color) return PremiumTheme.colors.gray[500];
  }
  
  return color;
};

// 📱 Responsive helpers
export const isSmallDevice = () => width < PremiumTheme.breakpoints.sm;
export const isMediumDevice = () => width >= PremiumTheme.breakpoints.sm && width < PremiumTheme.breakpoints.lg;
export const isLargeDevice = () => width >= PremiumTheme.breakpoints.lg;

// 🎨 Pre-built style objects for common patterns
export const PremiumStyles = {
  // Glass morphism effect
  glassMorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
  },
  
  // Premium card style
  premiumCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: PremiumTheme.borderRadius['2xl'],
    padding: PremiumTheme.spacing.lg,
    ...PremiumTheme.shadows.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  // Floating action style
  floatingAction: {
    position: 'absolute',
    borderRadius: PremiumTheme.borderRadius.full,
    ...PremiumTheme.shadows.xl,
    backgroundColor: PremiumTheme.colors.primary[500],
  },
  
  // Premium text styles
  headingText: {
    fontSize: PremiumTheme.typography.fontSize['3xl'],
    fontWeight: PremiumTheme.typography.fontWeight.bold,
    color: '#ffffff',
    textAlign: 'center',
  },
  
  bodyText: {
    fontSize: PremiumTheme.typography.fontSize.md,
    fontWeight: PremiumTheme.typography.fontWeight.normal,
    color: PremiumTheme.colors.gray[300],
    lineHeight: PremiumTheme.typography.lineHeight.normal * PremiumTheme.typography.fontSize.md,
  }
};
