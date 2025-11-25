import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import ProductItem from '../../components/product-item';
import Header from '../../components/header';
import { colors, metrics } from '../../theme';
import ModalAddProduct from '../../components/modal-add-product';

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
    codigoBarra: '123456789',
    imagem: null,
    categoria: 'Categoria A',
  },
  {
    id: 2,
    nome: 'Produto 2',
    categoria_id: 2,
    codigoBarra: '987654321',
    imagem: null,
    categoria: 'Categoria B',
  },
  {
    id: 3,
    nome: 'Produto 3',
    categoria_id: 3,
    codigoBarra: '321654987',
    imagem: null,
    categoria: 'Categoria C',
  },
];

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const filteredProducts =
    selectedCategory === 0
      ? PRODUCTS
      : PRODUCTS.filter(p => p.categoria_id === selectedCategory);

  return (
    <View style={styles.container}>
      <Header title="Catálogo" subtitle="Gerencie seus produtos" />

      {/* Categorias fixas */}
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


      {/* Lista */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => String(item.id)}
        style={{ marginTop: 10 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <ProductItem
            name={item.nome}
            category={item.categoria}
            barcode={item.codigoBarra}
            image={item.imagem}
          />
        )}
      />

      {/* Botão flutuante */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal */}
      <ModalAddProduct
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={data => console.log('Salvar:', data)}
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
    marginTop: 10,
    paddingBottom: 8,
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

  fabButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
