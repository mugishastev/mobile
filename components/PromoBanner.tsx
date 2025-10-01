import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_LENGTH = width;

const promoPosts = [
  {
    id: '1',
    image: require('../assets/images/electronics-banner.jpg'),
    caption: 'Big Deals on Electronics',
  },
  {
    id: '2',
    image: require('../assets/images/fashion-banner.jpg'),
    caption: 'Trendy Fashion Picks',
  },
  {
    id: '3',
    image: require('../assets/images/home-banner.jpg'),
    caption: 'Home Essentials Sale',
  },
];

export function PromoBanner() {
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % promoPosts.length;

      flatListRef.current?.scrollToIndex({ index: currentIndex.current, animated: true });
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={promoPosts}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        getItemLayout={(_data, index) => ({
          length: ITEM_LENGTH,
          offset: ITEM_LENGTH * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
          });
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          }, 50);
        }}
        initialNumToRender={1}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.banner} />
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  slide: {
    width: width,
    alignItems: 'center',
  },
  banner: {
    width: width * 0.85,
    height: 120,
    borderRadius: 8,
  },
  caption: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});
