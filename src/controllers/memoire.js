const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Memoire = require('../models/memoire')
const { uploadFile, formattedNow } = require('./utils')

router.put('/:ref', upload.any(), (req, res) => {
  const ref = req.params.ref
  const notice = JSON.parse(req.body.notice)

  notice.DMAJ = formattedNow()

  const arr = []
  for (let i = 0; i < req.files.length; i++) {
    arr.push(uploadFile(`memoire/${notice.REF}/${req.files[i].originalname}`, req.files[i]))
  }
  arr.push(Memoire.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true }))

  Promise.all(arr).then(() => {
    res.sendStatus(200)
  }).catch((e) => {
    console.log(e)
    res.sendStatus(500)
  })
})

router.post('/', upload.any(), (req, res) => {
  const notice = JSON.parse(req.body.notice)

  notice.DMIS = notice.DMAJ = formattedNow()

  const arr = []
  for (var i = 0; i < req.files.length; i++) {
    arr.push(uploadFile(`memoire/${notice.REF}/${req.files[i].originalname}`, req.files[i]))
  }
  arr.push(Memoire.create(notice))
  Promise.all(arr).then(() => {
    res.sendStatus(200)
  }).catch((e) => {
    res.sendStatus(500)
  })
})

router.get('/:ref', (req, res) => {
  const ref = req.params.ref
  Memoire.findOne({ REF: ref }, (err, notice) => {
    if (err) {
      res.status(500).send(err)
      return
    }
    if (notice) {
      res.status(200).send(notice)
    } else {
      res.sendStatus(404)
    }
  })
})

router.delete('/:ref', (req, res) => {
  const ref = req.params.ref;
  Memoire.findOneAndRemove({ REF: ref }, (error) => {
    if (error) return res.status(500).send({ error });
    return res.status(200).send({});
  });
})

module.exports = router
