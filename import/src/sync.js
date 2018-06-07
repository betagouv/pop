var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var transform = require('stream-transform');
var csvparse = require('csv-parse');
var batch = require('through-batch');

module.exports = function syncWithMongoDb(file, object, clean) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let header = null;
        let count = 0;
        var parser = csvparse({ delimiter: '|', from: 1, quote: '', relax_column_count: true })//, 
        var input = fs.createReadStream(file, 'latin1');

        var toObject = transform((record, done) => {
            let obj = null;
            if (!header) {
                header = record;
            } else {
                obj = {};
                for (var i = 0; i < record.length; i++) {
                    obj[header[i]] = record[i];
                }
            }
            done(null, obj);
        }, { parallel: 1 });


        var toClean = transform((obj, done) => {
            const newObj = clean(obj)
            done(null, newObj);
        }, { parallel: 1 });


        var mongo = transform((arr, done) => {
            const objects = arr.map((e) => {
                const m = new object(e);
                return m;
            })
            input.pause();
            object.insertMany(objects, (err, docs) => {
                if (err) {
                    console.log('Error indexing : ', err)
                }
                count += objects.length;
                console.log(`Saved ${count}`)
                input.resume();
                done();
            });
        }, { parallel: 1 });

        const stream = input
            .pipe(parser)
            .pipe(toObject)
            .pipe(toClean)
            .pipe(batch(1000))
            .pipe(mongo)
            .on('finish', () => {
                console.log('Stream finish');
                resolve();
            })
            .on('error', (err) => {
                console.log('Error', err)
            });
    });
}