// Importando as dependências necessárias
const db = require('../sequelize.js');
const Sequelize = require("sequelize");

// Definindo o modelo 'Usuario' para usuários no banco de dados
const Usuario = db.define('Usuario', {
  // Definindo atributos do modelo
  idusuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  usarname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, 
);

// Sincronizando o modelo com o banco de dados
Usuario.sync();

// Exportando o modelo 'Usuario' para uso externo
module.exports = Usuario;

