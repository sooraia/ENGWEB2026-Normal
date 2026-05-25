const express = require('express');
const router = express.Router();
const livroController = require('../controllers/controller');


// Novo livro
router.post('/livros', livroController.createLivro);

// Listar livros
router.get('/livros', livroController.getAllLivros);

// Apagar um livro
router.delete('/livros/:id', livroController.deleteLivro);

// editar um livro
router.put('/livros/:id', livroController.updateLivro);

module.exports = router;

