const express = require('express');
const router = express.Router()
const Thesaurus = require('./../models/thesaurus');

router.get('/', (req, res) => {
    var id = req.query.id;
    var search = req.query.search;
    var q = Thesaurus.find({ 'arc': id, 'value': { $regex: new RegExp('^' + search) } }).limit(10);
    q.exec((err, values) => {
        res.send(values);
    });
})

module.exports = router


