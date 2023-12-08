const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const sequelize = require('../sequelize');

// Sincroniza o modelo 'Usuario' com o banco de dados
Usuario.sync();

// Rota GET: Retorna usuários com paginação e ordenação
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    // Consulta todos os usuários na tabela 'usuarios'
    sequelize.query(`SELECT * FROM usuarios`)
        .then(([results, metadata]) => {
            res.json(results);
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Erro ao obter usuários: ${error.message}`,
            });
        });
});

// Rota GET: Consulta um usuário pelo ID
router.get('/:id', async (req, res) => {
    // Consulta um usuário específico na tabela 'usuarios' pelo ID
    sequelize.query(`SELECT * FROM usuarios WHERE id = ${req.params.id}`)
        .then(([results, metadata]) => {
            if (results.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado",
                });
            } else {
                res.json({
                    success: true,
                    usuario: results[0],
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Erro ao obter o usuário: ${error.message}`,
            });
        });
});

// Rota POST: Cria um usuário
router.post('/', async (req, res) => {
    // Insere um novo usuário na tabela 'usuarios'
    sequelize.query(
        `INSERT INTO usuarios (usarname, email, senha) VALUES (?, ?, ?)`,
        { replacements: [req.body.usarname, req.body.email, req.body.senha]}
    )
        .then(([results, metadata]) => {
            res.status(201).json({
                success: true,
                message: "Usuário criado com sucesso",
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Erro ao criar o usuário: ${error.message}`,
            });
        });
});

// Rota PUT: Atualiza a senha de um usuário pelo ID
router.put('/:id', async (req, res) => {
    // Atualiza a senha de um usuário específico na tabela 'usuarios' pelo ID
    sequelize.query(`UPDATE usuarios SET senha = ${req.body.senha} WHERE id = ${req.params.id}`)
        .then(([results, metadata]) => {
            if (metadata.affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado",
                });
            } else {
                res.json({
                    success: true,
                    message: "Senha atualizada com sucesso",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Erro ao atualizar a senha do usuário: ${error.message}`,
            });
        });
});

// Rota DELETE: Deleta um usuário pelo ID
router.delete('/:id', async (req, res) => {
    // Deleta um usuário específico na tabela 'usuarios' pelo ID
    sequelize.query(`DELETE FROM usuarios WHERE id = ${req.params.id}`)
        .then(([results, metadata]) => {
            if (metadata.affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado",
                });
            } else {
                res.json({
                    success: true,
                    message: "Usuário deletado com sucesso",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Erro ao deletar o usuário: ${error.message}`,
            });
        });
});

// Exporta as rotas para uso em outros arquivos
module.exports = router;
