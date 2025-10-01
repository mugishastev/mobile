import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext'; // updated path
import { useRouter } from 'expo-router';

export function Header() {
  const { user, logout, navigateToLogin } = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <StatusBar backgroundColor="#FF6B4A" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Text style={styles.languageText}>English</Text>
          <View style={styles.languageIndicator}>
            <Text style={styles.languageCode}>中</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.loginSection}>
        {user ? (
          <View style={styles.userInfo}>
            <Text style={styles.welcomeText}>Welcome, {user.username}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {user.userRole === 'admin' && (
                <TouchableOpacity onPress={() => router.push('/admin')} style={{ marginRight: 12 }}>
                  <Text style={styles.adminText}>Admin Dashboard</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={logout}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
            <Text style={styles.loginButtonText}>LOGIN / REGISTER</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF6B4A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  languageText: { color: 'white', fontSize: 14, fontWeight: '400', marginRight: 4 },
  languageIndicator: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 2, marginLeft: 2 },
  languageCode: { color: 'white', fontSize: 10, fontWeight: '500' },
  settingsButton: { padding: 2 },
  loginSection: { backgroundColor: '#FF6B4A', paddingHorizontal: 16, paddingBottom: 16 },
  loginButton: { backgroundColor: 'white', paddingVertical: 10, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  loginButtonText: { color: '#FF6B4A', fontSize: 12, fontWeight: '600', letterSpacing: 0.3 },
  userInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeText: { color: 'white', fontSize: 14, fontWeight: '600' },
  adminText: { color: '#fff', marginLeft: 0, marginRight: 12, fontSize: 12, textDecorationLine: 'underline' },
  logoutText: { color: '#fff', marginLeft: 0, fontSize: 12 },
});
