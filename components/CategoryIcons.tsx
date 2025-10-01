import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const categories = [
  { label: 'Wish List', icon: require('../assets/icons/wishlist.png') },
  { label: 'Wholesale', icon: require('../assets/icons/wholesale.png') },
  { label: 'Bargain Zone', icon: require('../assets/icons/bargain.png') },
  { label: 'New Arrival', icon: require('../assets/icons/new.png') },
  { label: 'Dress', icon: require('../assets/icons/dress.png') },
  { label: 'Tops', icon: require('../assets/icons/tops.png') },
  { label: 'Sneakers', icon: require('../assets/icons/sneakers.png') },
  { label: 'Earphones', icon: require('../assets/icons/earphones.png') },
];

export function CategoryIcons() {
  return (
    <View style={styles.grid}>
      {categories.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item}>
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  item: { alignItems: 'center', width: '22%', marginBottom: 16 },
  icon: { width: 40, height: 40, marginBottom: 6 },
  label: { fontSize: 12, color: '#333', textAlign: 'center' },
});

