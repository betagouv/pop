var fs = require('fs');
var csvparse = require('csv-parse');
var transform = require('stream-transform');

var parser = csvparse({ delimiter: '|', from: 1, quote: '' })
var input = fs.createReadStream('./data/test.csv','latin1');
var transformer = transform(function(record, callback){
    callback(null, record.join(' ') + '\n');
}, {parallel: 1});
input.pipe(parser).pipe(transformer).pipe(process.stdout);


