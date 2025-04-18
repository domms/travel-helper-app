import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import './styles/tailwind.css';
import { RootStackParamList } from './src/types/navigation';
import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return <StackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
