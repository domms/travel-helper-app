import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen() {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceAnim]);

  return (
    <View className="flex-1 justify-center items-center bg-slate-50 dark:bg-slate-900">
      <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
        <Ionicons name="wifi" size={64} color="#3B82F6" />
      </Animated.View>
      <Text className="mt-4 text-xl font-semibold text-slate-800 dark:text-white">
        Logging you in...
      </Text>
    </View>
  );
}
