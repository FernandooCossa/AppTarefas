const express = require('express');
const router = express.Router();
const Tarefa = require('../models/tarefa');
const sequelize = require('../sequelize');

// Sincroniza o modelo 'Tarefa' com o banco de dados
Tarefa.sync();

// Rota GET: Retorna tarefas com paginação e ordenação
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    // Consulta todas as tarefas na tabela 'tarefas'
    sequelize.query('SELECT * FROM tarefas')
        .then(([results, metadata]) => {
            res.json(results);
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Erro ao obter tarefas: ${error.message}`,
            });
        });
});

// Rota GET: Consulta uma tarefa pelo ID
router.get('/:id', async (req, res) => {
    // Consulta uma tarefa específica na tabela 'tarefas' pelo ID
    sequelize.query(`SELECT * FROM tarefas WHERE id = ${req.params.id}`)
        .then(([results, metadata]) => {
            if (results.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "Tarefa não encontrada",
                });
            } else {
                res.json({
                    success: true,
                    tarefa: results[0],
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Erro ao obter a tarefa: ${error.message}`,
            });
        });
});

//Filtro por titulo
router.get("/filtro/:palavra", async(req,res)=> {
    const palavra = req.params.palavra; // palavra ou titulo a pesquisar
    sequelize.query(`SELECT * FROM tarefas WHERE titulo LIKE '%${palavra}%'`)
    .then(([results, metadata]) => {
        if (results.length === 0) {
            res.status(404).json({
                success: false,
                message: "Tarefa não encontrada",
            });
        } else {
            res.json({
                success: true,
                tarefa: results,
            });
        }
    })
    .catch((error) => {
        res.status(500).json({
            success: false,
            message: `Erro ao obter a tarefa: ${error.message}`,
        });
    });
});

// Rota POST: Cria uma tarefa
router.post('/', async (req, res) => {
    // Insere uma nova tarefa na tabela 'tarefas'
    sequelize.query(
        `INSERT INTO tarefas (titulo, descricao, status, data_criacao, data_limite) VALUES (?, ?, ?, ?, ?)`,
        { replacements: [req.body.titulo, req.body.descricao, req.body.status, new Date(), new Date()] }
    )
        .then(([results, metadata]) => {
            res.status(201).json({
                success: true,
                message: "Tarefa criada com sucesso",
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Erro ao criar a tarefa: ${error.message}`,
            });
        });
});

// Rota PUT: Atualiza uma tarefa pelo ID
router.put('/:id', async (req, res) => {
    // Atualiza a descrição de uma tarefa específica na tabela 'tarefas' pelo ID
    sequelize.query(`UPDATE tarefas SET status = ? WHERE idtarefas = ?`,
    { replacements: [req.body.status, req.params.id] })
        .then(([results, metadata]) => {
            if (metadata.affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: "Tarefa não encontrada",
                });
            } else {
                res.json({
                    success: true,
                    message: "Tarefa atualizada com sucesso",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Erro ao atualizar a tarefa: ${error.message}`,
            });
        });
});

// Rota DELETE: Deleta uma tarefa pelo ID
router.delete('/:id', async (req, res) => {
    // Deleta uma tarefa específica na tabela 'tarefas' pelo ID
    sequelize.query(`DELETE FROM tarefas WHERE idtarefas = ${req.params.id}`)
        .then(([results, metadata]) => {
            if (metadata.affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: "Tarefa não encontrada",
                });
            } else {
                res.json({
                    success: true,
                    message: "Tarefa deletada com sucesso",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Erro ao deletar a tarefa: ${error.message}`,
            });
        });
});

// Exporta as rotas para uso em outros arquivos
module.exports = router;
