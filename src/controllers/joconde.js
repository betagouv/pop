const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Joconde = require('../models/joconde');


router.post('/update', (req, res) => {
    var ref = req.query.ref;
    Joconde.findOneAndUpdate({ REF: ref }, req.body, { upsert: true }).then((e) => {
        res.sendStatus(200)
    });
})

router.post('/create', upload.array(), (req, res) => {
    console.log(req)
    // res.sendStatus(200)
    // Joconde.create(req.body).then((e) => {
    //     res.sendStatus(200)
    // });
})

router.get('/', (req, res) => {
    var ref = req.query.ref;
    Joconde.findOne({ REF: ref }, (err, notice) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(notice);
        }
    });
})

module.exports = router



