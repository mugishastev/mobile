import React, { useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
  placeholder?: string;
};

const categories = [
  'Phones',
  'Clothing',
  'Shoes',
  'Beauty',
  'Bags',
  'Watches',
  'Electronics',
  'Home',
    'Luggage & Bags',
    'Watch & Jewelry',
    'Kids & Toys',
    'Home & Appliances',
    'Beauty',
    'Medicine',
    'Phones  ',
    'Telecommunications',
    'Electronics',
    'Computer & Office',
    'Automobiles',
    'Motorcycles',
    'Sports ',
    'Entertainment',
];

const ITEM_HEIGHT = 24;
const { height } = Dimensions.get('window');

export function SearchBar() {
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % categories.length;
      Animated.timing(scrollY, {
        toValue: index * ITEM_HEIGHT,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Left Icon */}
        <Ionicons name="search" size={20} color="#666" style={styles.iconLeft} />

        {/* Input Field */}
        <TextInput
          style={styles.input}
          placeholderTextColor="#666"
        />

        {/* Vertical Category Slider */}
        <View style={styles.sliderContainer}>
          <Animated.View style={{ transform: [{ translateY: scrollY.interpolate({
            inputRange: [0, ITEM_HEIGHT * categories.length],
            outputRange: [0, -ITEM_HEIGHT * categories.length],
          }) }] }}>
            {categories.map((cat, index) => (
              <View key={index} style={styles.categoryItem}>
                <Text style={styles.categoryText}>{cat}</Text>
              </View>
            ))}
          </Animated.View>
        </View>

        {/* Right Icon */}
        <TouchableOpacity style={styles.iconRight}>
          <Ionicons name="chatbubble-ellipses-outline" size={40} color="#666"   />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f7f6faff',
    paddingVertical: 12,
    paddingHorizontal: 26,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DED3FA',
    borderRadius: 30,
    paddingHorizontal: 12,
    height: 40,
    width: 290,
  },
  iconLeft: {
    marginRight: -25,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  iconRight: {
    marginLeft: 18,
  },
  sliderContainer: {
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    marginLeft: 12,
  },
  categoryItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});
