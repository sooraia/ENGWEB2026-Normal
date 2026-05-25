const express = require('express');
const jogoRouter = express.Router();
const jogoController = require('../controllers/jogoController');


// GET /jogos: devolve uma lista com todos os jogos (campos: id (ou _id), name, year, category,
// minPlayers);
// GET /jogos?editora=EEEE: devolve a lista de jogos que foram publicados pela editora EEEE: id
// (ou _id), name, year;
jogoRouter.get('/jogos', jogoController.getAllJogos);

// GET /jogos/:id: devolve toda a informação do jogo com o identificador passado na rota (todos
// os campos);
jogoRouter.get('/jogos/:id', jogoController.getJogoById);

// POST /jogos: acrescenta um registo novo à BD, neste caso, um novo jogo;
jogoRouter.post('/jogos', jogoController.createJogo);

// DELETE /jogos/:id: elimina da BD o registo correspondente ao jogo com o identificador
// passado na rota;
jogoRouter.delete('/jogos/:id', jogoController.deleteJogo);

// PUT /jogos/:id: altera o registo do jogo com o identificador passado na rota;
jogoRouter.put('/jogos/:id', jogoController.updateJogo);

module.exports = jogoRouter;

