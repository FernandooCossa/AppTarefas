const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const sequelize = require('../sequelize');


//GET Retorna tarefas com paginação e ordenação
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`SELECT * FROM usuarios`)
    .then(([results, metadata]) => {
        res.json(results);
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//GET Consulta uma tarefa pelo ID
router.get('/:id', async (req, res) => {
    sequelize.query(`SELECT * FROM usuarios WHERE id = ${req.params.id}`)
    .then(([results, metadata]) => {
        if(results.length === 0){
            res.status(404).json({
                sucess: false,
                message:"usuario não encontrada",
            });
        }else{
            res.json({
                sucess: true,
                Tarefa: results[0],
            });
        }
    }).catch((error) => {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    });
});

//POST Cria uma tarefa
router.post('/', async (req, res) => {
    sequelize.query(`INSERT INTO usuarios (usarname, email, senha, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`, 
    
        { replacements: [req.body.usarname, req.body.email, req.body.senha, req.body.createdAt, req.body.updatedAt]}
    )
    .then(([results, metadata]) => {
        res.status(201).json({
            sucess: true,
            success: true,
            message: "usuario criada com sucesso",
        });
    }).catch((error) => {
        res.status(500).json({
            sucess: false,
            success: false,
            message: error.message,
        });
    });
});

//PUT Atualiza uma tarefa pelo ID
router.put('/:id', async (req, res) => {
    sequelize.query(`UPDATE usuarios SET senha = ${req.body.senha} WHERE id = ${req.params.id}`)
    .then(([results, metadata]) => {
        if(metadata.affectedRows === 0){
            res.status(404).json({
                sucess: false,
                message:"usuario não encontrada",
            });
        }else{
            res.json({
                sucess: true,
                message: "senha atualizada com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    });
});

//DELETE Deleta uma tarefa pelo ID
router.delete('/:id', async (req, res) => {
    sequelize.query(`DELETE FROM usuarios WHERE id = ${req.params.id}`)
    .then(([results, metadata]) => {
        if(metadata.affectedRows === 0){
            res.status(404).json({
                sucess: false,
                message:"usuario não encontrada",
            });
        }else{
            res.json({
                sucess: true,
                message: "usuario deletada com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    });
});

module.exports = router;
