const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const Models = require('./models');
const Mongo = require('./mongo');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/list', (req, res) => {
    console.log('GIT IT')
    Models.Merimee.find({}).limit(20).exec((err, entities) => {
        console.log('ERRR', entities);
        console.log('GIT entities ', entities)
        res.send(JSON.stringify(entities));
    });
});

app.listen(3000, () => console.log('Listening on port 3000!'))