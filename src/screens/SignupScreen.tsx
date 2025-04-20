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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export default function SignupScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [matchError, setMatchError] = useState('');

  const isValidPassword = (pwd: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(pwd);
  };

  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd);
    if (!isValidPassword(pwd)) {
      setPasswordError('Must have 1 uppercase, 1 number, 1 special character');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (confirm: string) => {
    setConfirmPassword(confirm);
    if (password && confirm !== password) {
      setMatchError('Passwords do not match');
    } else {
      setMatchError('');
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match.');
    }

    if (!isValidPassword(password)) {
      return Alert.alert(
        'Weak Password',
        'Password must have at least 1 uppercase letter, 1 number, and 1 special character (!@#).',
      );
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // ✅ Let AuthContext redirect the user after signup
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-50 dark:bg-slate-900 justify-center px-6"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="mb-8">
        <Text className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400">
          Create an Account
        </Text>
      </View>

      <TextInput
        className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl mb-2 border border-slate-300 dark:border-slate-700"
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl mb-1 border border-slate-300 dark:border-slate-700"
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      {passwordError !== '' && (
        <Text className="text-red-500 text-sm mb-2">{passwordError}</Text>
      )}

      <TextInput
        className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-xl mb-1 border border-slate-300 dark:border-slate-700"
        placeholder="Confirm Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
      {matchError !== '' && (
        <Text className="text-red-500 text-sm mb-4">{matchError}</Text>
      )}

      <TouchableOpacity
        onPress={handleSignup}
        className="bg-blue-600 dark:bg-blue-500 py-3 rounded-xl mb-3"
      >
        <Text className="text-center text-white font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.replace('Login')}
        className="border border-blue-500 py-3 rounded-xl"
      >
        <Text className="text-center text-blue-600 dark:text-blue-400 font-semibold">
          Back to Login
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
