const express = require('express');
const router = express.Router()

const Models = require('./models');

// define the about route
router.get('/', (req, res) => {
    Models.merimee.find({}).limit(20).exec((err, entities) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(entities);
        }
    });
})

router.get('/search', (req, res) => {
    var value = req.query.value;
    var collection = req.query.collection;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    const query = Models.get(collection).find({ $text: { $search: value } });
    Models.get(collection).paginate(query, { offset: offset, limit: limit }).then((result) => {
        res.send(result)
    });


    // Model.paginate({}, { offset: 20, limit: 10 }).then(function (result) {
    //     // ...
    // });

    // if (!value) {
    //     Models.get(collection).find({}).limit(20).exec((err, entities) => {
    //         if (err) {
    //             console.log('ERR', err)
    //         } else {
    //             res.send(entities);
    //         }
    //     });
    // } else {
    //     const query = Models.get(collection).find({ $text: { $search: value } });

    //     const arr = [];
    //     arr.push(query.count())
    //     arr.push(query.limit(50))

    //     Promise.all(arr).then((values) => {
    //         console.log('values', values)
    //         res.send({
    //             count: values[0],
    //             entities: values[1]
    //         });
    //     })
    // }
});





/*router.get('/search', (req, res) => {
    var a = req.query.query;
    Models.merimeeMH.find({ $text: { $search: a } }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } })
        .limit(50).exec((err, entities) => {
            if (err) {
                console.log('ERR', err)
            } else {
                console.log(entities.length + 'found for query ' + a)
                res.send(entities);
            }
        });
})*/


// TICO_text_PPRO_text_AUTP_text


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



