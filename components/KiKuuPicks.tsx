import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ProductDetail: { productId: string };
};

interface Product {
  _id: string;
  prodName: string;
  prodDesc?: string;
  prodPrice: number;
  prodQty: number;
  image: string;
}

export function KiKuuPicks() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://backend-h09f.onrender.com/api/products/all');
      setProducts(res.data.products || []);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handlePressProduct = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF6B35" style={{ marginTop: 20 }} />;
  }

  if (error) {
    return <Text style={{ color: 'red', textAlign: 'center', marginVertical: 20 }}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KiKUU Picks</Text>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {products.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <TouchableOpacity
              key={item._id}
              style={styles.card}
              onPress={() => handlePressProduct(item._id)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.label}>{item.prodName}</Text>

              {item.prodQty <= 5 && (
                <Animated.View
                  style={[styles.tag, styles.hot, { opacity: fadeAnim }]}
                >
                  <Text style={styles.tagText}>HOT</Text>
                </Animated.View>
              )}

              {isSelected && (
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="cart-outline" size={18} color="#333" />
                    <Text style={styles.actionText}>Add to Cart</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="bag-check-outline" size={18} color="#007AFF" />
                    <Text style={styles.actionText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 16,
  },
  card: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 6,
    elevation: 2,
    position: 'relative',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  label: {
    fontSize: 13,
    color: '#333',
    marginTop: 6,
    textAlign: 'center',
  },
  tag: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  hot: {
    backgroundColor: '#FF3B30',
  },
  tagText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  actions: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 6,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#333',
  },
});
