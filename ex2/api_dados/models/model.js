const mongoose = require('mongoose')

const livroSchema = new mongoose.Schema({
    _id: { type: String, default: ()=> new mongoose.Types.ObjectId().toString() },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    paginas: Number,
    genero: String,
    lido: Boolean

})

const Livro = mongoose.model('Livro', livroSchema, 'livros');

module.exports = Livro;

