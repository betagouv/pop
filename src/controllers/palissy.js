const express = require('express')
const router = express.Router()
const Palissy = require('../models/palissy')


router.put('/:ref', (req, res) => {
    const ref = req.params.ref;
    Palissy.findOneAndUpdate({ REF: ref }, req.body, { upsert: true }).then((e) => {
        res.sendStatus(200)
    });
})

router.post('/', (req, res) => {
    Palissy.create(req.body).then((e) => {
        res.sendStatus(200)
    });
})

router.get('/:ref', (req, res) => {
    const ref = req.params.ref;
    Palissy.findOne({ REF: ref }, (err, notice) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (notice) {
            res.status(200).send(notice);
        } else {
            res.sendStatus(404);
        }
    });
})

module.exports = router
