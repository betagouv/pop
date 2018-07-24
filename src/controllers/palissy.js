const express = require('express')
const router = express.Router()
const Palissy = require('../models/palissy')

router.post('/update', (req, res) => {
  var ref = req.query.ref
  Palissy.findOneAndUpdate({ REF: ref }, req.body, { upsert: true }).then((e) => {
    res.sendStatus(200)
  })
})

router.post('/create', (req, res) => {
  Palissy.create(req.body).then((e) => {
    res.sendStatus(200)
  })
})

router.get('/', (req, res) => {
  var ref = req.query.ref
  console.log('GET PALISSY ', ref)
  Palissy.findOne({ REF: ref }, (err, notice) => {
    if (err) {
      console.log('ERR', err)
    } else {
      res.send(notice)
    }
  })
})

module.exports = router
