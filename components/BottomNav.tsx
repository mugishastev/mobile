import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

type IoniconName = 'home' | 'cart' | 'grid' | 'person' | 'bag-add';
type TabRoute = '/' | '/category' | '/shopping' | '/cart' | '/profile';

type BottomNavProps = {
  activeTab?: TabRoute;
  totalItems?: number;
  totalPrice?: number;
};

export function BottomNav({ activeTab, totalItems }: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentRoute = activeTab ?? pathname;

  const tabs: { label: string; icon: IoniconName; route: TabRoute }[] = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'Category', icon: 'grid', route: '/category' },
    { label: 'Shopping', icon: 'bag-add', route: '/shopping' },
    { label: 'Cart', icon: 'cart', route: '/cart' },
    { label: 'My KAPEE', icon: 'person', route: '/profile' },
  ];

  return (
    <View style={styles.nav}>
      {tabs.map((tab) => {
        const isActive = currentRoute === tab.route;
        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.item}
            onPress={() => router.replace(tab.route)}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? '#e4d618ff' : '#080101ff'}
            />
            {tab.route === '/cart' && totalItems && totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>{totalItems}</Text>
              </View>
            )}
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 60,
    backgroundColor: '#fdfbfbff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.2,
    borderTopColor: '#302f2fff',
    paddingBottom: 6,
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#080000ff',
    marginTop: 2,
    fontWeight: '500',
    lineHeight: 20,
  },
  activeLabel: {
    color: '#f8e80dff',
    fontWeight: '600',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
