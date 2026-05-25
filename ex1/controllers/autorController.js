const { create } = require('domain');
const Autor = require('../models/autorModel');

const autorController = {
    getAllAutores: async (req, res) => {
        try {
            const autors = await Autor.find({}, {_id: 0}).sort({ name: 1 }).exec();

            res.json(autors);
            
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = autorController;