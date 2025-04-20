import { StyleSheet, Text, View } from 'react-native';
import './styles/tailwind.css';
import React, { useState } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import StackNavigator from './src/navigation/StackNavigator';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import CoverScreen from './src/screens/CoverScreen';

export default function App() {
  const [showCover, setShowCover] = useState(true);
  return (
    <PaperProvider>
      <AuthProvider>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="white"
        />
        {showCover ? (
          <CoverScreen onFinish={() => setShowCover(false)} />
        ) : (
          <StackNavigator />
        )}
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
