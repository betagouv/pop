const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const Models = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/list', (req, res) => {
    console.log('GIT IT')
    Models.Merimee.find({}).limit(20).exec((err, entities) => {
        var entityMap = {};
        console.log('GIT entities ', entities.length)
        entities.forEach((entity) => {
            entityMap[entity.REF] = entity;
        });
        res.send(entityMap);
    });
});

app.listen(3000, () => console.log('Listening on port 3000!'))

