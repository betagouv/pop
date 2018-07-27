const express = require('express')
const router = express.Router()
const Merimee = require('../models/merimee')


router.put('/:ref', (req, res) => {
    const ref = req.params.ref;
    Merimee.findOneAndUpdate({ REF: ref }, req.body, { upsert: true }).then((e) => {
        res.sendStatus(200)
    });
})

router.post('/', (req, res) => {
    Merimee.create(req.body).then((e) => {
        res.sendStatus(200)
    });
})

router.get('/:ref', (req, res) => {
    const ref = req.params.ref;
    Merimee.findOne({ REF: ref }, (err, notice) => {
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
