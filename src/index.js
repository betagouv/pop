const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const request = require('request');
const Mongo = require('./mongo');

const { PORT } = require('./config.js');

const app = express();

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/merimee', require('./controllers/merimee'))
app.use('/joconde', require('./controllers/joconde'))
app.use('/mnr', require('./controllers/mnr'))
app.use('/palissy', require('./controllers/palissy'))
app.use('/thesaurus', require('./controllers/thesaurus'))

app.listen(PORT, () => console.log('Listening on port ' + PORT))