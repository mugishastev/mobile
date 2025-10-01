import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type BannerType = 'success' | 'error' | 'info';

interface Props {
  visible: boolean;
  type?: BannerType;
  message: string;
  onClose?: () => void;
}

export function NotificationBanner({ visible, type = 'info', message, onClose }: Props) {
  if (!visible) return null;
  return (
    <View style={[styles.banner, styles[type]]}>
      <Text style={styles.text}>{message}</Text>
      {onClose ? (
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  success: { backgroundColor: '#e6f7ee', borderWidth: 1, borderColor: '#1abc9c' },
  error: { backgroundColor: '#fdecea', borderWidth: 1, borderColor: '#e74c3c' },
  info: { backgroundColor: '#eef4ff', borderWidth: 1, borderColor: '#3b82f6' },
  text: { color: '#333', flex: 1, marginRight: 8 },
  close: { color: '#666', fontWeight: '700' },
});
