class Categoria {
  int id
  string nome
}

class Produto {
  int id
  imagem
  string nome
  string categoria
  qrcode
}

class Fornecedor {
  int id
  string nome
  string nif
  string telefone
}

class EncomendaCliente {
  int id
  string nomeCliente
  date data
}

class EncomendaFornecedor {
  int id
  int idFornecedor
  date data
  float valorPortes
  string faturaURL
}

class ItemEncomenda {
  int id
  int idEncomendaFornecedor
  int idEncomendaCliente
  int idProduto
  float valorCompra
  float valorVenda
  status ("Vendido", "Por Dender") ou true or false
}



host: 185.12.116.164
porta: 3308
username: user
senha: 1234


username: soluti14_user_remote_essencia
senha: Ltm4,7nvPC7Jb)Z.