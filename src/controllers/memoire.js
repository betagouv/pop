const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Memoire = require('../models/memoire');
const Merimee = require('../models/merimee');
const Palissy = require('../models/palissy');
const { uploadFile, formattedNow } = require('./utils')

function findCollection(ref) {
  const prefix = ref.substring(0, 2);
  switch (prefix) {
    case 'EA':
    case 'PA':
    case 'IA':
      return Merimee;
    case 'IM':
    case 'PM':
      return Palissy;
    default:
      return "";
  }
}

function updateMerimeeOrPalissyNotice(memoire) {
  return new Promise(async (resolve, reject) => {
    console.log(memoire)
    const collection = findCollection(memoire.LBASE);

    if (!memoire.LBASE) {
      console.log(`No link LBASE ${memoire.REF}`)
      resolve({ success: false, msg: `No link LBASE ${memoire.LBASE}` });
      return;
    }

    if (!collection) {
      console.log(`No collection ${memoire.LBASE}`)
      resolve({ success: false, msg: `No collection ${memoire.LBASE}` });
      return;
    }
    const notice = await collection.findOne({ REF: memoire.LBASE });

    if (!notice) {
      console.log(`No notice ${memoire.LBASE}`)
      resolve({ success: false, msg: `No notice ${memoire.LBASE}` });
      return;
    }

    let isInArray = notice.MEMOIRE.some(function (doc) {
      return doc.equals(about.id);
    });

    console.log("notice.MEMOIRE", notice.MEMOIRE)
    resolve();

  })
}


router.put('/:ref', upload.any(), (req, res) => {
  const ref = req.params.ref
  const notice = JSON.parse(req.body.notice)

  notice.DMAJ = formattedNow()

  const arr = []
  for (let i = 0; i < req.files.length; i++) {
    arr.push(uploadFile(`memoire/${notice.REF}/${req.files[i].originalname}`, req.files[i]))
  }
  arr.push(Memoire.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true }));


  arr.push(updateMerimeeOrPalissyNotice(notice));



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
  console.log('uploadFILE', req.files)
  const arr = []
  for (var i = 0; i < req.files.length; i++) {

    arr.push(uploadFile(`memoire/${notice.REF}/${req.files[i].originalname}`, req.files[i]))
  }


  arr.push(updateMerimeeOrPalissyNotice(notice));

  const obj = new Memoire(notice);
  arr.push(obj.save())
  Promise.all(arr).then(() => {
    res.send({ success: true, msg: "OK" })
  }).catch((e) => {
    console.log(e)
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
