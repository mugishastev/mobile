import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
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
          <ProfileOption label="Recently Viewed" icon="eye-outline" />
          <ProfileOption label="My Coupons" icon="pricetag-outline" />
          <ProfileOption label="Address Management" icon="location-outline" />
          <ProfileOption label="Service Center" icon="headset-outline" />
          <ProfileOption label="Invite Friend" icon="person-add-outline" />
          <ProfileOption label="Friend's Code" icon="qr-code-outline" />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>——— The End ———</Text>
        </View>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scroll: {
    paddingBottom: 100,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  footer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#ccc',
  },
});
