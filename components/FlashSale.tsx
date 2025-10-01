import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { CountdownTimer } from './CountdownTimer';
import { Ionicons } from '@expo/vector-icons';

const flashItems = [
  {
    title: 'Black Shoes',
    price: '32,300 RWF',
    discount: '-42%',
    image: require('../assets/images/flash-sale/black-shoes.jpeg'),
  },
  {
    title: 'Blue Shoes',
    price: '12,453 RWF',
    discount: '-30%',
    image: require('../assets/images/flash-sale/blue-shoes.jpeg'),
  },
  {
    title: 'Wristwatch',
    price: '25,075 RWF',
    discount: '-25%',
    image: require('../assets/images/flash-sale/watch.png'),
  },
  {
    title: 'Red Shoes',
    price: '28,917 RWF',
    discount: '-35%',
    image: require('../assets/images/flash-sale/red-shoes.png'),
  },
];

export function FlashSale() {
  const targetTime = new Date();
  targetTime.setHours(targetTime.getHours() + 3);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flash Sale ⏰</Text>
      <CountdownTimer targetTime={targetTime} />
      <View style={styles.grid}>
        {flashItems.map((item) => {
          const isSelected = selectedItem === item.title;
          return (
            <TouchableOpacity
              key={item.title}
              style={styles.card}
              onPress={() =>
                setSelectedItem(isSelected ? null : item.title)
              }
            >
              <Image source={item.image} style={styles.image} />
              <Text style={styles.label}>{item.title}</Text>
              <Text style={styles.price}>
                {item.price}{' '}
                <Text style={styles.discount}>{item.discount}</Text>
              </Text>

              {isSelected && (
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="cart-outline" size={20} color="#333" />
                    <Text style={styles.actionText}>Add to Cart</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="bag-check-outline" size={20} color="#007AFF" />
                    <Text style={styles.actionText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 4,
  },
  label: {
    fontSize: 14,
    marginTop: 8,
  },
  price: {
    fontWeight: 'bold',
    color: '#070000ff',
  },
  discount: {
    fontSize: 12,
    color: '#e60000',
    marginLeft: 4,
  },
  actions: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#333',
  },
});
