const express = require('express');
const router = express.Router()
const Thesaurus = require('./../models/thesaurus');

router.get('/search', (req, res) => {
    var id = req.query.id;
    var value = req.query.value;
    var q = Thesaurus.find({ 'arc': id, 'value': { $regex: new RegExp('^' + value) } }).limit(10);
    q.exec((err, values) => {
        res.send(values);
    });
})

router.get('/validate', (req, res) => {
    var id = req.query.id;
    var value = req.query.value;
    var q = Thesaurus.find({ 'arc': id, 'value': value }).limit(1);
    q.exec((err, values) => {
        const exist = values.length ? true : false;
        res.send({ exist });
    });
})

module.exports = router


