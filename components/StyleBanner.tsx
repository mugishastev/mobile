import { View, Image, StyleSheet } from 'react-native';

export function StyleBanner() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/style-banner.jpeg')}
        style={styles.banner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 16 },
  banner: { width: '100%', height: 100, borderRadius: 8 },
});
