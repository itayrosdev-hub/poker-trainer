import React, { useRef, useEffect } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  Animated, 
  Vibration,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { PremiumTheme, PremiumStyles } from '../styles/premiumTheme';

const { width } = Dimensions.get('window');

export const PremiumButton = ({
  title,
  subtitle = null,
  icon = null,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onPress,
  style = {},
  textStyle = {},
  fullWidth = false,
  hapticFeedback = true,
  glowEffect = false,
  ...props
}) => {
  // Animation refs
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;

  // Loading animation
  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(loadingAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      loadingAnim.setValue(0);
    }
  }, [loading]);

  // Glow animation
  useEffect(() => {
    if (glowEffect) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [glowEffect]);

  // Handle press with micro-interactions
  const handlePressIn = () => {
    if (disabled || loading) return;
    
    // Haptic feedback
    if (hapticFeedback) {
      Vibration.vibrate(10); // Subtle vibration
    }
    
    // Scale animation
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled || loading) return;
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePress = () => {
    if (disabled || loading) return;
    
    // Additional haptic for successful press
    if (hapticFeedback) {
      Vibration.vibrate(5);
    }
    
    onPress && onPress();
  };

  // Get variant styles
  const getVariantStyles = () => {
    const variants = {
      primary: {
        gradientColors: PremiumTheme.gradients.primary,
        textColor: '#ffffff',
        borderColor: PremiumTheme.colors.primary[500],
        shadowColor: PremiumTheme.colors.primary[500],
      },
      secondary: {
        gradientColors: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'],
        textColor: PremiumTheme.colors.primary[400],
        borderColor: PremiumTheme.colors.primary[400],
        shadowColor: PremiumTheme.colors.primary[400],
      },
      success: {
        gradientColors: PremiumTheme.gradients.success,
        textColor: '#ffffff',
        borderColor: PremiumTheme.colors.success.DEFAULT,
        shadowColor: PremiumTheme.colors.success.DEFAULT,
      },
      danger: {
        gradientColors: PremiumTheme.gradients.danger,
        textColor: '#ffffff',
        borderColor: PremiumTheme.colors.error.DEFAULT,
        shadowColor: PremiumTheme.colors.error.DEFAULT,
      },
      gold: {
        gradientColors: PremiumTheme.gradients.gold,
        textColor: '#000000',
        borderColor: PremiumTheme.colors.gold[500],
        shadowColor: PremiumTheme.colors.gold[500],
      },
      glass: {
        gradientColors: ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)'],
        textColor: '#ffffff',
        borderColor: 'rgba(255,255,255,0.3)',
        shadowColor: '#ffffff',
      }
    };
    
    return variants[variant] || variants.primary;
  };

  // Get size styles
  const getSizeStyles = () => {
    const sizes = {
      small: {
        height: 40,
        paddingHorizontal: PremiumTheme.spacing.md,
        fontSize: PremiumTheme.typography.fontSize.sm,
        iconSize: 16,
        borderRadius: PremiumTheme.borderRadius.lg,
      },
      medium: {
        height: PremiumTheme.layout.buttonHeight,
        paddingHorizontal: PremiumTheme.spacing.lg,
        fontSize: PremiumTheme.typography.fontSize.md,
        iconSize: 20,
        borderRadius: PremiumTheme.borderRadius.xl,
      },
      large: {
        height: 64,
        paddingHorizontal: PremiumTheme.spacing.xl,
        fontSize: PremiumTheme.typography.fontSize.lg,
        iconSize: 24,
        borderRadius: PremiumTheme.borderRadius['2xl'],
      }
    };
    
    return sizes[size] || sizes.medium;
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  // Animated style for glow effect
  const glowStyle = {
    shadowOpacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.2, 0.6],
    }),
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [8, 20],
    }),
  };

  // Loading spinner rotation
  const loadingRotation = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View 
      style={[
        {
          transform: [{ scale: scaleAnim }],
          opacity: disabled ? 0.6 : 1,
        },
        style
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled || loading}
        style={[
          {
            height: sizeStyles.height,
            borderRadius: sizeStyles.borderRadius,
            overflow: 'hidden',
            width: fullWidth ? width - (PremiumTheme.spacing.lg * 2) : 'auto',
            minWidth: sizeStyles.height, // Square minimum for icon-only buttons
          },
          glowEffect && glowStyle,
          {
            shadowColor: variantStyles.shadowColor,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }
        ]}
        {...props}
      >
        <LinearGradient
          colors={variantStyles.gradientColors}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: sizeStyles.paddingHorizontal,
            borderRadius: sizeStyles.borderRadius,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {variant === 'glass' && (
            <BlurView 
              intensity={15} 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: sizeStyles.borderRadius,
              }}
            />
          )}
          
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: PremiumTheme.spacing.sm,
          }}>
            {/* Loading Spinner */}
            {loading && (
              <Animated.View
                style={{
                  width: sizeStyles.iconSize,
                  height: sizeStyles.iconSize,
                  borderRadius: sizeStyles.iconSize / 2,
                  borderWidth: 2,
                  borderColor: variantStyles.textColor,
                  borderTopColor: 'transparent',
                  transform: [{ rotate: loadingRotation }],
                }}
              />
            )}
            
            {/* Icon */}
            {icon && !loading && (
              <Text style={{ 
                fontSize: sizeStyles.iconSize, 
                color: variantStyles.textColor 
              }}>
                {icon}
              </Text>
            )}
            
            {/* Text Content */}
            {(title || subtitle) && (
              <View style={{ alignItems: 'center' }}>
                {title && (
                  <Text
                    style={[
                      {
                        fontSize: sizeStyles.fontSize,
                        fontWeight: PremiumTheme.typography.fontWeight.semibold,
                        color: variantStyles.textColor,
                        textAlign: 'center',
                      },
                      textStyle,
                    ]}
                    numberOfLines={1}
                  >
                    {loading ? 'טוען...' : title}
                  </Text>
                )}
                
                {subtitle && !loading && (
                  <Text
                    style={[
                      {
                        fontSize: sizeStyles.fontSize - 2,
                        fontWeight: PremiumTheme.typography.fontWeight.normal,
                        color: variantStyles.textColor,
                        opacity: 0.8,
                        textAlign: 'center',
                        marginTop: 2,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {subtitle}
                  </Text>
                )}
              </View>
            )}
          </View>
          
          {/* Shine Effect for premium variants */}
          {(variant === 'gold' || variant === 'primary') && (
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: [
                  {
                    translateX: glowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-width, width],
                    }),
                  },
                ],
                borderRadius: sizeStyles.borderRadius,
              }}
            />
          )}
        </LinearGradient>
        
        {/* Border overlay for glass effect */}
        {variant === 'glass' && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: sizeStyles.borderRadius,
              borderWidth: 1,
              borderColor: variantStyles.borderColor,
            }}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// Preset button configurations for common use cases
export const ActionButton = (props) => (
  <PremiumButton
    variant="primary"
    size="large"
    hapticFeedback={true}
    glowEffect={true}
    {...props}
  />
);

export const SecondaryButton = (props) => (
  <PremiumButton
    variant="secondary"
    size="medium"
    {...props}
  />
);

export const GoldButton = (props) => (
  <PremiumButton
    variant="gold"
    size="large"
    glowEffect={true}
    {...props}
  />
);

export const IconButton = (props) => (
  <PremiumButton
    size="medium"
    variant="glass"
    style={{ width: 56, height: 56 }}
    {...props}
  />
);
