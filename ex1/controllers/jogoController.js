const Jogo = require('../models/jogoModel');
const Autor = require('../models/autorModel');
const Categoria = require('../models/categoriaModel');

const jogoController = {
    createJogo: async (req, res) => {
        try {
            const newJogo = new Jogo(req.body);
            await newJogo.save();

            const jogoRef = getGameRef(newJogo);
            await atualizarAutores([], newJogo.autores || [], jogoRef);
            await atualizarCategorias(null, newJogo.category, jogoRef);

            res.status(201).json(newJogo);
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    getAllJogos: async (req, res) => {
        // GET /jogos: devolve uma lista com todos os jogos (campos: id (ou _id), name, year, category, minPlayers);
        try {
            const { search, editora } = req.query;

            let queryObj = {};

            if (search) queryObj.jogo = {$regex: search, $options: 'i'};

            if (editora) {
                // GET /jogos?editora=EEEE: devolve a lista de jogos que foram publicados pela editora EEEE: id
                // (ou _id), name, year;
                queryObj['editoras._id'] = editora;
                let query = Jogo.find(queryObj, {_id: 1, name: 1, year: 1});
                const jogos = await query.exec();
                res.json(jogos);
                return;
            }

            let query = Jogo.find(queryObj);

            const jogos = await query.exec();
            
            const result = jogos.map(jogo => ({
                _id: jogo._id,
                name: jogo.name,
                year: jogo.year,
                category: jogo.category,
                minPlayers: jogo.minPlayers
            }));
            res.json(jogos);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    deleteJogo: async (req, res) => {
        try {
            const jogo = await Jogo.findById(req.params.id);
            if (!jogo) {
                return res.status(404).json({message: 'Jogo not found'})
            }

            const jogoRef = getGameRef(jogo);
            await atualizarAutores(jogo.autores || [], [], jogoRef);
            await atualizarCategorias(jogo.category, null, jogoRef);

            await Jogo.findByIdAndDelete(req.params.id);
            res.json({message: 'Jogo deleted successfully'});
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    updateJogo: async (req, res) => {
        try {
            const jogoAntes = await Jogo.findById(req.params.id);
            if (!jogoAntes) {
                return res.status(404).json({message: 'Jogo not found'})
            }

            const jogo = await Jogo.findByIdAndUpdate(req.params.id, req.body, {new: true});
            const jogoRef = getGameRef(jogo);

            await atualizarAutores(jogoAntes.autores || [], jogo.autores || [], jogoRef);
            await atualizarCategorias(jogoAntes.category, jogo.category, jogoRef);

            res.json(jogo);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    getJogoById: async (req, res) => {
        try {
            const jogo = await Jogo.findById(req.params.id);
            if (!jogo) {
                return res.status(404).json({message: 'Jogo not found'})
            }
            else {
                res.json(jogo);
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

const getCategoryId = (category) => category.trim().toLowerCase().replace(/\s+/g, '-');

const getGameRef = (jogo) => ({
    _id: jogo._id,
    name: jogo.name
});

const atualizarAutores = async (previousAutores, nextAutores, jogoRef) => {
    const previousIds = new Set(previousAutores.map(autor => autor._id));
    const nextIds = new Set(nextAutores.map(autor => autor._id));
    for (const autor of nextAutores) {
        await Autor.findByIdAndUpdate( autor._id, { $set: { name: autor.name }, $addToSet: { jogos: jogoRef }}, { upsert: true, new: true });}

    for (const autorId of previousIds) {
        if (!nextIds.has(autorId)) { await Autor.findByIdAndUpdate(autorId, {$pull: { jogos: { _id: jogoRef._id } }});}
    }

    await Autor.updateMany({ 'jogos._id': jogoRef._id }, { $set: { 'jogos.$[jogo].name': jogoRef.name } }, { arrayFilters: [{ 'jogo._id': jogoRef._id }] }
    );
};

const atualizarCategorias = async (previousCategory, nextCategory, jogoRef) => {
    const prev_cat_id = previousCategory ? getCategoryId(previousCategory) : null;
    const nextCategoryId = nextCategory ? getCategoryId(nextCategory) : null;

    if (nextCategoryId) {
        await Categoria.findByIdAndUpdate(nextCategoryId, {$set: { name: nextCategory },$addToSet: { jogos: jogoRef }},{ upsert: true, new: true });
    }

    if (prev_cat_id && prev_cat_id !== nextCategoryId) {
        await Categoria.findByIdAndUpdate(prev_cat_id, {$pull: { jogos: { _id: jogoRef._id } }});
    }

    await Categoria.updateMany(
        { 'jogos._id': jogoRef._id },
        { $set: { 'jogos.$[jogo].name': jogoRef.name } },
        { arrayFilters: [{ 'jogo._id': jogoRef._id }] }
    );
};

module.exports = jogoController;