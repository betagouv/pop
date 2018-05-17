const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const Models = require('./models');
const Mongo = require('./mongo');

const app = express();
const router = express.Router();

const routes = require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8081;

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api', routes)

app.listen(PORT, () => console.log('Listening on port ' + PORT))