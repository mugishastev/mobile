import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

interface ActionButtonProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  gradient: string[];
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, icon, route, gradient }) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.actionButton}
      onPress={() => router.push(route as any)}
    >
      <LinearGradient colors={gradient} style={styles.actionGradient}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#333" />
        </View>
        <Text style={styles.actionText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export function QuickActions() {
  const actions = [
    {
      title: 'Add Product',
      icon: 'add-circle-outline' as const,
      route: '/admin/products/create',
      gradient: ['#FFD700', '#FFC107'],
    },
    {
      title: 'View Orders',
      icon: 'receipt-outline' as const,
      route: '/admin/orders',
      gradient: ['#FFEB3B', '#FFD700'],
    },
    {
      title: 'Manage Users',
      icon: 'people-outline' as const,
      route: '/admin/users',
      gradient: ['#FFF176', '#FFEB3B'],
    },
    {
      title: 'Analytics',
      icon: 'analytics-outline' as const,
      route: '/admin/analytics',
      gradient: ['#FFE082', '#FFF176'],
    },
    {
      title: 'Settings',
      icon: 'settings-outline' as const,
      route: '/admin/settings',
      gradient: ['#FFCC02', '#FFB300'],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {actions.map((action, index) => (
          <ActionButton key={index} {...action} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    width: 110,
    height: 80,
    borderRadius: 16,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  actionGradient: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});