// Importando o Sequelize
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); // Obtém todas as configurações do arquivo .env

// Criando a constante 'db' e fornecendo informações para a conexão
const db = new Sequelize(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

// Exportando a constante 'db' para uso externo
module.exports = db;
