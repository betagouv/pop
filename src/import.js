
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var mongoose = require('mongoose');

var Mongo = require('./mongo');
var Parse = require('./parse');

const Models = require('./models')

let count = 0;

Parse('./data/merimee-MH-valid.csv', { batch: 1000 }, (arr, next) => {

  const objects = arr.map((e) => {
    const m = new Merimee(e);
    m._id = e.REF;
    return m;
  })
  Merimee.collection.insert(objects, (err, docs) => {
    if (err) {
    } else {
      count += docs.insertedCount;
      console.log('Saved ' + count)
    }
    next();
  });
})
