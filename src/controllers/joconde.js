const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Joconde = require('../models/joconde')

const { uploadFile, deleteFile } = require('./utils')

router.put('/:ref', upload.any(), async (req, res) => {
  const ref = req.params.ref
  const notice = JSON.parse(req.body.notice)

  // UPDATE MAJ DATE ( couldnt use hook ...)
  const now = new Date()
  const formattedNow = ('0' + now.getDate()).slice(-2) + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear()
  notice.DMAJ = formattedNow

  try {
    const prevNotice = await Joconde.findOne({ REF: ref })
    await Promise.all([
      ...(prevNotice.IMG || []).filter(x => !(notice.IMG || []).includes(x)).map(f => deleteFile(f)),
      ...req.files.map(f => uploadFile(`joconde/${notice.REF}/${f.originalname}`, f)),
      Joconde.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true })
    ])
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

router.post('/', upload.any(), (req, res) => {
  const notice = JSON.parse(req.body.notice)

  // UPDATE MAJ and MIS DATE ( couldnt use hook ...)
  const now = new Date()
  const formattedNow = ('0' + now.getDate()).slice(-2) + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + now.getFullYear()
  notice.DMIS = formattedNow
  notice.DMAJ = formattedNow

  const arr = []
  for (var i = 0; i < req.files.length; i++) {
    arr.push(uploadFile(`joconde/${notice.REF}/${req.files[i].originalname}`, req.files[i]))
  }
  arr.push(Joconde.create(notice))
  Promise.all(arr).then(() => {
    res.sendStatus(200)
  }).catch((e) => {
    res.sendStatus(500)
  })
})

router.get('/:ref', (req, res) => {
  const ref = req.params.ref
  Joconde.findOne({ REF: ref }, (err, notice) => {
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

module.exports = router
