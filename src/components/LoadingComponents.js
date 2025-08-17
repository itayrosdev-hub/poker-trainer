import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  Dimensions,
  Easing 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { PremiumTheme, PremiumStyles } from '../styles/premiumTheme';

const { width } = Dimensions.get('window');

// 🔄 Premium Loading Spinner
export const PremiumSpinner = ({
  size = 'medium',
  color = PremiumTheme.colors.primary[500],
  style = {}
}) => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const sizes = {
    small: 20,
    medium: 40,
    large: 60,
  };

  const spinnerSize = sizes[size] || sizes.medium;

  useEffect(() => {
    // Spin animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[
      {
        width: spinnerSize,
        height: spinnerSize,
        alignItems: 'center',
        justifyContent: 'center',
      },
      style
    ]}>
      <Animated.View
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderRadius: spinnerSize / 2,
          borderWidth: 3,
          borderColor: 'transparent',
          borderTopColor: color,
          borderRightColor: color,
          transform: [
            { rotate: spin },
            { scale: pulseAnim }
          ],
        }}
      />
      
      {/* Inner glow effect */}
      <Animated.View
        style={{
          position: 'absolute',
          width: spinnerSize * 0.7,
          height: spinnerSize * 0.7,
          borderRadius: (spinnerSize * 0.7) / 2,
          backgroundColor: color,
          opacity: 0.2,
          transform: [{ scale: pulseAnim }],
        }}
      />
    </View>
  );
};

// 📊 Skeleton Loading Components
export const SkeletonLoader = ({
  width = '100%',
  height = 20,
  borderRadius = PremiumTheme.borderRadius.md,
  style = {},
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

// 🃏 Card Loading Skeleton
export const CardSkeleton = ({ style = {} }) => (
  <View style={[
    {
      padding: PremiumTheme.spacing.lg,
      borderRadius: PremiumTheme.borderRadius['2xl'],
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    style
  ]}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: PremiumTheme.spacing.md }}>
      <SkeletonLoader width={32} height={32} borderRadius={16} style={{ marginRight: PremiumTheme.spacing.sm }} />
      <View style={{ flex: 1 }}>
        <SkeletonLoader width="60%" height={16} style={{ marginBottom: 8 }} />
        <SkeletonLoader width="40%" height={12} />
      </View>
    </View>
    
    <SkeletonLoader width="100%" height={40} style={{ marginBottom: PremiumTheme.spacing.sm }} />
    <SkeletonLoader width="80%" height={16} style={{ marginBottom: PremiumTheme.spacing.sm }} />
    <SkeletonLoader width="90%" height={16} />
  </View>
);

// 📱 Screen Loading Overlay
export const LoadingOverlay = ({
  visible = false,
  message = 'טוען...',
  transparent = true,
  style = {}
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: transparent ? 'rgba(0, 0, 0, 0.7)' : PremiumTheme.colors.dark[50],
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          opacity: fadeAnim,
        },
        style,
      ]}
    >
      <BlurView intensity={20} style={{
        borderRadius: PremiumTheme.borderRadius['2xl'],
        overflow: 'hidden',
        padding: PremiumTheme.spacing.xl,
        alignItems: 'center',
      }}>
        <Animated.View
          style={{
            alignItems: 'center',
            transform: [{ scale: scaleAnim }],
          }}
        >
          <PremiumSpinner size="large" color={PremiumTheme.colors.primary[400]} />
          <Text style={[
            PremiumStyles.bodyText,
            {
              marginTop: PremiumTheme.spacing.md,
              fontSize: PremiumTheme.typography.fontSize.lg,
              fontWeight: PremiumTheme.typography.fontWeight.medium,
              color: '#ffffff',
            }
          ]}>
            {message}
          </Text>
        </Animated.View>
      </BlurView>
    </Animated.View>
  );
};

// 🤖 AI Thinking Animation
export const AIThinkingLoader = ({
  message = 'AI חושב...',
  style = {}
}) => {
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;
  const brainAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Dots animation
    const createDotAnimation = (anim, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Brain pulse animation
    const brainPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(brainAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(brainAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.parallel([
      createDotAnimation(dot1Anim, 0),
      createDotAnimation(dot2Anim, 200),
      createDotAnimation(dot3Anim, 400),
      brainPulse,
    ]).start();
  }, []);

  return (
    <View style={[
      {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: PremiumTheme.spacing.md,
      },
      style
    ]}>
      <Animated.Text
        style={{
          fontSize: 24,
          marginRight: PremiumTheme.spacing.sm,
          transform: [{ scale: brainAnim }],
        }}
      >
        🤖
      </Animated.Text>
      
      <Text style={[
        PremiumStyles.bodyText,
        {
          marginRight: PremiumTheme.spacing.sm,
          color: '#ffffff',
        }
      ]}>
        {message}
      </Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {[dot1Anim, dot2Anim, dot3Anim].map((anim, index) => (
          <Animated.View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: PremiumTheme.colors.primary[400],
              marginHorizontal: 2,
              opacity: anim,
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            }}
          />
        ))}
      </View>
    </View>
  );
};

// 🎯 Button Loading State
export const ButtonLoader = ({
  size = 20,
  color = '#ffffff',
  style = {}
}) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: 'transparent',
          borderTopColor: color,
          borderRightColor: color,
          transform: [{ rotate: spin }],
        },
        style,
      ]}
    />
  );
};

// 📈 Progress Bar
export const ProgressBar = ({
  progress = 0, // 0 to 1
  height = 8,
  color = PremiumTheme.colors.primary[500],
  backgroundColor = 'rgba(255, 255, 255, 0.2)',
  animated = true,
  style = {}
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(progress);
    }
  }, [progress, animated]);

  return (
    <View
      style={[
        {
          height,
          backgroundColor,
          borderRadius: height / 2,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          height: '100%',
          backgroundColor: color,
          borderRadius: height / 2,
          width: progressAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
        }}
      />
    </View>
  );
};
