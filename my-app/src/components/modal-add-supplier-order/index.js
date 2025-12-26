import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, metrics } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesGlobal } from "../../styles/globalStyles";

export default function ModalAddSupplierOrder({ visible, onClose, onSave }) {
  const [fornecedor, setFornecedor] = useState("");
  const [data, setData] = useState("");
  const [produtos, setProdutos] = useState([]);

  const addProduto = () => {
    setProdutos([
      ...produtos,
      { nome: "", quantidade: 1, preco: 0 },
    ]);
  };

  const updateProduto = (index, key, value) => {
    const newP = [...produtos];
    newP[index][key] = value;
    setProdutos(newP);
  };

  const salvar = () => {
    if (!fornecedor || !data || produtos.length === 0) {
      alert("Preencha tudo.");
      return;
    }
    onSave({ fornecedor, data, produtos });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={stylesGlobal.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nova Encomenda Fornecedor</Text>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.label}>Nome do Fornecedor</Text>
          <TextInput
            style={styles.input}
            value={fornecedor}
            onChangeText={setFornecedor}
            placeholder="Ex: AromaCompany"
          />

          <Text style={styles.label}>Data da Encomenda</Text>
          <TextInput
            style={styles.input}
            value={data}
            onChangeText={setData}
            placeholder="AAAA-MM-DD"
          />

          <Text style={styles.label}>Produtos</Text>

          {produtos.map((p, index) => (
            <View key={index} style={styles.prodBox}>
              <TextInput
                style={styles.input}
                placeholder="Produto"
                value={p.nome}
                onChangeText={(v) => updateProduto(index, "nome", v)}
              />

              <TextInput
                style={styles.input}
                placeholder="Quantidade"
                keyboardType="numeric"
                value={String(p.quantidade)}
                onChangeText={(v) =>
                  updateProduto(index, "quantidade", Number(v))
                }
              />

              <TextInput
                style={styles.input}
                placeholder="Preço Compra"
                keyboardType="numeric"
                value={String(p.preco)}
                onChangeText={(v) => updateProduto(index, "preco", Number(v))}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.addBtn} onPress={addProduto}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addBtnTxt}>Adicionar Produto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={salvar}>
            <Text style={styles.saveTxt}>Salvar Encomenda</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({

  header: {
    backgroundColor: colors.primary,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  headerTitle: {
    marginLeft: 12,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  content: { padding: 20 },

  label: { fontSize: 15, fontWeight: "600", marginTop: 15 },

  input: {
    backgroundColor: colors.grayLight,
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },

  prodBox: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: 8,
    marginTop: 10,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },

  addBtnTxt: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "700",
  },

  saveBtn: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },

  saveTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
