const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const request = require('request');

const Models = require('./models');
const Mongo = require('./mongo');

const { PORT } = require('./config.js');

const app = express();
const router = express.Router();

const routes = require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());


app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api', routes)

//Thesaurus Proxy
app.use('/thesaurus/', (req, res) => {
    console.log(req)
    req.pipe(request("https://ginco.culture.fr/ginco-webservices/services/" + req.url)).pipe(res);
});

app.listen(PORT, () => console.log('Listening on port ' + PORT))