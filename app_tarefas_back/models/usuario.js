const db = require('../sequelize.js');
const Sequelize = require("sequelize");

const Usuario = db.define('Usuario', {
  // Model attributes are defined here
  idusuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  usarname: {
    type: Sequelize.STRING,
    allowNull: false,
    // allowNull defaults to true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    // allowNull defaults to true
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

Usuario.sync();
module.exports = Usuario;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true