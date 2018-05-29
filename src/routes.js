const express = require('express');
const router = express.Router()
const Models = require('./models');

router.post('/update', (req, res) => {
    var id = req.query.id;
    var collection = req.query.collection;
    Models.get(collection).findOneAndUpdate({ _id: id }, req.body, { upsert: true }).then((e) => {
        console.log(`${id} updated`)
        res.sendStatus(200)
    });
})

router.get('/notice', (req, res) => {
    var ref = req.query.ref;
    console.log('Look for ref ', ref)
    Models.merimee.findOne({ REF: ref }, (err, notice) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(notice);
        }
    });
})

module.exports = router



