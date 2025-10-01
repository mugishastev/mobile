import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { NotificationBanner } from '../../components/NotificationBanner';
import { BASE_URL } from '../../constants/api';

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{visible: boolean; type: 'success'|'error'|'info'; message: string}>({visible:false, type:'info', message:''});
  const [errors, setErrors] = useState<{username?: string; email?: string; password?: string}>({});

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
  const strength = getStrength(password);

  const handleRegister = async () => {
    const newErrors: typeof errors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setBanner({ visible: true, type: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }
    if (strength === 'weak') {
      setBanner({ visible: true, type: 'error', message: 'Password too weak. Use at least 8 chars incl. upper, lower, number, and symbol.' });
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/users/register`, {
        username,
        email,
        password,
        userRole: 'user', // default role
      });

      setBanner({ visible: true, type: 'success', message: 'Registration successful! Logging you in...' });
      await login(email, password); // automatically login after register (will navigate)
    } catch (error: any) {
      console.error('Register error:', error);
      const msg = error.response?.data?.message || 'Registration failed.';
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
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={[styles.input, errors.username && styles.inputError]}
        placeholder="Username"
        value={username}
        onChangeText={(t)=>{ setUsername(t); if (errors.username) setErrors({...errors, username: undefined}); }}
      />
      {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(t)=>{ setEmail(t); if (errors.email) setErrors({...errors, email: undefined}); }}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(t)=>{ setPassword(t); if (errors.password) setErrors({...errors, password: undefined}); }}
      />
      <Text style={[styles.strengthText,
        strength === 'weak' && styles.strengthWeak,
        strength === 'medium' && styles.strengthMedium,
        strength === 'strong' && styles.strengthStrong
      ]}>Strength: {strength}</Text>
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <TouchableOpacity style={[styles.button, (loading || strength==='weak') && styles.buttonDisabled]} onPress={handleRegister} disabled={loading || strength==='weak'}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/LoginScreen')}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 8 },
  inputError: { borderColor: '#e74c3c' },
  errorText: { color: '#e74c3c', fontSize: 12, marginBottom: 8 },
  button: { backgroundColor: '#FF6B4A', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  switchText: { marginTop: 16, textAlign: 'center', color: '#FF6B4A' },
  strengthText: { fontSize: 12, marginBottom: 4 },
  strengthWeak: { color: '#e74c3c' },
  strengthMedium: { color: '#f39c12' },
  strengthStrong: { color: '#2ecc71' },
});
