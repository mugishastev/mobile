import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const categories = [
  { title: 'Wish List', icon: require('../assets/images/category-icons/wishlist.png') },
  { title: 'Wholesale', icon: require('../assets/images/category-icons/wholesale.png') },
  { title: 'Bargain Zone', icon: require('../assets/images/category-icons/bargain.png') },
  { title: 'New Arrival', icon: require('../assets/images/category-icons/new.png') },
  { title: 'Dress', icon: require('../assets/images/category-icons/dress.png') },
  { title: 'Tops', icon: require('../assets/images/category-icons/tops.png') },
  { title: 'Sneakers', icon: require('../assets/images/category-icons/sneakers.png') },
  { title: 'Earphones', icon: require('../assets/images/category-icons/earphones.png') },
];

export function CategoryGrid() {
  return (
    <FlatList
      data={categories}
      numColumns={4}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.label}>{item.title}</Text>
        </View>
      )}
      contentContainerStyle={styles.grid}
    />
  );
}

const styles = StyleSheet.create({
  grid: { paddingHorizontal: 16, paddingBottom: 16 },
  item: { alignItems: 'center', marginBottom: 16, flex: 1 },
  icon: { width: 48, height: 48, marginBottom: 4 },
  label: { fontSize: 12, color: '#333' },
});
