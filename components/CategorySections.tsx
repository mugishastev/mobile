import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  _id: string;
  prodName: string;
  prodDesc?: string;
  prodPrice: number;
  prodQty: number;
  image: string;
}

const hotItems = [
  { label: 'Wigs', image: require('../assets/images/hot/personal-care.jpg') },
  { label: 'Personal Care', image: require('../assets/images/hot/personal-care.jpg') },
  { label: 'Briefcases', image: require('../assets/images/hot/briefcases.jpg') },
  { label: 'Hair Weft & Closure', image: require('../assets/images/hot/hair-weft.jpg') },
  { label: 'Tops & Tees', image: require('../assets/images/hot/tops.jpg') },
  { label: 'Headphone & Earphone', image: require('../assets/images/hot/headphones.jpg') },
];

export default function CategorySections() {
  const [recommendItems, setRecommendItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchRecommendProducts();
  }, []);

  const fetchRecommendProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://backend-ahjc.onrender.com/api/products/all');
      setRecommendItems(res.data.products || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      Alert.alert('Error', 'Could not load recommended products');
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (title: string, items: any[], isProduct = false) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.allText}>All &gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {loading && isProduct ? (
          <ActivityIndicator size="small" color="#FF6B35" />
        ) : (
          items.map((item) => (
            <TouchableOpacity
              key={isProduct ? item._id : item.label}
              style={styles.card}
              onPress={() => isProduct && navigation.navigate('ProductDetail', { productId: item._id })}
            >
              <Image source={isProduct ? { uri: item.image } : item.image} style={styles.image} />
              <Text style={styles.label}>{isProduct ? item.prodName : item.label}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {renderSection('Recommend', recommendItems, true)}
      {renderSection('Hot', hotItems)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 80, backgroundColor: '#fff' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  allText: { fontSize: 12, color: '#999' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: '30%', alignItems: 'center' },
  image: { width: 80, height: 80, borderRadius: 8, marginBottom: 6 },
  label: { fontSize: 12, color: '#333', textAlign: 'center' },
});
