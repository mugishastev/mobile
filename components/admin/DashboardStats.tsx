import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // Account for padding and gap

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: keyof typeof Ionicons.glyphMap;
  gradient: string[];
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  gradient,
  delay = 0,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 50,
        friction: 8,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.statCard,
        {
          opacity: animatedValue,
          transform: [{ scale: scaleValue }],
        },
      ]}
    >
      <TouchableOpacity style={styles.cardTouchable}>
        <LinearGradient colors={gradient} style={styles.cardGradient}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={24} color="#333" />
            </View>
            <View
              style={[
                styles.changeIndicator,
                { backgroundColor: changeType === 'increase' ? '#4CAF50' : '#F44336' },
              ]}
            >
              <Ionicons
                name={changeType === 'increase' ? 'trending-up' : 'trending-down'}
                size={12}
                color="#fff"
              />
              <Text style={styles.changeText}>{change}</Text>
            </View>
          </View>
          
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export function DashboardStats() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,560',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: 'wallet-outline' as const,
      gradient: ['#FFD700', '#FFC107'],
    },
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: 'bag-handle-outline' as const,
      gradient: ['#FFEB3B', '#FFD700'],
    },
    {
      title: 'Total Products',
      value: '856',
      change: '+5.1%',
      changeType: 'increase' as const,
      icon: 'cube-outline' as const,
      gradient: ['#FFF176', '#FFEB3B'],
    },
    {
      title: 'Total Users',
      value: '3,421',
      change: '-2.3%',
      changeType: 'decrease' as const,
      icon: 'people-outline' as const,
      gradient: ['#FFE082', '#FFF176'],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Dashboard Overview</Text>
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            delay={index * 100}
          />
        ))}
      </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 15,
  },
  statCard: {
    width: cardWidth,
  },
  cardTouchable: {
    borderRadius: 16,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  cardGradient: {
    padding: 16,
    borderRadius: 16,
    minHeight: 120,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 2,
  },
  changeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#333',
    opacity: 0.8,
  },
});