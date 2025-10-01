import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter, useRootNavigationState, usePathname } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

export function AdminGuard({ children }: PropsWithChildren) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const rootState = useRootNavigationState();
  const pathname = usePathname();

  // Wait for the navigation system to be ready before redirecting.
  useEffect(() => {
    if (!rootState?.key) return; // not ready yet

    if (!user) {
      if (pathname !== '/auth/LoginScreen') router.replace('/auth/LoginScreen');
      return;
    }

    if (user.userRole !== 'admin') {
      // Only redirect if currently in /admin to avoid loops
      if (pathname?.startsWith('/admin')) router.replace('/');
      return;
    }
  }, [rootState?.key, user, pathname]);

  // Until navigation is ready, show a small placeholder to avoid premature redirects
  if (!rootState?.key) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B4A" />
        <Text style={{ marginTop: 8 }}>Loading…</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B4A" />
        <Text style={{ marginTop: 8 }}>Checking authentication...</Text>
      </View>
    );
  }

  if (user.userRole !== 'admin') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Not authorized</Text>
      </View>
    );
  }

  return <>{children}</>;
}
