const express = require('express');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router()
const Merimee = require('../models/merimee');
const { uploadFile, formattedNow } = require('./utils')


router.put('/:ref', upload.any(), (req, res) => {
    const ref = req.params.ref;
    const notice = JSON.parse(req.body.notice);

    //UPDATE MAJ DATE ( couldnt use hook ...)

    const now = new Date();
    notice.DMAJ = formattedNow();

    const arr = [];
    // for (var i = 0; i < req.files.length; i++) {
    //     arr.push(uploadFile(`mnr/${notice.REF}/${req.files[i].originalname}`, req.files[i]))
    // }
    arr.push(Merimee.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true }))

    Promise.all(arr).then(() => {
        res.sendStatus(200)
    }).catch((e) => {
        res.sendStatus(500)
    })
})

router.post('/', upload.any(), (req, res) => {
    const notice = JSON.parse(req.body.notice);

    notice.DMIS = notice.DMAJ = formattedNow()

    const obj = new Merimee(notice);
    obj.save((error) => {
        if (error) return res.status(500).send({ error });
        obj.on('es-indexed', (err, result) => {
            if (err) return res.status(500).send({ error: err });
            console.log("result", result)
            res.status(200).send({ success: true, msg: "DOC is indexed" })
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

            //ICI
            /*
                REFE: { type: [{ type: mongoose.Schema.ObjectId, ref: 'merimee' }], default: [] }, //ID merimee
                REFP: { type: [{ type: mongoose.Schema.ObjectId, ref: 'merimee' }], default: [] }, //ID merimee
                REFO: { type: [{ type: mongoose.Schema.ObjectId, ref: 'palissy' }], default: [] }, //ID palissy
                RENV: { type: [{ type: mongoose.Schema.ObjectId, ref: 'merimee' }], default: [] }, //ID merimee
            */
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


