import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Header from "../../components/header";
import ModalOrderDetailsClient from "../../components/modal-order-details-client";
import ModalAddClientOrder from "../../components/modal-add-client-order";
import { colors, metrics } from "../../theme";

// MOCK — substituir depois pelo SQLite
const MOCK_CLIENT_ORDERS = [
  {
    id: 1,
    cliente: "João Pereira",
    data: "2024-01-22",
    produtos: [
      { nome: "Perfume Lavanda", quantidade: 2, valorCompra: 2.5, valorVenda: 5 },
      { nome: "Frasco 100ml", quantidade: 3, valorCompra: 0.2, valorVenda: 0.5 },
    ],
  },
  {
    id: 2,
    cliente: "Maria Silva",
    data: "2024-01-20",
    produtos: [
      { nome: "Essência Baunilha", quantidade: 1, valorCompra: 3, valorVenda: 6 },
      { nome: "Frasco 50ml", quantidade: 5, valorCompra: 0.15, valorVenda: 0.4 },
    ],
  },
];

export default function OrdersClient() {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const sorted = [...MOCK_CLIENT_ORDERS].sort(
    (a, b) => new Date(b.data) - new Date(a.data)
  );

  const filtered = sorted.filter((order) =>
    order.cliente.toLowerCase().includes(search.toLowerCase())
  );

  const openOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <Header title="Clientes" subtitle="Lista de Vendas Realizadas" />

      {/* PESQUISA */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.grayDark} />
        <TextInput
          placeholder="Pesquisar cliente..."
          placeholderTextColor={colors.grayMedium}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* LISTA */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 120 }}
        style={{ marginTop: 10 }}
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
                <Text style={styles.orderId}>Venda #{item.id}</Text>
                <Text style={styles.orderCliente}>{item.cliente}</Text>
                <Text style={styles.orderInfo}>Produtos: {totalProdutos}</Text>
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

      {/* BOTÃO ADICIONAR */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* MODAL DETALHES */}
      <ModalOrderDetailsClient
        visible={showModal}
        order={selectedOrder}
        onClose={() => setShowModal(false)}
      />

      {/* MODAL ADICIONAR VENDA */}
      <ModalAddClientOrder
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
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

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
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

  orderCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },

  orderCliente: {
    fontSize: 15,
    color: colors.grayDark,
    marginTop: 2,
  },

  orderInfo: {
    fontSize: 14,
    color: colors.grayMedium,
    marginTop: 3,
  },

  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
