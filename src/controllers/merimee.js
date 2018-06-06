const express = require('express');
const router = express.Router()
const Merimee = require('../models/merimee');


router.post('/update', (req, res) => {
    var ref = req.query.ref;
    Merimee.findOneAndUpdate({ REF: ref }, req.body, { upsert: true }).then((e) => {
        console.log(`${ref} updated with `, req.body)
        res.sendStatus(200)
    });
})

router.post('/create', (req, res) => {

    console.log('Received :', req.body)
    console.log('Received :', JSON.stringify(req.body))
    Merimee.create(req.body).then((e) => {
        console.log(`Notice created `)
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



