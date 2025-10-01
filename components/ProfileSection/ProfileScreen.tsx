import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/ProfileSection/Header';
import { OrderStatus } from '../../components/ProfileSection/OrderStatus';
import { ProfileOption } from '../../components/ProfileSection/ProfileOption';
import { BottomNav } from '@/components/BottomNav';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        <OrderStatus />
        <View style={styles.section}>
          <ProfileOption label="Wish List" icon="heart-outline" />
          <ProfileOption label="Store Followed" icon="storefront-outline" />
          <ProfileOption label="Recently Viewed" icon="time-outline" />
          <ProfileOption label="My Vouchers (0)" icon="pricetags-outline" />
          <ProfileOption label="My K-Pay (Balance: 0)" icon="wallet-outline" />
          <ProfileOption label="Address Management" icon="location-outline" />
          <ProfileOption label="Service Center" icon="help-circle-outline" />
          <ProfileOption label="Invite Friend" icon="person-add-outline" />
          <ProfileOption label="Friend's Code" icon="key-outline" />
        </View>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingBottom: 80,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
