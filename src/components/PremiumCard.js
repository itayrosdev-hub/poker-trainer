import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { PremiumTheme, PremiumStyles } from '../styles/premiumTheme';

const { width } = Dimensions.get('window');

export const PremiumCard = ({
  children,
  title = null,
  subtitle = null,
  icon = null,
  variant = 'glass',
  elevated = true,
  onPress = null,
  style = {},
  headerStyle = {},
  contentStyle = {},
  animationDelay = 0,
  interactive = false,
  glowColor = null,
  borderGlow = false,
  ...props
}) => {
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Initialize animations
  useEffect(() => {
    const animationSequence = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: animationDelay,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: animationDelay,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start();

    // Glow animation for special effects
    if (borderGlow || glowColor) {
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
  }, [animationDelay, borderGlow, glowColor]);

  // Interaction handlers
  const handlePressIn = () => {
    if (!interactive && !onPress) return;
    
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    if (!interactive && !onPress) return;
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  // Get variant styles
  const getVariantStyles = () => {
    const variants = {
      glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        blur: true,
        blurIntensity: 20,
      },
      solid: {
        backgroundColor: PremiumTheme.colors.dark[100],
        borderColor: PremiumTheme.colors.dark[200],
        borderWidth: 1,
        blur: false,
      },
      gradient: {
        gradientColors: ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)'],
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        blur: false,
      },
      premium: {
        backgroundColor: 'rgba(245, 158, 11, 0.1)', // Gold tint
        borderColor: 'rgba(245, 158, 11, 0.3)',
        borderWidth: 2,
        blur: true,
        blurIntensity: 15,
      },
      poker: {
        backgroundColor: 'rgba(11, 77, 44, 0.8)', // Poker felt color
        borderColor: 'rgba(16, 185, 129, 0.5)',
        borderWidth: 1,
        blur: false,
      }
    };
    
    return variants[variant] || variants.glass;
  };

  const variantStyles = getVariantStyles();

  // Glow effect styles
  const glowStyle = borderGlow || glowColor ? {
    shadowColor: glowColor || PremiumTheme.colors.primary[500],
    shadowOpacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.2, 0.6],
    }),
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [8, 20],
    }),
    shadowOffset: { width: 0, height: 4 },
    elevation: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [4, 12],
    }),
  } : {};

  // Card content
  const cardContent = (
    <View style={{ flex: 1 }}>
      {/* Header Section */}
      {(title || subtitle || icon) && (
        <View style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: title || subtitle ? PremiumTheme.spacing.md : 0,
            paddingBottom: title || subtitle ? PremiumTheme.spacing.sm : 0,
            borderBottomWidth: title || subtitle ? 1 : 0,
            borderBottomColor: 'rgba(255, 255, 255, 0.1)',
          },
          headerStyle
        ]}>
          {icon && (
            <View style={{
              marginRight: PremiumTheme.spacing.sm,
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ fontSize: 18 }}>{icon}</Text>
            </View>
          )}
          
          <View style={{ flex: 1 }}>
            {title && (
              <Text style={[
                PremiumStyles.headingText,
                {
                  fontSize: PremiumTheme.typography.fontSize.lg,
                  textAlign: 'right',
                  marginBottom: subtitle ? 4 : 0,
                }
              ]}>
                {title}
              </Text>
            )}
            
            {subtitle && (
              <Text style={[
                PremiumStyles.bodyText,
                {
                  fontSize: PremiumTheme.typography.fontSize.sm,
                  textAlign: 'right',
                  opacity: 0.8,
                }
              ]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      )}
      
      {/* Content Section */}
      <View style={[
        { flex: 1 },
        contentStyle
      ]}>
        {children}
      </View>
    </View>
  );

  // Wrapper component based on interactivity
  const CardWrapper = onPress || interactive ? TouchableOpacity : View;

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim }
          ],
        },
        style,
      ]}
    >
      <CardWrapper
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          {
            borderRadius: PremiumTheme.borderRadius['2xl'],
            overflow: 'hidden',
            borderWidth: variantStyles.borderWidth,
            borderColor: variantStyles.borderColor,
          },
          elevated && PremiumTheme.shadows.lg,
          glowStyle,
        ]}
        {...props}
      >
        {/* Background Layer */}
        {variantStyles.gradientColors ? (
          <LinearGradient
            colors={variantStyles.gradientColors}
            style={{
              padding: PremiumTheme.spacing.lg,
              minHeight: 60,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {cardContent}
          </LinearGradient>
        ) : (
          <View
            style={{
              backgroundColor: variantStyles.backgroundColor,
              padding: PremiumTheme.spacing.lg,
              minHeight: 60,
            }}
          >
            {variantStyles.blur && (
              <BlurView
                intensity={variantStyles.blurIntensity}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            )}
            {cardContent}
          </View>
        )}
        
        {/* Shine Effect for premium cards */}
        {variant === 'premium' && (
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              transform: [
                {
                  translateX: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-width, width],
                  }),
                },
              ],
            }}
          />
        )}
      </CardWrapper>
    </Animated.View>
  );
};

// Preset card configurations
export const StatsCard = ({ stats, ...props }) => (
  <PremiumCard
    variant="glass"
    elevated={true}
    borderGlow={true}
    glowColor={PremiumTheme.colors.primary[500]}
    {...props}
  >
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      {stats.map((stat, index) => (
        <View key={index} style={{ alignItems: 'center', flex: 1 }}>
          <Text style={[
            PremiumStyles.headingText,
            { fontSize: PremiumTheme.typography.fontSize['2xl'] }
          ]}>
            {stat.value}
          </Text>
          <Text style={[
            PremiumStyles.bodyText,
            { fontSize: PremiumTheme.typography.fontSize.sm }
          ]}>
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  </PremiumCard>
);

export const FeatureCard = (props) => (
  <PremiumCard
    variant="gradient"
    elevated={true}
    interactive={true}
    {...props}
  />
);

export const PremiumFeatureCard = (props) => (
  <PremiumCard
    variant="premium"
    elevated={true}
    borderGlow={true}
    glowColor={PremiumTheme.colors.gold[500]}
    {...props}
  />
);

export const GameCard = (props) => (
  <PremiumCard
    variant="poker"
    elevated={true}
    {...props}
  />
);
