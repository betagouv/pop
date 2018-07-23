const express = require('express');
const router = express.Router()
const Merimee = require('../models/merimee');


router.post('/:ref', (req, res) => {
    var ref = req.query.ref;
    Merimee.findOneAndUpdate({ REF: ref }, req.body, { upsert: true }).then((e) => {
        res.sendStatus(200)
    });
})

router.post('/create', (req, res) => {
    Merimee.create(req.body).then((e) => {
        res.sendStatus(200)
    });
})

router.get('/', (req, res) => {
    var ref = req.query.ref;
    Merimee.findOne({ REF: ref }, (err, notice) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(notice);
        }
    });
})

module.exports = router



