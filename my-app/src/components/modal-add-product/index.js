import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

export default function ModalAddProduct({ visible, onClose, onSave }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const handleSave = () => {
    if (!name || !category || !stock || !price) {
      alert('Please fill all fields');
      return;
    }

    onSave({
      name,
      category,
      stock,
      price,
      imageUri,
    });

    setName('');
    setCategory('');
    setStock('');
    setPrice('');
    setImageUri(null);
    onClose();
  };

  return (
    <Modal
      animationType="slide" // efeito vindo de baixo
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {/* X para fechar */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={32} color={colors.grayDark} />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Adicionar Produto</Text>

          {/* Image Picker */}
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Ionicons name="image-outline" size={50} color={colors.grayMedium} />
            )}
            <Text style={styles.imageText}>Escolher Imagem</Text>
          </TouchableOpacity>

          {/* Input Fields */}
          <TextInput
            placeholder="Nome do Produto"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Categoria"
            style={styles.input}
            value={category}
            onChangeText={setCategory}
          />
          <TextInput
            placeholder="Stock"
            style={styles.input}
            value={stock}
            onChangeText={setStock}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Preço"
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          {/* Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },

  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },

  scrollContainer: { padding: 20, paddingTop: 80 },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },

  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },

  image: { width: 120, height: 120, borderRadius: 10, marginBottom: 10 },

  imageText: { color: colors.grayDark, marginTop: 5 },

  input: {
    borderWidth: 1,
    borderColor: colors.grayMedium,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  saveButton: {
    flex: 1,
    backgroundColor: colors.success,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 5,
  },

  saveText: { color: colors.white, fontWeight: 'bold' },

  cancelButton: {
    flex: 1,
    backgroundColor: colors.danger,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 5,
  },

  cancelText: { color: colors.white, fontWeight: 'bold' },
});
