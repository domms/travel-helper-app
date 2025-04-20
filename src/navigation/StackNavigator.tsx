import React from 'react';
import { useAuth } from '../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import WifiFinderMapScreen from '../screens/WifiFinderMapScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from '../screens/SplashScreen';
import VisaExplorerScreen from '../screens/VisaExplorerScreen';
// import other screens as you add them

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const { user, loading } = useAuth();
  if (loading) return <SplashScreen />;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                options={{ title: 'Wi-Fi Finder Map' }}
                name="WifiFinderMap"
                component={WifiFinderMapScreen}
              />
              <Stack.Screen
                name="VisaExplorer"
                component={VisaExplorerScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
