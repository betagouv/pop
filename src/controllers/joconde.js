const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Joconde = require('../models/joconde');

const { uploadFile } = require('./utils');

router.post('/update', upload.any(), (req, res) => {
    var ref = req.query.ref;
    const notice = JSON.parse(req.body.notice);
    Joconde.findOneAndUpdate({ REF: ref }, notice, { upsert: true })
        .then((e) => {
            res.sendStatus(200)
        }).catch((e) => {
            console.log(e)
            res.sendStatus(500);
        })
})

router.post('/create', upload.any(), (req, res) => {

    const files = req.files || [];
    const notice = JSON.parse(req.body.notice);

    const arr = [];
    for (var i = 0; i < req.files.length; i++) {
        arr.push(uploadFile(`joconde/${notice.REF}/${req.files[i].originalname}`, req.files[i]))
    }
    // console.log('NOTICE', notice);
    arr.push(Joconde.create(notice))

    Promise.all(arr)
        .then(() => {
            res.sendStatus(200)
        })
        .catch((e) => {
            console.log(e)
            res.sendStatus(500)
        })
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



