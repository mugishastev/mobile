import React, { createContext, useState, ReactNode } from 'react';
// import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { BASE_URL } from '../constants/api';

interface User {
  _id: string;
  username: string;
  email: string;
  accessToken: string;
  userRole?: string; // 'admin' | 'user' etc.
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  navigateToLogin: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  navigateToLogin: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/users/login`, { email, password });
      const rawUser = res.data.user;
      const loggedUser: User = {
        _id: rawUser._id,
        username: rawUser.username,
        email: rawUser.email,
        accessToken: rawUser.accessToken,
        userRole: rawUser.userRole || rawUser.role || 'user',
      };
      setUser(loggedUser);
      await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
      // Success UI is handled by calling screens; we navigate here
      router.replace('/profile'); // navigate to profile after login
    } catch (error: any) {
      console.error('Login error:', error);
      // Bubble up so screens can show notifications
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    router.replace('/'); // navigate to home
  };

  const navigateToLogin = () => {
    router.push('/auth/LoginScreen');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, navigateToLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
