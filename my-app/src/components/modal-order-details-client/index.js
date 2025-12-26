import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';
import { stylesGlobal } from '../../styles/globalStyles';

export default function ModalOrderDetailsClient({ visible, onClose, order }) {
  if (!order) return null;

  // totais
  const totalProdutos = order.produtos?.reduce((sum, p) => sum + p.quantidade, 0);
  const totalCompra = order.produtos?.reduce((sum, p) => sum + p.quantidade * p.valorCompra, 0);
  const totalVenda = order.produtos?.reduce((sum, p) => sum + p.quantidade * p.valorVenda, 0);
  const totalGanho = totalVenda - totalCompra;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={stylesGlobal.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Venda Cliente #{order.id}</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color={colors.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.clientText}>
          Cliente: <Text style={{ fontWeight: 'bold' }}>{order.cliente}</Text>
        </Text>
        <Text style={styles.clientText}>
          Data: <Text style={{ fontWeight: 'bold' }}>{order.data}</Text>
        </Text>

        <ScrollView style={{ marginTop: 15 }}>

          <Text style={styles.sectionTitle}>Produtos Vendidos</Text>

          {order.produtos?.map((p, i) => (
            <View key={i} style={styles.productItem}>
              <View>
                <Text style={styles.productName}>{p.nome}</Text>
                <Text style={styles.productInfo}>Qtd: {p.quantidade}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.productPrice}>Compra: €{p.valorCompra}</Text>
                <Text style={styles.productPrice}>Venda: €{p.valorVenda}</Text>
                <Text style={styles.productPrice}>Ganho: €{((p.valorVenda - p.valorCompra) * p.quantidade)}</Text>
              </View>
            </View>
          ))}

          {/* Resumo */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryItem}>
              Total de produtos: <Text style={styles.bold}>{totalProdutos}</Text>
            </Text>
            <Text style={styles.summaryItem}>
              Total Compra: <Text style={styles.bold}>€{totalCompra}</Text>
            </Text>
            <Text style={styles.summaryItem}>
              Total Venda: <Text style={styles.bold}>€{totalVenda}</Text>
            </Text>
            <Text style={styles.summaryItem}>
              Ganho Total: <Text style={styles.bold}>€{totalGanho}</Text>
            </Text>
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  closeButton: {
    position: 'absolute',
    right: 0,
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },

  clientText: {
    fontSize: 16,
    color: colors.grayDark,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 6,
    color: colors.grayDark,
  },

  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.grayLight,
  },

  productName: {
    fontSize: 16,
    fontWeight: '600',
  },

  productInfo: {
    color: colors.grayDark,
    fontSize: 14,
  },

  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },

  summaryBox: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  summaryItem: {
    fontSize: 16,
    marginVertical: 4,
  },

  bold: {
    fontWeight: 'bold',
  },
});
