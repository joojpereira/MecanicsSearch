import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/mockData';

export default function AppHeader({ showBack, onBack }) {
  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.logo}>AutoPeças</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="cart-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="settings-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: 4,
  },
  placeholder: {
    width: 32,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  actions: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 14,
  },
});
