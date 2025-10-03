import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

interface Product {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  image: any;
  trend: 'up' | 'down' | 'stable';
}

const ProductItem: React.FC<{ product: Product; rank: number }> = ({ product, rank }) => {
  const getTrendIcon = (trend: Product['trend']) => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      case 'stable': return 'remove-outline';
    }
  };

  const getTrendColor = (trend: Product['trend']) => {
    switch (trend) {
      case 'up': return '#4CAF50';
      case 'down': return '#F44336';
      case 'stable': return '#FF9800';
    }
  };

  return (
    <TouchableOpacity style={styles.productItem}>
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>{rank}</Text>
      </View>
      
      <Image source={product.image} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.productSales}>{product.sales} sold</Text>
        <Text style={styles.productRevenue}>${product.revenue}</Text>
      </View>
      
      <View style={styles.trendIndicator}>
        <Ionicons 
          name={getTrendIcon(product.trend) as any} 
          size={16} 
          color={getTrendColor(product.trend)} 
        />
      </View>
    </TouchableOpacity>
  );
};

export function TopProducts() {
  const router = useRouter();

  const products: Product[] = [
    {
      id: '1',
      name: 'VIVO S7 5G',
      sales: 156,
      revenue: 19284,
      image: require('../../assets/images/bargain.jpg'),
      trend: 'up',
    },
    {
      id: '2',
      name: 'Wireless Earphones',
      sales: 89,
      revenue: 8900,
      image: require('../../assets/images/earphones.jpg'),
      trend: 'up',
    },
    {
      id: '3',
      name: 'Summer Dress',
      sales: 67,
      revenue: 6700,
      image: require('../../assets/images/dress.jpg'),
      trend: 'down',
    },
    {
      id: '4',
      name: 'Sneakers',
      sales: 45,
      revenue: 4500,
      image: require('../../assets/images/sneakers.jpg'),
      trend: 'stable',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFDE7', '#FFF9C4']}
        style={styles.card}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Top Products</Text>
          <TouchableOpacity 
            onPress={() => router.push('/admin/products' as any)}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFD700" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
          {products.map((product, index) => (
            <ProductItem key={product.id} product={product} rank={index + 1} />
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
  productsList: {
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 215, 0, 0.1)',
    gap: 12,
  },
  rankBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  productImage: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    gap: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  productSales: {
    fontSize: 11,
    color: '#666',
  },
  productRevenue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  trendIndicator: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});