const express = require('express');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Mnr = require('../models/mnr');

const { uploadFile } = require('./utils');

const router = express.Router();

router.post('/:ref', upload.any(), (req, res) => {
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);
    //UPDATE MAJ DATE ( couldnt use hook ...)
    const now = new Date();
    const formattedNow = ("0" + now.getDate()).slice(-2) + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear();
    notice.DMAJ = formattedNow;

    const arr = [];
    for (var i = 0; i < req.files.length; i++) {
        arr.push(uploadFile(`mnr/${notice.REF}/${req.files[i].originalname}`, req.files[i]))
    }
    arr.push(Mnr.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true }))

    Promise.all(arr).then(() => {
        res.sendStatus(200)
    }).catch((e) => {
        console.log(e)
        res.sendStatus(500)
    })
})

router.post('/create', (req, res) => {
    Mnr.create(req.body).then((e) => {
        res.sendStatus(200)
    });
})

router.get('/', (req, res) => {
    var ref = req.query.ref;
    Mnr.findOne({ REF: ref }, (err, notice) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(notice);
        }
    });
})

module.exports = router



