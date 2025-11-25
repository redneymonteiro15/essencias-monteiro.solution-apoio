import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../../components/header';
import ModalOrderDetails from '../../components/modal-order-details';
import { colors, metrics } from '../../theme';

// ==============================
// MOCK de encomendas
// (trocar depois por SELECT no SQLite)
// ==============================
const MOCK_ORDERS = [
  {
    id: 101,
    data: '2024-01-15',
    fornecedor: 'Fornecedor A',
    valorPortes: 3.5,
    fatura: null,
    produtos: [
      { nome: 'Essência Lavanda', quantidade: 4, valorCompra: 2.7 },
      { nome: 'Frasco 100ml', quantidade: 10, valorCompra: 0.25 },
    ],
  },

  {
    id: 102,
    data: '2024-01-10',
    fornecedor: 'Fornecedor B',
    valorPortes: 5,
    fatura:
      'https://www.shutterstock.com/shutterstock/photos/1969862209/display_1500/stock-vector-invoice-template-modern-business-style-for-your-company-invoice-design-1969862209.jpg',
    produtos: [
      { nome: 'Essência Coco', quantidade: 5, valorCompra: 3.2 },
      { nome: 'Frasco 50ml', quantidade: 12, valorCompra: 0.15 },
    ],
  },
];

export default function OrdersSupplier() {
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Ordena por mais recente
  const sortedOrders = MOCK_ORDERS.sort(
    (a, b) => new Date(b.data) - new Date(a.data)
  );

  // Filtro de pesquisa por ID ou fornecedor
  const filteredOrders = sortedOrders.filter(order => {
    const text = search.toLowerCase();

    return (
      order.id.toString().includes(text) ||
      order.fornecedor.toLowerCase().includes(text)
    );
  });

  const openOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      
      {/* ============================== */}
      {/* HEADER */}
      {/* ============================== */}
      <Header
        title="Fornecedores"
        subtitle="Gerencie as suas encomendas"
      />

      {/* ============================== */}
      {/* BARRA DE PESQUISA */}
      {/* ============================== */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.grayDark} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar por ID ou fornecedor..."
          placeholderTextColor={colors.grayMedium}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ============================== */}
      {/* LISTA DE ENCOMENDAS */}
      {/* ============================== */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => String(item.id)}
        style={{ marginTop: 10 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          const totalProdutos = item.produtos.reduce(
            (sum, p) => sum + p.quantidade,
            0
          );

          return (
            <TouchableOpacity
              style={styles.orderCard}
              onPress={() => openOrder(item)}
            >
              <View>
                <Text style={styles.orderId}>Encomenda #{item.id}</Text>
                <Text style={styles.orderFornecedor}>{item.fornecedor}</Text>
                <Text style={styles.orderInfo}>
                  Produtos: {totalProdutos}
                </Text>
                <Text style={styles.orderInfo}>Data: {item.data}</Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.grayDark}
              />
            </TouchableOpacity>
          );
        }}
      />

      {/* ============================== */}
      {/* BOTÃO FLUTUANTE */}
      {/* ============================== */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => alert('Abrir modal de adicionar encomenda')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* ============================== */}
      {/* MODAL DE DETALHES */}
      {/* ============================== */}
      <ModalOrderDetails
        visible={showModal}
        order={selectedOrder}
        onClose={() => setShowModal(false)}
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

  // Barra de pesquisa
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grayLight,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },

  // Cards de encomendas
  orderCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },

  orderFornecedor: {
    fontSize: 15,
    color: colors.grayDark,
    marginTop: 2,
  },

  orderInfo: {
    fontSize: 14,
    color: colors.grayMedium,
    marginTop: 3,
  },

  // Botão flutuante
  fab: {
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
});
