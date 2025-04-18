import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import WifiFinderMapScreen from '../screens/WifiFinderMapScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import other screens as you add them

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            options={{ title: 'Wi-Fi Finder Map' }}
            name="WifiFinderMap"
            component={WifiFinderMapScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
