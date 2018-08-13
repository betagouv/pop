const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Mnr = require('../models/mnr')
const { uploadFile, formattedNow } = require('./utils')

const router = express.Router()

router.put('/:ref', upload.any(), (req, res) => {
    const ref = req.params.ref
    const notice = JSON.parse(req.body.notice)
    notice.DMAJ = formattedNow()

    const arr = []
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

router.post('/', upload.any(), (req, res) => {
    const notice = JSON.parse(req.body.notice);
    notice.DMIS = notice.DMAJ = formattedNow()
    Mnr.create(notice).then((e) => {
        res.sendStatus(200)
    });
})

router.get('/:ref', (req, res) => {
    const ref = req.params.ref;
    Mnr.findOne({ REF: ref }, (err, notice) => {
        if (err || !notice) {
            res.sendStatus(404)
        } else {
            console.log('FOUND', notice)
            res.send(notice);
        }
    });
})

router.delete('/:ref', (req, res) => {
    const ref = req.params.ref;
    Mnr.findOneAndRemove({ REF: ref }, (error) => {
        if (error) return res.status(500).send({ error });
        return res.status(200).send({});
    });
})

module.exports = router
