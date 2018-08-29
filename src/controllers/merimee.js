const express = require('express');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router()
const Merimee = require('../models/merimee');
const Memoire = require('../models/memoire');
const { uploadFile, formattedNow } = require('./utils')

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
    notice.DMAJ = formattedNow();
    checkIfMemoireImageExist(notice).then(arr => {
        notice.MEMOIRE = arr;
        Merimee.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true }).then(() => {
            res.sendStatus(200)
        }).catch((e) => {
            res.sendStatus(500)
        })
    })
});


router.post('/', upload.any(), (req, res) => {
    const notice = JSON.parse(req.body.notice);
    notice.DMIS = notice.DMAJ = formattedNow();
    checkIfMemoireImageExist(notice).then(arr => {
        notice.MEMOIRE = arr;
        const obj = new Merimee(notice);
        obj.save((error) => {
            if (error) return res.status(500).send({ error });
            obj.on('es-indexed', (err, result) => {
                if (err) return res.status(500).send({ error: err });
                res.status(200).send({ success: true, msg: "DOC is indexed" })
            });
        });
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


router.delete('/:ref', (req, res) => {
    const ref = req.params.ref;
    Merimee.findOneAndRemove({ REF: ref }, (error) => {
        if (error) return res.status(500).send({ error });
        return res.status(200).send({});
    });
})


module.exports = router


