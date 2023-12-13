// Importação dos módulos necessários
const express = require('express');
const cookieParser = require('cookie-parser');
const usuarioRouter = require('./routes/usuario');
const tarefaRouter = require('./routes/tarefas');
var loginRouter = require('./routes/login');
const app = express();
const PORT =  3001;
const { Sequelize } = require('sequelize');
const sequelize = require('./sequelize');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuração para permitir requisições de diferentes origens (CORS)
app.use(cors());

// Configuração para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Importação dos modelos de dados
const Tarefa = require('./models/tarefa');
const Usuario = require('./models/usuario');

// Sincronização do modelo com o banco de dados
sequelize.sync();

// Configuração do middleware para tratar JSON e formulários URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuração das rotas para os recursos de usuário e tarefa
app.use('/usuario', usuarioRouter);
app.use('/tarefa', tarefaRouter);
app.use('/login', loginRouter);
// Inicialização do servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Exportação do aplicativo para uso em outros arquivos
module.exports = app;
