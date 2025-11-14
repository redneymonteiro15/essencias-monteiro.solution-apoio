import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('inventory.db');

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Categoria (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Produto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        categoria_id INTEGER,
        codigoBarra TEXT,
        imagem TEXT,
        FOREIGN KEY (categoria_id) REFERENCES Categoria(id)
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS ProdutoEmStock (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        produto_id INTEGER,
        quantidade INTEGER DEFAULT 0,
        precoVenda REAL,
        FOREIGN KEY (produto_id) REFERENCES Produto(id)
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS EncomendaFornecedor (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT,
        fornecedor TEXT
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS ProdutoEncomendaFornecedor (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        encomendaFornecedor_id INTEGER,
        produto_id INTEGER,
        quantidade INTEGER,
        valorCompra REAL,
        fatura TEXT,
        FOREIGN KEY (encomendaFornecedor_id) REFERENCES EncomendaFornecedor(id),
        FOREIGN KEY (produto_id) REFERENCES Produto(id)
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS EncomendaCliente (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeCliente TEXT,
        dataCompra TEXT
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS ProdutoEncomendaCliente (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        encomendaCliente_id INTEGER,
        produto_id INTEGER,
        quantidade INTEGER,
        valorVenda REAL,
        FOREIGN KEY (encomendaCliente_id) REFERENCES EncomendaCliente(id),
        FOREIGN KEY (produto_id) REFERENCES Produto(id)
      );
    `);
  });
};

export default db;
