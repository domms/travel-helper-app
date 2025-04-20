import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AuthenticatedLayout from '../layout/AuthenticatedLayout';

const BottomNav = ({
  onNavigate,
}: {
  onNavigate: (screen: keyof RootStackParamList) => void;
}) => (
  <View className="flex-row justify-around items-center h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
    <TouchableOpacity
      className="items-center"
      onPress={() => onNavigate('WifiFinderMap')}
    >
      <Ionicons name="wifi-outline" size={24} color="#3B82F6" />
      <Text className="text-xs text-slate-600 dark:text-slate-400">
        Find Wi-fi
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      className="items-center"
      onPress={() => onNavigate('VisaExplorer')}
    >
      <Ionicons name="earth-outline" size={24} color="#10B981" />
      <Text className="text-xs text-slate-600 dark:text-slate-400">
        Visa Info
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      className="items-center"
      onPress={() => onNavigate('Currency')}
    >
      <Ionicons name="cash-outline" size={24} color="#F59E0B" />
      <Text className="text-xs text-slate-600 dark:text-slate-400">
        Currency
      </Text>
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <AuthenticatedLayout>
      <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900">
        {Platform.OS === 'android' && (
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
        )}

        {/* Welcome Banner at the top */}
        <View className="px-6 pt-6">
          <View className="w-full bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-xl px-4 py-3">
            <Text className="text-blue-800 dark:text-blue-200 font-semibold text-lg text-center">
              👋 Welcome back! Explore and discover new tools for your journey.
            </Text>
          </View>
        </View>

        <Animated.View
          style={{ flex: 1, opacity: fadeAnim }}
          className="items-center justify-center px-6"
        >
          <Text className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 text-center mt-10">
            Welcome
          </Text>
          <Text className="mt-2 text-base text-slate-600 dark:text-slate-400 text-center">
            Your go‑to toolkit for life on the road
          </Text>

          {/* Primary Action Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('WifiFinderMap')}
            className="flex-row items-center bg-blue-600 dark:bg-blue-500 px-6 py-4 rounded-2xl shadow-md mt-10"
          >
            <Ionicons name="wifi-outline" size={24} color="#fff" />
            <Text className="ml-3 text-lg font-semibold text-white">
              Find Wi‑Fi Nearby
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom Navigation */}
        <BottomNav onNavigate={(screen) => navigation.navigate(screen)} />
      </SafeAreaView>
    </AuthenticatedLayout>
  );
}
