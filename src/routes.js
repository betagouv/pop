const express = require('express');
const router = express.Router()

const Models = require('./models');

// define the about route
router.get('/', (req, res) => {
    Models.merimeeMH.find({}).limit(20).exec((err, entities) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(entities);
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
                res.send(entities);
            }
        });
})


router.get('/notice', (req, res) => {
    var id = req.query.id;
    Models.merimeeMH.findById(id, (err, notice) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(JSON.stringify(notice));
        }
    });
})


module.exports = router



