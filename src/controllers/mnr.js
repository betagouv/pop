const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Mnr = require('../models/mnr')

const { uploadFile, deleteFile, formattedNow } = require('./utils')


const router = express.Router()

router.put('/:ref', upload.any(), async (req, res) => {
  const ref = req.params.ref
  const notice = JSON.parse(req.body.notice)
  notice.DMAJ = formattedNow()

  try {
    const prevNotice = await Mnr.findOne({ REF: ref })
    await Promise.all([
      ...(prevNotice.VIDEO || []).filter(x => !(notice.VIDEO || []).includes(x)).map(f => deleteFile(f)),
      ...req.files.map(f => uploadFile(`mnr/${notice.REF}/${f.originalname}`, f)),
      Mnr.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true })
    ])
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

router.post('/', (req, res) => {
  Mnr.create(req.body).then((e) => {
    res.sendStatus(200)
  })
})

router.get('/:ref', (req, res) => {
    const ref = req.params.ref;
    Mnr.findOne({ REF: ref }, (err, notice) => {
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
