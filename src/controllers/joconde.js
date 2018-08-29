const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Joconde = require('../models/joconde')

const { uploadFile, deleteFile, formattedNow } = require('./utils')

router.put('/:ref', upload.any(), async (req, res) => {
  const ref = req.params.ref
  const notice = JSON.parse(req.body.notice)

  notice.DMAJ = formattedNow()

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

  notice.DMIS = notice.DMAJ = formattedNow()

  const arr = []
  for (var i = 0; i < req.files.length; i++) {
    arr.push(uploadFile(`joconde/${notice.REF}/${req.files[i].originalname}`, req.files[i]))
  }

  const obj = new Joconde(notice);
  arr.push(obj.save())
  Promise.all(arr).then(() => {
    res.send({ success: true, msg: "OK" })
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


router.delete('/:ref', (req, res) => {
  const ref = req.params.ref;
  Joconde.findOneAndRemove({ REF: ref }, (error) => {
    if (error) return res.status(500).send({ error });
    return res.status(200).send({});
  });
})

module.exports = router
