import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

export default function ModalOrderDetails({ visible, onClose, order }) {
  if (!order) return null;

  // calcula totais
  const totalProdutos = order.produtos?.reduce(
    (sum, p) => sum + p.quantidade,
    0
  );

  const totalGasto =
    order.produtos?.reduce(
      (sum, p) => sum + p.quantidade * p.valorCompra,
      0
    ) + (order.valorPortes || 0);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>

        {/* Header do modal */}
        <View style={styles.header}>
          <Text style={styles.title}>Encomenda #{order.id}</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color={colors.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.supplierText}>
          Fornecedor: <Text style={{ fontWeight: 'bold' }}>{order.fornecedor}</Text>
        </Text>

        {/* Lista de produtos */}
        <ScrollView style={{ marginTop: 15 }}>

          <Text style={styles.sectionTitle}>Produtos Comprados</Text>

          {order.produtos?.map((p, i) => (
            <View key={i} style={styles.productItem}>
              <View>
                <Text style={styles.productName}>{p.nome}</Text>
                <Text style={styles.productInfo}>Qtd: {p.quantidade}</Text>
              </View>
              <Text style={styles.productPrice}>
                €{p.valorCompra.toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Resumo */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryItem}>
              Total de produtos: <Text style={styles.bold}>{totalProdutos}</Text>
            </Text>
            <Text style={styles.summaryItem}>
              Portes: <Text style={styles.bold}>€{order.valorPortes?.toFixed(2) || '0.00'}</Text>
            </Text>
            <Text style={styles.summaryItem}>
              Total gasto: <Text style={styles.bold}>€{totalGasto.toFixed(2)}</Text>
            </Text>
          </View>

          {/* Fatura */}
          <Text style={styles.sectionTitle}>Fatura</Text>

          {order.fatura ? (
            <Image
              source={{ uri: order.fatura }}
              style={styles.invoiceImage}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.noInvoiceText}>Nenhuma fatura carregada</Text>
          )}

        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 45,
  },

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

  supplierText: {
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
    fontSize: 16,
    fontWeight: 'bold',
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

  invoiceImage: {
    width: '100%',
    height: 300,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
  },

  noInvoiceText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.grayDark,
  },
});
