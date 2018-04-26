var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var transform = require('stream-transform');
var csvparse = require('csv-parse');

function parse(file, opt, cb) {

    let arr = [];
    let header = null;

    var parser = csvparse({ delimiter: '|', from: 1, quote: '' })
    var input = fs.createReadStream(file);
    var transformer = transform((record, callback) => {
        if (!header) {
            header = record;
        } else {
            const obj = {};
            for (var i = 0; i < record.length; i++) {
                obj[header[i]] = record[i];
            }
            arr.push(obj)
        }

        if (arr.length >= opt.batch) {
            cb(arr, callback);
            arr = [];
        } else {
            callback()
        }
    }, { parallel: 1 });

    input.pipe(parser).pipe(transformer);
}

module.exports = parse;
