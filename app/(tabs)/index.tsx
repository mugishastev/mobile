import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../../components/ThemedView';
import { SearchBar } from '../../components/SearchBar';
import { PromoBanner } from '../../components/PromoBanner';
import { CategoryGrid } from '../../components/CategoryGrid';
import { StyleBanner } from '../../components/StyleBanner';
import { FlashSale } from '../../components/FlashSale';
import { KiKuuPicks } from '../../components/KiKuuPicks';
import { TodayDeal } from '../../components/TodayDeal';
import { BottomNav } from '@/components/BottomNav';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();


  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        {/* SearchBar */}
        <View style={styles.searchWrapper}>
          <SearchBar />
        </View>

        {/* FlatList for scrollable content */}
        <FlatList
          data={[]}
          renderItem={null}
          keyExtractor={() => 'static'}
          ListHeaderComponent={
            <>
              <PromoBanner />
              <CategoryGrid />
              <StyleBanner />
              <FlashSale />
              <KiKuuPicks />
              <TodayDeal />
            </>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              <Text style={styles.footerText}>The end</Text>
            </View>
          }
          contentContainerStyle={styles.scroll}
        />

        {/* Bottom Navigation */}
        <BottomNav />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchWrapper: {
    zIndex: 10,
    backgroundColor: '#f7f6faff',
  },
  scroll: {
    paddingBottom: 80,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});
