const express = require('express');
const cookieParser = require('cookie-parser');
const usuarioRouter = require('./routes/usuario');
const tarefaRouter = require('./routes/tarefas');
const app = express();
const PORT =  3001;
const { Sequelize } = require('sequelize');
const sequelize = require('./sequelize');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());


// Models importações
const Tarefa = require('./models/tarefa');
const Usuario = require('./models/usuario');
sequelize.sync();
// comentario

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/usuario', usuarioRouter);
app.use('/tarefa', tarefaRouter);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
