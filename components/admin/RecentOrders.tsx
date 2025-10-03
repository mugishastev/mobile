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

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  time: string;
}

const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'processing': return '#2196F3';
      case 'shipped': return '#9C27B0';
      case 'delivered': return '#4CAF50';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'time-outline';
      case 'processing': return 'refresh-outline';
      case 'shipped': return 'car-outline';
      case 'delivered': return 'checkmark-circle-outline';
      default: return 'help-outline';
    }
  };

  return (
    <TouchableOpacity style={styles.orderItem}>
      <View style={styles.orderLeft}>
        <Text style={styles.orderId}>#{order.id}</Text>
        <Text style={styles.customerName}>{order.customer}</Text>
        <Text style={styles.orderTime}>{order.time}</Text>
      </View>
      <View style={styles.orderRight}>
        <Text style={styles.orderAmount}>${order.amount}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Ionicons 
            name={getStatusIcon(order.status) as any} 
            size={12} 
            color="#fff" 
          />
          <Text style={styles.statusText}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export function RecentOrders() {
  const router = useRouter();

  const orders: Order[] = [
    {
      id: '1001',
      customer: 'John Doe',
      amount: 125.99,
      status: 'delivered',
      time: '2 min ago',
    },
    {
      id: '1002',
      customer: 'Jane Smith',
      amount: 89.50,
      status: 'shipped',
      time: '15 min ago',
    },
    {
      id: '1003',
      customer: 'Mike Johnson',
      amount: 234.75,
      status: 'processing',
      time: '1 hour ago',
    },
    {
      id: '1004',
      customer: 'Sarah Wilson',
      amount: 67.20,
      status: 'pending',
      time: '2 hours ago',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFDE7', '#FFF9C4']}
        style={styles.card}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Recent Orders</Text>
          <TouchableOpacity 
            onPress={() => router.push('/admin/orders' as any)}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFD700" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.ordersList} showsVerticalScrollIndicator={false}>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 280,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  ordersList: {
    flex: 1,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 215, 0, 0.1)',
  },
  orderLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  customerName: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  orderTime: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  orderAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
});