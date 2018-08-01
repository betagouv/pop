const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Palissy = require('../models/palissy');
const { uploadFile } = require('./utils');



router.put('/:ref', upload.any(), (req, res) => {
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);

    //UPDATE MAJ DATE ( couldnt use hook ...)

    const now = new Date();
    const formattedNow = ("0" + now.getDate()).slice(-2) + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear();
    notice.DMAJ = formattedNow;

    const arr = [];
    // for (var i = 0; i < req.files.length; i++) {
    //     arr.push(uploadFile(`mnr/${notice.REF}/${req.files[i].originalname}`, req.files[i]))
    // }
    arr.push(Palissy.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true }))

    Promise.all(arr).then(() => {
        res.sendStatus(200)
    }).catch((e) => {
        res.sendStatus(500)
    })
})

router.post('/', upload.any(), (req, res) => {
    const notice = JSON.parse(req.body.notice);
    Palissy.create(notice).then((e) => {
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







