const express = require('express');
const autorRouter = express.Router();
const autorController = require('../controllers/autorController');

// GET /autores: devolve a lista das autors, ordenada alfabeticamente e sem repetições
// (lista de pares: autor, lista de jogos pertencentes à autor, cada jogo representado por um
// par: id, nome);
autorRouter.get('/autores', autorController.getAllAutores);
module.exports = autorRouter;

