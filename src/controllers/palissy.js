const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Memoire = require('../models/memoire');
const Merimee = require('../models/merimee');
const Palissy = require('../models/palissy');
const { uploadFile, formattedNow } = require('./utils');

function checkIfMemoireImageExist(notice) {
    return new Promise(async (resolve, reject) => {
        const obj = await Memoire.find({ LBASE: notice.REF });
        if (obj) {
            const arr = obj.map(e => { return { ref: e.REF, url: e.IMG } });
            resolve(arr);
            return;
        }
        resolve([]);
    })
}

function populateMerimeeREFO(notice) {
    return new Promise(async (resolve, reject) => {
        const obj = await Merimee.findOne({ REF: notice.REFA });
        if (obj) {
            await obj.update({ $push: { REFO: notice.REF } });
        }
        resolve();
    })
}

router.put('/:ref', upload.any(), async (req, res) => {
    try {
        const ref = req.params.ref;
        const notice = JSON.parse(req.body.notice);
        const arr = await checkIfMemoireImageExist(notice)

        notice.MEMOIRE = arr;
        notice.DMAJ = formattedNow(); //UPDATE MAJ DATE ( couldnt use hook ...)

        await Palissy.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true })
        await populateMerimeeREFO(notice);

        res.status(200).send({ success: true, msg: "OK" })
    } catch (e) {
        res.status(500).send({ success: false, msg: JSON.stringify(e) })
    }
})

router.post('/', upload.any(), async (req, res) => {
    try {
        const notice = JSON.parse(req.body.notice);
        const arr = await checkIfMemoireImageExist(notice);
        await populateMerimeeREFO(notice);
        notice.MEMOIRE = arr;
        notice.DMIS = notice.DMAJ = formattedNow()
        const obj = new Palissy(notice);
        await obj.save();
        res.status(200).send({ success: true, msg: "OK" })
    } catch (e) {
        res.status(500).send({ success: false, msg: JSON.stringify(e) })
    }
})


router.get('/:ref', (req, res) => {
    const ref = req.params.ref;
    Palissy.findOne({ REF: ref }, (err, notice) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (!notice) {
            return res.sendStatus(404);
        }
        
        res.status(200).send(notice);
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







