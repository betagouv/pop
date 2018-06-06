const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const Mongo = require('./mongo');

const { PORT } = require('./config.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/merimee', require('./controllers/merimee'))
app.use('/thesaurus', require('./controllers/thesaurus'))

app.listen(PORT, () => console.log('Listening on port ' + PORT))