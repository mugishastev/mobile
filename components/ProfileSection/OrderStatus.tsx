import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function OrderStatus() {
  const orderStats = [
    { icon: 'person-outline', label: 'Pending\nPayment' },
    { icon: 'cube-outline', label: 'In Transit\n(Shipping)' },
    { icon: 'chatbubble-outline', label: 'Pending\nFeedback' },
    { icon: 'refresh-outline', label: 'Return &\nRefund' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        {orderStats.map((stat, index) => (
          <TouchableOpacity
            key={index}
            style={styles.statItem}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={stat.icon as any} size={20} color="#666" />
            </View>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 16,
    paddingBottom: 20,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  viewAllText: {
    fontSize: 11,
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
    lineHeight: 11,
  },
});