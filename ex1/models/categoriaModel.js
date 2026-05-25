const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({
    _id: { type: String, default: ()=> new mongoose.Types.ObjectId().toString() },
    name: { type: String, required: true },
    jogos: [{ _id: String, name: String }]
})

const Categoria = mongoose.model('Categoria', categoriaSchema, 'categorias');

module.exports = Categoria;

