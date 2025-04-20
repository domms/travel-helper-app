import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigation } from '@react-navigation/native';
import { Menu } from 'react-native-paper';

export default function TopBar() {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = async () => {
    await signOut(auth);
    closeMenu();
  };

  return (
    <View className="w-full flex-row justify-between items-center px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <View className="flex-row items-center">
        {canGoBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#3B82F6" />
          </TouchableOpacity>
        )}
        <Text className="text-lg font-semibold text-slate-800 dark:text-white">
          NomadKit
        </Text>
      </View>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Ionicons name="person-circle-outline" size={28} color="#3B82F6" />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={handleLogout} title="Logout" leadingIcon="logout" />
      </Menu>
    </View>
  );
}
