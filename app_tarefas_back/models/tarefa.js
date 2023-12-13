// Importando as dependências necessárias
const db = require('../sequelize.js');
const Sequelize = require("sequelize");

// Definindo o modelo 'Tarefa' para tarefas no banco de dados
const Tarefa = db.define('Tarefa', {
  // Definindo atributos do modelo
  idtarefas: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_criacao: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  data_limite: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, 
);

// Sincronizando o modelo com o banco de dados
Tarefa.sync();

// Exportando o modelo 'Tarefa' para uso externo
module.exports = Tarefa;

