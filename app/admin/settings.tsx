import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdminGuard } from '../../components/AdminGuard';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  type: 'navigation' | 'toggle' | 'info';
  icon: keyof typeof Ionicons.glyphMap;
  value?: boolean;
  onPress?: () => void;
  route?: string;
  color?: string;
}

export default function AdminSettings() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    autoBackup: true,
    darkMode: false,
    maintenance: false,
  });

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingsSections = [
    {
      title: 'Account & Profile',
      items: [
        {
          id: 'profile',
          title: 'Edit Profile',
          subtitle: 'Update personal information',
          type: 'navigation' as const,
          icon: 'person-outline' as const,
          route: '/admin/profile/edit',
          color: '#FFD700',
        },
        {
          id: 'security',
          title: 'Security Settings',
          subtitle: 'Password, 2FA, sessions',
          type: 'navigation' as const,
          icon: 'shield-checkmark-outline' as const,
          route: '/admin/security',
          color: '#FFC107',
        },
        {
          id: 'permissions',
          title: 'User Roles & Permissions',
          subtitle: 'Manage admin access levels',
          type: 'navigation' as const,
          icon: 'key-outline' as const,
          route: '/admin/permissions',
          color: '#FFEB3B',
        },
      ],
    },
    {
      title: 'Store Configuration',
      items: [
        {
          id: 'store',
          title: 'Store Settings',
          subtitle: 'Business info, policies, shipping',
          type: 'navigation' as const,
          icon: 'storefront-outline' as const,
          route: '/admin/store-settings',
          color: '#FFD700',
        },
        {
          id: 'payment',
          title: 'Payment Methods',
          subtitle: 'Configure payment gateways',
          type: 'navigation' as const,
          icon: 'card-outline' as const,
          route: '/admin/payments',
          color: '#FFC107',
        },
        {
          id: 'shipping',
          title: 'Shipping & Delivery',
          subtitle: 'Zones, rates, and options',
          type: 'navigation' as const,
          icon: 'car-outline' as const,
          route: '/admin/shipping',
          color: '#FFEB3B',
        },
        {
          id: 'tax',
          title: 'Tax Configuration',
          subtitle: 'Tax rates and rules',
          type: 'navigation' as const,
          icon: 'receipt-outline' as const,
          route: '/admin/tax',
          color: '#FFE082',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Receive app notifications',
          type: 'toggle' as const,
          icon: 'notifications-outline' as const,
          value: settings.notifications,
          onPress: () => updateSetting('notifications', !settings.notifications),
          color: '#FFD700',
        },
        {
          id: 'email',
          title: 'Email Alerts',
          subtitle: 'Order updates, system alerts',
          type: 'toggle' as const,
          icon: 'mail-outline' as const,
          value: settings.emailAlerts,
          onPress: () => updateSetting('emailAlerts', !settings.emailAlerts),
          color: '#FFC107',
        },
        {
          id: 'sms',
          title: 'SMS Alerts',
          subtitle: 'Critical notifications only',
          type: 'toggle' as const,
          icon: 'chatbubble-outline' as const,
          value: settings.smsAlerts,
          onPress: () => updateSetting('smsAlerts', !settings.smsAlerts),
          color: '#FFEB3B',
        },
      ],
    },
    {
      title: 'System',
      items: [
        {
          id: 'backup',
          title: 'Auto Backup',
          subtitle: 'Daily automated backups',
          type: 'toggle' as const,
          icon: 'cloud-upload-outline' as const,
          value: settings.autoBackup,
          onPress: () => updateSetting('autoBackup', !settings.autoBackup),
          color: '#FFD700',
        },
        {
          id: 'maintenance',
          title: 'Maintenance Mode',
          subtitle: 'Temporarily disable store',
          type: 'toggle' as const,
          icon: 'construct-outline' as const,
          value: settings.maintenance,
          onPress: () => {
            Alert.alert(
              'Maintenance Mode',
              'This will temporarily disable your store for customers. Continue?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Continue',
                  onPress: () => updateSetting('maintenance', !settings.maintenance),
                },
              ]
            );
          },
          color: '#FF9800',
        },
        {
          id: 'analytics',
          title: 'Analytics & Reports',
          subtitle: 'View detailed business insights',
          type: 'navigation' as const,
          icon: 'analytics-outline' as const,
          route: '/admin/analytics',
          color: '#FFD700',
        },
        {
          id: 'logs',
          title: 'System Logs',
          subtitle: 'View application logs',
          type: 'navigation' as const,
          icon: 'document-text-outline' as const,
          route: '/admin/logs',
          color: '#FFC107',
        },
      ],
    },
    {
      title: 'Support & Information',
      items: [
        {
          id: 'help',
          title: 'Help & Documentation',
          subtitle: 'User guides and FAQs',
          type: 'navigation' as const,
          icon: 'help-circle-outline' as const,
          route: '/admin/help',
          color: '#FFD700',
        },
        {
          id: 'contact',
          title: 'Contact Support',
          subtitle: 'Get technical assistance',
          type: 'navigation' as const,
          icon: 'headset-outline' as const,
          onPress: () => {
            Alert.alert(
              'Contact Support',
              'Choose your preferred contact method:',
              [
                { text: 'Email', onPress: () => console.log('Email support') },
                { text: 'Phone', onPress: () => console.log('Phone support') },
                { text: 'Cancel', style: 'cancel' },
              ]
            );
          },
          color: '#FFC107',
        },
        {
          id: 'version',
          title: 'App Version',
          subtitle: '1.0.0 (Build 100)',
          type: 'info' as const,
          icon: 'information-circle-outline' as const,
          color: '#FFEB3B',
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress || (() => item.route && router.push(item.route as any))}
      disabled={item.type === 'info'}
    >
      <LinearGradient
        colors={['#FFFDE7', '#FFF9C4']}
        style={styles.settingItemGradient}
      >
        <View style={styles.settingItemLeft}>
          <View style={[styles.settingIcon, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon} size={20} color="#333" />
          </View>
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>

        <View style={styles.settingItemRight}>
          {item.type === 'toggle' && (
            <Switch
              value={item.value || false}
              onValueChange={() => item.onPress?.()}
              trackColor={{ false: '#E5E7EB', true: '#FFD700' }}
              thumbColor={item.value ? '#333' : '#fff'}
            />
          )}
          {item.type === 'navigation' && (
            <Ionicons name="chevron-forward" size={20} color="#666" />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from admin panel?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Add logout logic here
            router.replace('/');
          },
        },
      ]
    );
  };

  return (
    <AdminGuard>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <LinearGradient colors={['#FFD700', '#FFA500']} style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.adminInfo}>
              <Image
                source={{ uri: 'https://via.placeholder.com/60' }}
                style={styles.adminAvatar}
                defaultSource={require('../../assets/images/icon.png')}
              />
              <View style={styles.adminDetails}>
                <Text style={styles.adminName}>Administrator</Text>
                <Text style={styles.adminRole}>Super Admin</Text>
                <Text style={styles.lastLogin}>Last login: Today, 2:30 PM</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Settings Sections */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionItems}>
                {section.items.map(renderSettingItem)}
              </View>
            </View>
          ))}

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LinearGradient
              colors={['#FF6B4A', '#E74C3C']}
              style={styles.logoutButtonGradient}
            >
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Kapee Admin Dashboard v1.0.0
            </Text>
            <Text style={styles.footerSubtext}>
              © 2024 Kapee. All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AdminGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    gap: 16,
  },
  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  adminAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  adminDetails: {
    flex: 1,
  },
  adminName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  adminRole: {
    fontSize: 14,
    color: '#333',
    opacity: 0.8,
    marginTop: 2,
  },
  lastLogin: {
    fontSize: 12,
    color: '#333',
    opacity: 0.6,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionItems: {
    gap: 12,
  },
  settingItem: {
    borderRadius: 16,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  settingItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  settingItemRight: {
    marginLeft: 16,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B4A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
});