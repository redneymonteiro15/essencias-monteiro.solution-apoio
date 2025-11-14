import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../theme';

export default function ProductItem({
  name,
  category,
  stock,
  price,
  barcode,
  image,
}) {
  return (
    <View style={styles.item}>
      <Image
        source={
          image
            ? { uri: image }
            : require('../../assets/products/produto.png') // imagem padrão
        }
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>

        <View style={styles.detailsRow}>
          <Text style={styles.label}>Stock:</Text>
          <Text style={styles.value}>{stock ?? 0}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.label}>Preço:</Text>
          <Text style={[styles.value, { color: colors.primary }]}>
            {price ? `${price.toFixed(2)}€` : '—'}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.label}>Código:</Text>
          <Text style={styles.value}>{barcode || 'N/A'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    tintColor: undefined, // remove o tint para exibir a cor real do produto
  },

  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayDark,
  },

  category: {
    fontSize: 13,
    color: colors.grayMedium,
    marginBottom: 6,
  },

  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },

  label: {
    fontSize: 13,
    color: colors.grayDark,
    fontWeight: '500',
    marginRight: 4,
  },

  value: {
    fontSize: 13,
    color: colors.grayMedium,
  },
});
