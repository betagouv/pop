const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Palissy = require('../models/palissy');
const { uploadFile, formattedNow } = require('./utils');

function checkIfMemoireImageExist(notice) {
    return new Promise(async (resolve, reject) => {
        const NoticesMemoire = await Memoire.find({ LBASE: notice.REF });
        const arr = NoticesMemoire.map(e => { return { ref: e.REF, url: e.IMG } });
        resolve(arr);
    })
}

router.put('/:ref', upload.any(), (req, res) => {
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);

    checkIfMemoireImageExist(notice).then(arr => {
        notice.MEMOIRE = arr;
        notice.DMAJ = formattedNow(); //UPDATE MAJ DATE ( couldnt use hook ...)
        Palissy.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true }).then(() => {
            res.sendStatus(200)
        }).catch((e) => {
            res.sendStatus(500)
        })
    });
})

router.post('/', upload.any(), (req, res) => {
    const notice = JSON.parse(req.body.notice);
    checkIfMemoireImageExist(notice).then(arr => {
        notice.MEMOIRE = arr;
        notice.DMIS = notice.DMAJ = formattedNow()
        const obj = new Palissy(notice);
        obj.save().then((e) => {
            res.send({ success: true, msg: "OK" })
        });
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

router.delete('/:ref', (req, res) => {
    const ref = req.params.ref;
    Palissy.findOneAndRemove({ REF: ref }, (error) => {
        if (error) return res.status(500).send({ error });
        return res.status(200).send({});
    });
})


module.exports = router







