import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CategorySections from '../../components/CategorySections';
import { SearchBar } from '../../components/SearchBar';
import { BottomNav } from '../../components/BottomNav';

const CategoryTab: React.FC = () => {
  const sidebarCategories = [
    'Recommend',
    'Clothing',
    'Shoes',
    'Luggage & Bags',
    'Watch & Jewelry',
    'Kids & Toys',
    'Home & Appliances',
    'Beauty',
    'Medicine',
    'Phones & Telecommunications',
    'Electronics',
    'Computer & Office',
    'Automobiles & Motorcycles',
    'Sports & Entertainment',
  ];

  const [selectedCategory, setSelectedCategory] = useState('Recommend');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Modular Search Bar */}
      <SearchBar  />

      <View style={styles.contentContainer}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {sidebarCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sidebarItem,
                  selectedCategory === category && styles.selectedSidebarItem,
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text
                  style={[
                    styles.sidebarText,
                    selectedCategory === category && styles.selectedSidebarText,
                  ]}
                >
                  {category}
                </Text>
                {selectedCategory === category && (
                  <View style={styles.selectedIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {selectedCategory === 'Recommend' ? (
            <CategorySections />
          ) : (
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>{selectedCategory}</Text>
              <Text style={styles.comingSoonText}>Content coming soon...</Text>
            </View>
          )}
        </View>
      </View>

      {/* Modular Bottom Navigation */}
      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 100,
    backgroundColor: '#f8f8f8',
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
  },
  sidebarItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    position: 'relative',
  },
  selectedSidebarItem: {
    backgroundColor: '#fff',
  },
  sidebarText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  selectedSidebarText: {
    color: '#FF6B35',
    fontWeight: '500',
  },
  selectedIndicator: {
    position: 'absolute',
    right: 0,
    top: '50%',
    width: 3,
    height: 20,
    backgroundColor: '#FF6B35',
    marginTop: -10,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#999',
  },
});

export default CategoryTab;
