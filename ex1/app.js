const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

const nomeBD = "jogostabuleiro";
const PORT = process.env.PORT || 17000;
const mongoHost = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${nomeBD}`;

const autorRouter = require('./routers/autorRouter');
const categoriaRouter = require('./routers/categoriaRouter');
const jogoRouter = require('./routers/jogoRouter');

app.use(express.json());


mongoose.connect(mongoHost)
    .then(() => console.log(`MongoDB: liguei-me à base de dados ${nomeBD}.`))
    .catch(err => console.error('Erro:', err));

app.use(cors());

const router = express.Router();
router.use('/', autorRouter);
router.use('/', categoriaRouter);
router.use('/', jogoRouter);

app.use('/', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




app.listen(PORT, function() {
    console.log('Servidor à escuta na porta ' + PORT);
})