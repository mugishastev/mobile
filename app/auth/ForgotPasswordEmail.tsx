import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { NotificationBanner } from '../../components/NotificationBanner';
import { BASE_URL } from '../../constants/api';

export default function ForgotPasswordEmail() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{visible: boolean; type: 'success'|'error'|'info'; message: string}>({ visible: false, type: 'info', message: '' });
  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleSend = async () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setBanner({ visible: true, type: 'error', message: 'Please enter your email.' });
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/users/request-reset`, { email });
      setBanner({ visible: true, type: 'success', message: 'OTP sent to your email. Check your inbox.' });
      // Navigate to reset screen, carry the email
      setTimeout(() => {
        router.push({ pathname: '/auth/ForgotPasswordReset', params: { email } as any });
      }, 600);
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Failed to send OTP';
      setBanner({ visible: true, type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NotificationBanner
        visible={banner.visible}
        type={banner.type}
        message={banner.message}
        onClose={() => setBanner({ ...banner, visible: false })}
      />
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.sub}>Enter your account email to receive an OTP.</Text>

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(t)=>{ setEmail(t); if (errors.email) setErrors({}); }}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleSend} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>verify OTP code</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  sub: { textAlign: 'center', color: '#666', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 8 },
  inputError: { borderColor: '#e74c3c' },
  errorText: { color: '#e74c3c', fontSize: 12, marginBottom: 8 },
  button: { backgroundColor: '#FF6B4A', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
