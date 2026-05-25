const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const cors = require('cors');


const nomeBD = "leitura";
const PORT = process.env.PORT || 19020;
const mongoHost = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${nomeBD}`;

const router = require('./routers/router');


app.use(express.json());


mongoose.connect(mongoHost)
    .then(() => console.log(`MongoDB: liguei-me à base de dados ${nomeBD}.`))
    .catch(err => console.error('Erro:', err));

app.use(cors());

app.use('/api/', router);



app.listen(PORT, function() {
    console.log('Servidor à escuta na porta ' + PORT);
})