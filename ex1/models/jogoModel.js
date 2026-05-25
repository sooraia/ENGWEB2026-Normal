const mongoose = require('mongoose')


const jogoSchema = new mongoose.Schema({
    _id: { type: String, default: ()=> new mongoose.Types.ObjectId().toString() },
    name: { type: String, required: true },
    year: Number,
    category: String,
    minPlayers: Number,
    maxPlayers: Number,
    playingTimeMinutes: Number,
    descriptionEN: String,
    autores: [{ _id: String, name: String }],
    editoras: [{ _id: String, name: String, country: String }],
    mecanicas: [{ _id: String, name: String }],
    premios: [{ _id: String, name: String, year: Number }]
})

const Jogo = mongoose.model('Jogo', jogoSchema, 'jogos'); 

module.exports = Jogo;

