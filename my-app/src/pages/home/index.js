import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

// Reusable components
import CardStat from '../../components/cart-stat';
import ProductItem from '../../components/product-item';
import Header from '../../components/header';

export default function Home({ navigation }) {
  // Summary data
  const summary = [
    { icon: 'cube-outline', label: 'Produtos', value: 120, color: colors.primary },
    { icon: 'layers-outline', label: 'Stock', value: 842, color: colors.tertiary },
    { icon: 'cart-outline', label: 'Encomendas', value: 35, color: colors.success },
  ];

  // Product data (Boticário - Nativa Spa)
  const recentProducts = [
    {
        id: 1,
        name: 'Nativa Spa Ameixa Negra Body Lotion 400ml',
        category: 'Moisturizers',
        stock: 35,
        price: 15,
        barcode: 'B001',
    },
    {
        id: 2,
        name: 'Nativa Spa Quinoa Hydrating Body Oil 200ml',
        category: 'Body Oils',
        stock: 20,
        price: 14,
        barcode: 'B002',
    },
    {
        id: 3,
        name: 'Nativa Spa Lilac Hand Cream 75g',
        category: 'Personal Care',
        stock: 45,
        price: 13,
        barcode: 'B003',
    },
    {
        id: 4,
        name: 'Nativa Spa Ameixa Negra Body Splash 200ml',
        category: 'Fragrances',
        stock: 30,
        price: 16,
        barcode: 'B004',
    },
    {
        id: 5,
        name: 'Nativa Spa Quinoa Liquid Body Soap 400ml',
        category: 'Hygiene',
        stock: 25,
        price: 10,
        barcode: 'B005',
    },
];


  return (
    <FlatList
      data={recentProducts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductItem
          name={item.name}
          category={item.category}
          stock={item.stock}
          price={item.price}
          barcode={item.barcode}
        />
      )}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          {/* Header */}
          <Header title="Inventory" subtitle="Bem-vindo de volta 👋" />

          {/* Summary section */}
          <View style={styles.statsContainer}>
            {summary.map((item, index) => (
              <CardStat
                key={index}
                icon={item.icon}
                label={item.label}
                value={item.value}
                color={item.color}
              />
            ))}
          </View>

          {/* Quick shortcuts */}
          <Text style={styles.sectionTitle}>Atalhos Rápidos</Text>
          <View style={styles.shortcuts}>
            <TouchableOpacity
              style={[styles.shortcut, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('Products')}
            >
              <Ionicons name="add-circle-outline" size={26} color={colors.white} />
              <Text style={styles.shortcutText}>Adicionar Produto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.shortcut, { backgroundColor: colors.tertiary }]}
              onPress={() => navigation.navigate('OrdersSupplier')}
            >
              <Ionicons name="cart-outline" size={26} color={colors.white} />
              <Text style={styles.shortcutText}>Nova Encomenda</Text>
            </TouchableOpacity>
          </View>

          {/* Product list title */}
          <Text style={styles.sectionTitle}>Últimos Produtos</Text>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayDark,
    marginTop: 25,
    marginBottom: 10,
  },
  shortcuts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortcut: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
  },
  shortcutText: {
    color: colors.white,
    fontWeight: '600',
    marginLeft: 6,
  },
});
