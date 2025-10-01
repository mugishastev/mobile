import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { AdminGuard } from '../../components/AdminGuard';
import { BASE_URL } from '../../constants/api';
import { AuthContext } from '../../context/AuthContext';

interface OrderItem { productId: { prodName: string; prodPrice: number; }; quantity: number; }
interface Order {
  _id: string;
  user: { email: string; username?: string } | string;
  items: OrderItem[];
  status: string;
  total: number;
  createdAt: string;
}

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error('Fetch orders failed:', err);
    } finally { setLoading(false); }
  };

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await axios.put(`${BASE_URL}/api/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      Alert.alert('Updated', 'Order status updated');
      fetchOrders();
    } catch (err: any) {
      console.error('Update status failed:', err);
      Alert.alert('Error', err.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <AdminGuard>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Orders</Text>

        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          refreshing={loading}
          onRefresh={fetchOrders}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Order #{item._id.slice(-6)}</Text>
              <Text style={styles.meta}>Customer: {typeof item.user === 'string' ? item.user : (item.user.username || item.user.email)}</Text>
              <Text style={styles.meta}>Items: {item.items.length} • Total: ${item.total?.toFixed?.(2) ?? '—'}</Text>
              <Text style={styles.meta}>Status: {item.status}</Text>
              <View style={styles.row}>
                {STATUSES.map(s => (
                  <TouchableOpacity key={s} style={[styles.statusBtn, item.status === s && styles.statusBtnActive]} onPress={() => updateStatus(item._id, s)}>
                    <Text style={[styles.statusText, item.status === s && styles.statusTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </AdminGuard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: '#f7f7f7', padding: 12, borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  meta: { fontSize: 12, color: '#666', marginBottom: 4 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  statusBtn: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 14, backgroundColor: '#eee' },
  statusBtnActive: { backgroundColor: '#FF6B4A' },
  statusText: { fontSize: 12, color: '#333' },
  statusTextActive: { color: '#fff' },
});