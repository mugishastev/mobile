import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';

const deals = [
  {
    label: 'VIVO S7 5G',
    image: require('../assets/images/bargain.jpg'),
    specs: '64MP + 44MP • 128GB + 256GB',
    price: '123,675 RWF',
    oldPrice: '143,735 RWF',
    rating: 4.4,
    seller: 'By Air',
    discount: 14,
  },
  {
    label: 'J16 Pro Max',
    image: require('../assets/images/bargain.jpg'),
    specs: '12GB + 512GB • Android 13',
    price: '102,723 RWF',
    oldPrice: '115,000 RWF',
    rating: 4.3,
    seller: 'By Air',
    discount: 11,
  },
  {
    label: 'S23 Ultra+',
    image: require('../assets/images/bargain.jpg'),
    specs: '6800mAh • Qualcomm 888',
    price: '94,000 RWF',
    oldPrice: '105,000 RWF',
    rating: 4.5,
    seller: 'By Air',
    discount: 11,
  },
  {
    label: 'Zinc Alloy SSD',
    image: require('../assets/images/bargain.jpg'),
    specs: 'Durable metal • Plug & Play',
    price: '4,318 RWF',
    oldPrice: '4,800 RWF',
    rating: 4.2,
    seller: 'By Air',
    discount: 10,
  },
];

export function TodayDeal() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Deal</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {deals.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Animated.View style={[styles.discountTag, { opacity: fadeAnim }]}>
              <Text style={styles.discountText}>-{item.discount}%</Text>
            </Animated.View>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.specs}>{item.specs}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.oldPrice}>{item.oldPrice}</Text>
            <Text style={styles.meta}>⭐ {item.rating} • {item.seller}</Text>
          </TouchableOpacity>
        ))}
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
    width: '47%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 8,
    position: 'relative',
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  discountText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  specs: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: '#000',
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  meta: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
});
