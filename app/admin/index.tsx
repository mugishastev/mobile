import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AdminGuard } from '../../components/AdminGuard';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <AdminGuard>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/admin/products')}>
            <Text style={styles.cardTitle}>Products</Text>
            <Text style={styles.cardDesc}>Add, edit, and list products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/admin/categories')}>
            <Text style={styles.cardTitle}>Categories</Text>
            <Text style={styles.cardDesc}>Manage categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/admin/orders')}>
            <Text style={styles.cardTitle}>Orders</Text>
            <Text style={styles.cardDesc}>View and update order status</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </AdminGuard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  grid: { gap: 12 },
  card: { backgroundColor: '#f7f7f7', padding: 16, borderRadius: 10 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  cardDesc: { fontSize: 12, color: '#666' },
});
