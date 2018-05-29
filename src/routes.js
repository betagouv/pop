const express = require('express');
const router = express.Router()

const Models = require('./models');

const Thesaurus = require('./thesaurus')

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


router.get('/thesaurus', (req, res) => {
    var thesaurusId = req.query.thesaurusId;
    var query = req.query.query;
    Thesaurus.getTermsBeginWithSomeStringByThesaurus(query, thesaurusId).then((e) => {
        res.send(e);
    })
});



module.exports = router



