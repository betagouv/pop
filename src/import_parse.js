var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var transform = require('stream-transform');
var csvparse = require('csv-parse');

function parse(file, opt, cb) {
    let arr = [];
    let header = null;
    var parser = csvparse({ delimiter: '|', from: 1, quote: '' })//, relax_column_count: true
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
    const stream = input.pipe(parser).pipe(transformer);

    stream.on('finish', () => {
        cb(arr, null);
    });

}


function run(file, object) {
    let count = 0;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Collection star droping');
            object.collection.drop();
            console.log('Collection droppped');


            console.log('RUN  ', file)
            parse(file, { batch: 1000 }, (arr, next) => {
                const objects = arr.map((e) => {
                    const m = new object(e);
                    m._id = e.REF;
                    return m;
                })
                object.collection.insert(objects, (err, docs) => {
                    if (err) {
                    } else {
                        count += docs.insertedCount;
                        console.log('Saved ' + count)
                    }

                    if (!next) {
                        resolve();
                    } else {
                        next();
                    }
                });
            })
        }, 5000)
    })
}


module.exports = run;
