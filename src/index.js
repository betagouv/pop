const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser')
const Mongo = require('./mongo');
const Mailer = require('./mailer');

const { PORT } = require('./config.js');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

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

app.post('/mail', (req, res) => {
    const { subject, to, body } = req.body;
    if (!subject || !to || !body) {
        res.status(500).send('Information incomplete');
        return;
    }
    Mailer.send(subject, to, body).then((e) => { res.sendStatus(200); });
})

app.listen(PORT, () => console.log('Listening on port ' + PORT))