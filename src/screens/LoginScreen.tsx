import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Login Failed', 'Incorrect email and/or password.');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-50 dark:bg-slate-900 justify-center px-6"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="mb-8">
        <Text className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400">
          NomadKit Login
        </Text>
      </View>

      <TextInput
        className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl mb-4 border border-slate-300 dark:border-slate-700"
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl mb-6 border border-slate-300 dark:border-slate-700"
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-blue-600 dark:bg-blue-500 py-3 rounded-xl mb-3"
      >
        <Text className="text-center text-white font-semibold">Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        className="border border-blue-500 py-3 rounded-xl"
      >
        <Text className="text-center text-blue-600 dark:text-blue-400 font-semibold">
          Create an Account
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
