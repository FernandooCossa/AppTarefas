const db = require('../sequelize.js');
const Sequelize = require("sequelize");

const Tarefa = db.define('Tarefa', {
  // Model attributes are defined here
  idtarefas: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
    // allowNull defaults to true
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
    // allowNull defaults to true
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    // allowNull defaults to true
  },
  data_criacao: {
    type: Sequelize.DATE,
    allowNull: false,
    // allowNull defaults to true
  },
  data_limite: {
    type: Sequelize.DATE,
    allowNull: false,
    // allowNull defaults to true
  },
}, {
  // Other model options go here
});

Tarefa.sync();
module.exports = Tarefa;
// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true