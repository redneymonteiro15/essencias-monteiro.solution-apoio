import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ProductItem from '../../components/product-item';
import Header from '../../components/header';
import { colors, metrics } from '../../theme';

// categorias mockadas
const CATEGORIES = [
  { id: 0, label: 'Todos' },
  { id: 1, label: 'Categoria A' },
  { id: 2, label: 'Categoria B' },
  { id: 3, label: 'Categoria C' },
];

// produtos mockados
const PRODUCTS = [
  {
    id: 1,
    nome: 'Produto 1',
    categoria_id: 1,
    stock: 12,
    price: 9.99,
    codigoBarra: '123456789',
    imagem: null,
    categoria: 'Categoria A',
  },
  {
    id: 2,
    nome: 'Produto 2',
    categoria_id: 2,
    stock: 0, // não aparece
    price: 19.99,
    codigoBarra: '987654321',
    imagem: null,
    categoria: 'Categoria B',
  },
  {
    id: 3,
    nome: 'Produto 3',
    categoria_id: 3,
    stock: 7,
    price: 5.99,
    codigoBarra: '321654987',
    imagem: null,
    categoria: 'Categoria C',
  },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Filtra produtos por categoria e que tenham stock > 0
  const filteredProducts = PRODUCTS.filter(p => 
    p.stock > 0 && (selectedCategory === 0 || p.categoria_id === selectedCategory)
  );

  return (
    <View style={styles.container}>
      <Header title="Produtos" subtitle="Produtos disponíveis em stock" />

      {/* Categorias */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryBar}
        contentContainerStyle={styles.categoryContent}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryButton,
              selectedCategory === cat.id && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat.id && styles.categoryTextActive,
              ]}
              numberOfLines={1}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de produtos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => String(item.id)}
        style={{ marginTop: 10 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <ProductItem
            name={item.nome}
            category={item.categoria}
            stock={item.stock}
            price={item.price}
            barcode={item.codigoBarra}
            image={item.imagem}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: metrics.statusBarHeight + 10,
    backgroundColor: colors.background,
    paddingHorizontal: metrics.basePadding,
  },

  categoryBar: {
    height: 40, // barra compacta
  },

  categoryContent: {
    alignItems: 'center',
    paddingLeft: 2,
    paddingRight: 8,
  },

  categoryButton: {
    width: 90,
    height: 32,
    backgroundColor: colors.grayLight,
    borderRadius: 18,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryButtonActive: {
    backgroundColor: colors.primary,
  },

  categoryText: {
    color: colors.grayDark,
    fontSize: 13,
    fontWeight: '500',
  },

  categoryTextActive: {
    color: colors.white,
  },
});
