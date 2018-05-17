var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var transform = require('stream-transform');
var csvparse = require('csv-parse');
var batch = require('through-batch');

const utils = require('./utils')


function run(file, object) {
    return new Promise(async (resolve, reject) => {
        console.log('RUN  ', file)

        console.log('Start file integrity check');
        await (showInconsistentLines(file))
        console.log('End file integrity check');


        console.log('Start syncWithMongoDb');
        await (syncWithMongoDb(file, object))
        console.log('End syncWithMongoDb');


        resolve();
    })
}


function MerimeeClean(obj) {
    obj.IMG = utils.extractIMG(obj.IMG);
    obj.CONTACT = utils.extractEmail(obj.CONTACT);
    obj.DENO = utils.extractArray(obj.DENO, ';');
    obj.TECH = utils.extractArray(obj.TECH, ';');
    obj.STAT = utils.extractArray(obj.STAT, ';');
    obj.SCLE = utils.extractArray(obj.SCLE, ';');
    obj.SCLX = utils.extractArray(obj.SCLX, ';');
    obj.AUTR = utils.extractArray(obj.AUTR, '/,|£/');
    obj.PARN = utils.extractArray(obj.PARN, ';');
    obj.REPR = utils.extractArray(obj.REPR, ';');
    obj.COUV = utils.extractArray(obj.COUV, ';');
    obj.MURS = utils.extractArray(obj.MURS, ';');
    obj.ESCA = utils.extractArray(obj.ESCA, ';');
    obj.PREP = utils.extractArray(obj.PREP, ';');
    obj.TOIT = utils.extractArray(obj.TOIT, ';');
    obj.LOCA = utils.extractArray(obj.LOCA, ';');
    return obj;
}

function syncWithMongoDb(file, object) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let header = null;
        let count = 0;
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


        var transformer = transform((obj, callback) => {
            const newObj = MerimeeClean(obj)
            callback(null, newObj);
        }, { parallel: 1 });

        var mongo = transform((arr, callback) => {
            const objects = arr.map((e) => {
                const m = new object(e);
                m._id = e.REF;
                return m;
            })
            object.insertMany(objects, (err, docs) => {
                if (err) {
                    console.log('Error indexing : ', err)
                }
                count += objects.length;
                console.log(`Saved ${count}`)
                callback();
            });

        }, { parallel: 1 });


        const stream = input
            .pipe(parser)
            .pipe(toObject)
            .pipe(transformer)
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


// function parse(file, cb) {
//     let arr = [];
//     let header = null;
//     var parser = csvparse({ delimiter: '|', from: 1, quote: '', relax_column_count: true })//, 
//     var input = fs.createReadStream(file, 'latin1');

//     var toObject = transform((record, next) => {
//         let obj = null;
//         if (!header) {
//             header = record;
//         } else {
//             obj = {};
//             for (var i = 0; i < record.length; i++) {
//                 obj[header[i]] = record[i];
//             }
//         }
//         next(null, obj);
//     }, { parallel: 1 });




//     var batcher = transform((record, next) => {
//         if (record) {
//             arr.push(record)
//         }
//         if (arr.length >= 1000) {
//             cb(arr, next);
//             arr = [];
//         } else {
//             next()
//         }
//     }, { parallel: 1 });


//     var transformer = transform((obj, callback) => {
//         if (obj.IMG) {
//             obj.IMG = utils.extractIMG(obj.IMG);
//         }

//         if (obj.CONTACT) {
//             obj.CONTACT = utils.extractEmail(obj.CONTACT);
//         }

//         obj.DENO = obj.DENO.split(';');
//         obj.DENO = obj.DENO.map((e) => e.trim())

//         obj.TECH = obj.TECH.split(';');
//         obj.TECH = obj.TECH.map((e) => e.trim())

//         obj.STAT = obj.STAT.split(';');
//         obj.STAT = obj.STAT.map((e) => e.trim())

//         obj.SCLE = obj.SCLE.split(';');
//         obj.SCLE = obj.SCLE.map((e) => e.trim())

//         obj.SCLX = obj.SCLX.split(';')
//         obj.SCLX = obj.SCLX.map((e) => e.trim())

//         obj.AUTR = obj.AUTR.split(';');
//         obj.AUTR = obj.AUTR.map((e) => e.trim())

//         obj.LOCA = obj.LOCA.split(';');
//         obj.LOCA = obj.LOCA.map((e) => e.trim())

//         callback(null, obj);
//     }, { parallel: 1 });


//     const stream = input
//         .pipe(parser)
//         .pipe(toObject)
//         .pipe(transformer)
//         .pipe(batcher);

//     stream.on('finish', () => {
//         cb(arr, null);
//     });
// }


function log(file, counter, message, content) {
    const str = `${file},${counter},${message},"${content.replace(',', '\,').replace('"', '')}"\n`
    fs.appendFile('errors.csv', str, (err) => {
        console.log('Error saved')
    });
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
                log(file, counter, `Line should have ${linesCount} collumn and has ${(line.match(/\|/g) || []).length}`, `${line}`);
            }
            counter++;
        });

        input.on('end', () => {
            resolve();
        })
    })
}


module.exports = run;
