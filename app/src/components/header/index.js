import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export default function Header({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: 40, marginBottom: 10 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.grayDark,
  },
});
