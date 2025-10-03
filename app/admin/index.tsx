import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { AdminGuard } from '../../components/AdminGuard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { DashboardStats } from '../../components/admin/DashboardStats';
import { SalesChart } from '../../components/admin/SalesChart';
import { RecentOrders } from '../../components/admin/RecentOrders';
import { QuickActions } from '../../components/admin/QuickActions';
import { TopProducts } from '../../components/admin/TopProducts';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function AdminDashboard() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminGuard>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={['#FFD700', '#FFA500']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.adminName}>Administrator</Text>
              <Text style={styles.dateTime}>{formatDateTime(currentTime)}</Text>
            </View>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => router.push('/admin/settings' as any)}
            >
              <Ionicons name="settings-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Dashboard Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFD700"
              colors={['#FFD700']}
            />
          }
        >
          {/* Statistics Cards */}
          <DashboardStats />

          {/* Quick Actions */}
          <QuickActions />

          {/* Sales Chart */}
          <SalesChart />

          {/* Recent Orders & Top Products Row */}
          <View style={styles.twoColumnSection}>
            <View style={styles.halfWidth}>
              <RecentOrders />
            </View>
            <View style={styles.halfWidth}>
              <TopProducts />
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#333',
    opacity: 0.8,
  },
  adminName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  dateTime: {
    fontSize: 12,
    color: '#333',
    opacity: 0.7,
    marginTop: 4,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  twoColumnSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  halfWidth: {
    flex: 1,
  },
  bottomSpacing: {
    height: 30,
  },
});
