import React from 'react';
import { SafeAreaView, View } from 'react-native';
import TopBar from '../components/TopBar';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900">
      <TopBar />
      <View className="flex-1 px-4 pt-2">{children}</View>
    </SafeAreaView>
  );
}
