import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { NotificationBanner } from '../../components/NotificationBanner';
import { BASE_URL } from '../../constants/api';

export default function ForgotPasswordReset() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();
  const [email, setEmail] = useState(params.email || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{visible: boolean; type: 'success'|'error'|'info'; message: string}>({ visible: false, type: 'info', message: '' });
  const [errors, setErrors] = useState<{ email?: string; otp?: string; newPassword?: string }>({});
  const [resending, setResending] = useState(false);

  const getStrength = (pw: string): 'weak' | 'medium' | 'strong' => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score >= 4) return 'strong';
    if (score >= 3) return 'medium';
    return 'weak';
  };
  const strength = getStrength(newPassword);

  const handleResend = async () => {
    if (!email) {
      setBanner({ visible: true, type: 'error', message: 'Please enter your email to resend OTP.' });
      return;
    }
    try {
      setResending(true);
      await axios.post(`${BASE_URL}/api/users/request-reset`, { email });
      setBanner({ visible: true, type: 'success', message: 'OTP resent. Please check your email.' });
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Failed to resend OTP';
      setBanner({ visible: true, type: 'error', message: msg });
    } finally {
      setResending(false);
    }
  };

  const handleReset = async () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!otp) newErrors.otp = 'OTP is required';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setBanner({ visible: true, type: 'error', message: 'Please fill all fields.' });
      return;
    }
    if (strength === 'weak') {
      setBanner({ visible: true, type: 'error', message: 'Password too weak. Use at least 8 chars incl. upper, lower, number, and symbol.' });
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/users/reset-password`, { email, otp, newPassword });
      setBanner({ visible: true, type: 'success', message: 'Password reset successfully. Redirecting to login…' });
      setTimeout(() => router.replace('/auth/LoginScreen'), 800);
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Failed to reset password';
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
      <Text style={styles.title}>Reset password</Text>

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(t)=>{ setEmail(t); if (errors.email) setErrors({ ...errors, email: undefined }); }}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.input, errors.otp && styles.inputError]}
        placeholder="OTP"
        value={otp}
        onChangeText={(t)=>{ setOtp(t); if (errors.otp) setErrors({ ...errors, otp: undefined }); }}
      />
      {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}

      <TouchableOpacity style={[styles.linkBtn]} onPress={handleResend} disabled={resending}>
        <Text style={[styles.linkText]}>{resending ? 'Resending…' : 'Resend OTP'}</Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input, errors.newPassword && styles.inputError]}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={(t)=>{ setNewPassword(t); if (errors.newPassword) setErrors({ ...errors, newPassword: undefined }); }}
      />
      <Text style={[styles.strengthText,
        strength === 'weak' && styles.strengthWeak,
        strength === 'medium' && styles.strengthMedium,
        strength === 'strong' && styles.strengthStrong
      ]}>Strength: {strength}</Text>
      {errors.newPassword ? <Text style={styles.errorText}>{errors.newPassword}</Text> : null}

      <TouchableOpacity style={[styles.button, (loading || strength==='weak') && styles.buttonDisabled]} onPress={handleReset} disabled={loading || strength==='weak'}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Reset Password</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 8 },
  inputError: { borderColor: '#e74c3c' },
  errorText: { color: '#e74c3c', fontSize: 12, marginBottom: 8 },
  button: { backgroundColor: '#FF6B4A', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  linkBtn: { alignSelf: 'flex-start', marginBottom: 8 },
  linkText: { color: '#3b82f6' },
  strengthText: { fontSize: 12, marginBottom: 4 },
  strengthWeak: { color: '#e74c3c' },
  strengthMedium: { color: '#f39c12' },
  strengthStrong: { color: '#2ecc71' },
});
