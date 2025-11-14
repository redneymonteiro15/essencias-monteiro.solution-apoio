import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../theme';

export default function CardStat({ image, label, value, color }) {
  return (
    <View style={[styles.card, { borderColor: color || colors.primary }]}>
      <Image
        source={
          image
            ? { uri: image }
            : require('../../assets/products/produto.png')
        }
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: color || colors.primary }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    width: '30%',
    alignItems: 'center',
    paddingVertical: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  image: {
    width: 28,
    height: 28,
    tintColor: colors.primary, 
  },
  label: { color: colors.grayDark, fontSize: 13, marginTop: 5 },
  value: { fontSize: 18, fontWeight: 'bold', marginTop: 4 },
});
