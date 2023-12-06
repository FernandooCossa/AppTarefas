// importand o sequelize
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); // PEGA TODAS CONFIGURAÇÕES DO .ENV

// criando a constante seuquelize e passando informações
const db = 
    new Sequelize(process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
         {
  host: process.env.DB_HOST,
  dialect: 'mysql' 
});

module.exports = db;

