import { Stack, Slot } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Welcome Screen */}
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          
          {/* Main Tabs */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Auth Modals */}
          <Stack.Screen
            name="auth/LoginScreen"
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen
            name="auth/RegisterScreen"
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen
            name="auth/ForgotPasswordEmail"
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen
            name="auth/ForgotPasswordReset"
            options={{ presentation: 'modal', headerShown: false }}
          />

          {/* Admin */}
          <Stack.Screen name="admin" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
