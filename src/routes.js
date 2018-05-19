const express = require('express');
const router = express.Router()

const Models = require('./models');

// define the about route

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


router.get('/search', (req, res) => {
    var value = req.query.value;
    var collection = req.query.collection;
    var deno = req.query.deno;
    var limit = parseInt(req.query.limit) || 30;
    var offset = parseInt(req.query.offset) || 0;

    let query = {};
    if (value) {
        query.$text = { $search: value };
    }
    if (deno) {
        query.DENO = { "$in": [deno] };
    }

    console.log('QUZERY ', query)

    Models.get(collection).paginate(Models.get(collection).find(query), { offset: offset, limit: limit }).then((result) => {
        res.send(result)
    });
});



module.exports = router



