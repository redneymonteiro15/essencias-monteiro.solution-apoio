import { Platform, StyleSheet } from "react-native";
import { colors, metrics } from "../theme";

export const stylesGlobal = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
    backgroundColor: colors.primary
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },

  // Inputs
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    fontSize: 15,
  },

  // Cards da lista
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  cardSubText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },

  // Botões
  primaryButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: "#EEEEEE",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  secondaryButtonText: {
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },

  // Modal
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },

  modalBox: {
    backgroundColor: "#fff",
    width: "100%",
    maxHeight: "90%",
    padding: 20,
    borderRadius: 12,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },

  modalLabel: {
    fontWeight: "700",
    marginTop: 10,
    fontSize: 15,
    color: "#444",
  },

  modalValue: {
    fontSize: 16,
    color: "#222",
    marginBottom: 5,
  },

  modalTotal: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 5,
    color: "#1E88E5",
  },

  closeButton: {
    backgroundColor: "#E53935",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },

  closeButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },

  // Tabela de produtos
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },

  tableHeaderText: {
    fontWeight: "700",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  tableCell: {
    flex: 1,
    textAlign: "center",
    color: "#444",
  },
});
