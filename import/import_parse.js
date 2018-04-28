var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var transform = require('stream-transform');
var csvparse = require('csv-parse');

function parse(file, cb) {
    let arr = [];
    let header = null;
    var parser = csvparse({ delimiter: '|', from: 1, quote: '', relax_column_count: true })//, 
    var input = fs.createReadStream(file, 'latin1');

    var toObject = transform((record, next) => {
        let obj = null;
        if (!header) {
            header = record;
        } else {
            obj = {};
            for (var i = 0; i < record.length; i++) {
                obj[header[i]] = record[i];
            }
        }
        next(null, obj);
    }, { parallel: 1 });

    var batcher = transform((record, next) => {
        if (record) {
            arr.push(record)
        }
        if (arr.length >= 1000) {
            cb(arr, next);
            arr = [];
        } else {
            next()
        }
    }, { parallel: 1 });


    var transformer = transform((obj, callback) => {
        if (obj.IMG) {
            obj.IMG = obj.IMG.replace('@{img1;//', 'http://').replace(';ico1}@', '');
        }
        callback(null, obj);
    }, { parallel: 1 });


    const stream = input
        .pipe(parser)
        .pipe(toObject)
        .pipe(transformer)
        .pipe(batcher);

    stream.on('finish', () => {
        cb(arr, null);
    });

}


function run(file, object) {
    let count = 0;
    return new Promise((resolve, reject) => {
        console.log('Collection star droping');
        object.collection.drop();
        console.log('Collection droppped');

        console.log('RUN  ', file)
        parse(file, (arr, next) => {
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
    })
}



function showInconsistentLines(file) {

    return new Promise((resolve, reject) => {
        let linesCount = null;
        let counter = 1;
        let linesWithIssues = []

        const input = require('fs').createReadStream(file, 'latin1');

        var lineReader = require('readline').createInterface({ input });

        lineReader.on('line', (line) => {
            if (linesCount === null) {
                linesCount = (line.match(/\|/g) || []).length
            }
            if ((line.match(/\|/g) || []).length !== linesCount) {
                console.log(`Issue on line ${counter} `)
            }
            counter++;
        });

        input.on('end', () => {
            resolve();
        })
    })

}



// showInconsistentLines('./data/joconde-MUSEES-valid.csv')

module.exports = run;
