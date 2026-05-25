const { create } = require('domain');
const Livro = require('../models/model');

const livroController = {
    createLivro: async (req, res) => {
        try {
            const newLivro = new Livro(req.body);
            await newLivro.save();
            res.status(201).json(newLivro);
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    getAllLivros: async (req, res) => {
        try {
            const { search } = req.query;

            let queryObj = {};

            if (search) queryObj.$or = [
                {titulo: {$regex: search, $options: 'i'}},
                {autor: {$regex: search, $options: 'i'}}
            ];

            let query = Livro.find(queryObj);

            const livros = await query.exec();
            res.json(livros);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    deleteLivro: async (req, res) => {
        try {
            const livro = await Livro.findByIdAndDelete(req.params.id);
            if (!livro) {
                return res.status(404).json({message: 'Livro not found'})
            }
            else {
                res.json({message: 'Livro deleted successfully'});
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    updateLivro: async (req, res) => {
        try {
            const livro = await Livro.findByIdAndUpdate(req.params.id, {lido: req.body.lido}, {new: true});
            if (!livro) {
                return res.status(404).json({message: 'Livro not found'})
            }
            else {
                res.json(livro);
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = livroController;