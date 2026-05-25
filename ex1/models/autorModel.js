const mongoose = require('mongoose')

const autorSchema = new mongoose.Schema({
    _id: { type: String, default: ()=> new mongoose.Types.ObjectId().toString() },
    name: { type: String, required: true },
    jogos: [{ _id: String, name: String }]
})

const Autor = mongoose.model('Autor', autorSchema, 'autores');

module.exports = Autor;

