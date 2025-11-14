import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Dropdown from 'react-native-input-select';

export default function Home() {
  const [categoria, setCategoria] = useState(null);

  const categorias = [
    { label: 'Perfume', value: 'perfume' },
    { label: 'Hidratante', value: 'hidratante' },
    { label: 'Maquiagem', value: 'maquiagem' },
    { label: 'Outros', value: 'outros' },
  ];

  return (
    <View style={styles.container}>
      <Dropdown
        label="Categoria"
        placeholder="Selecione uma categoria"
        options={categorias}
        value={categoria}
        onChange={setCategoria}
        style={styles.dropdown}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  dropdown: {
    marginBottom: 12,
  },
});
