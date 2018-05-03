const express = require('express');
const router = express.Router()

const Models = require('./models');

// define the about route
router.get('/', (req, res) => {
    Models.merimeeMH.find({}).limit(20).exec((err, entities) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(entities);
        }
    });
})

router.get('/search', (req, res) => {
    var query = req.query.query;
    var collection = req.query.collection;
    if (!query) {
        Models.get(collection).find({}).limit(20).exec((err, entities) => {
            if (err) {
                console.log('ERR', err)
            } else {
                res.send(entities);
            }
        });
    } else {
        Models.get(collection).find({ $text: { $search: query } })
            .limit(50).exec((err, entities) => {
                if (err) {
                    console.log('ERR', err)
                } else {
                    res.send(entities);
                }
            });
    }
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
    Models.merimeeMH.findOne({ REF: ref }, (err, notice) => {
        if (err) {
            console.log('ERR', err)
        } else {
            res.send(notice);
        }
    });
})


module.exports = router



