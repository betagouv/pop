const express = require('express');
const router = express.Router()

const Models = require('./models');

// define the about route
router.get('/', (req, res) => {
    Models.merimeeMH.find({}).limit(20).exec((err, entities) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(JSON.stringify(entities));
        }
    });
})

router.get('/search', (req, res) => {
    var a = req.query.query;
    Models.merimeeMH.find({ $text: { $search: a } })
        .limit(10).exec((err, entities) => {
            if (err) {
                console.log('ERR', err)
            } else {
                console.log(entities.length + 'found for query ' + a)
                res.send(JSON.stringify(entities));
            }
        });
})


module.exports = router



