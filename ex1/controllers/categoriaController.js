const { create } = require('domain');
const Categoria = require('../models/categoriaModel');

const categoriaController = {
    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.find({}, {_id: 0}).sort({ name: 1 }).exec();

            res.json(categorias);
            
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = categoriaController;