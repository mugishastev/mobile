// app/(tabs)/_layout.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot, usePathname, useRouter } from "expo-router";
import { BottomNav } from "../../components/BottomNav";

export default function TabsLayout() {
  const pathname = usePathname();
  const router = useRouter();

  // Example: you could get totalItems dynamically, for now hardcoded
  const totalItems = 3;

  return (
    <SafeAreaView style={styles.container}>
      {/* Main content */}
      <Slot />

      {/* Bottom navigation */}
      <BottomNav activeTab={pathname as any} totalItems={totalItems} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
