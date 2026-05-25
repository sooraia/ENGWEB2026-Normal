const express = require('express');
const categoriaRouter = express.Router();
const categoriaController = require('../controllers/categoriaController');

// GET /categorias: devolve a lista das categorias, ordenada alfabeticamente e sem repetições
// (lista de pares: categoria, lista de jogos pertencentes à categoria, cada jogo representado por um
// par: id, nome);
categoriaRouter.get('/categorias', categoriaController.getAllCategorias);
module.exports = categoriaRouter;

