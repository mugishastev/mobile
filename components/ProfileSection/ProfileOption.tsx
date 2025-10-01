import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileOptionProps {
  label: string;
  icon: string;
  onPress?: () => void;
}

export function ProfileOption({ label, icon, onPress }: ProfileOptionProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      console.log(`Pressed: ${label}`);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={16} color="#333" />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={12} color="#ccc" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#333',
    marginLeft: 10,
  },
});
