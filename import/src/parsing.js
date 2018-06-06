var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var transform = require('stream-transform');
var csvparse = require('csv-parse');
var batch = require('through-batch');

const utils = require('./utils')


function run(file, object, domaine) {
    return new Promise(async (resolve, reject) => {
        console.log('RUN  ', file)

        console.log('Start file integrity check');
        await (showInconsistentLines(file))
        console.log('End file integrity check');


        console.log('Start syncWithMongoDb');
        await (syncWithMongoDb(file, object, domaine))
        console.log('End syncWithMongoDb');

        resolve();
    })
}


function MerimeeClean(obj) {

    console.log('OBJ', obj)
    obj.IMG = utils.extractIMG(obj.IMG);
    obj.CONTACT = utils.extractEmail(obj.CONTACT, obj.REF);
    obj.DENO = utils.extractArray(obj.DENO, ';');
    obj.TYPO = utils.extractArray(obj.TYPO, ';');
    obj.TECH = utils.extractArray(obj.TECH, /[,;]/);
    obj.STAT = utils.extractArray(obj.STAT, ';');
    obj.SCLE = utils.extractArray(obj.SCLE, /[,;]/);
    obj.SCLX = utils.extractArray(obj.SCLX, /[,;]/);
    obj.SCLD = utils.extractArray(obj.SCLD, /[,;]/);
    obj.AUTR = utils.extractAuteurs(obj.AUTR, obj.REF);
    obj.AUTP = utils.extractArray(obj.AUTP, ';');
    obj.NOMS = utils.extractArray(obj.NOMS, ';');

    obj.PARN = utils.extractArray(obj.PARN, ';');
    obj.PART = utils.extractArray(obj.PART, ';');
    obj.MHPP = utils.extractArray(obj.MHPP, ';');

    obj.REPR = utils.extractArray(obj.REPR, ';');
    obj.COUV = utils.extractArray(obj.COUV, ';');
    obj.MURS = utils.extractArray(obj.MURS, /[,;]/);
    obj.ESCA = utils.extractArray(obj.ESCA, ';');
    obj.PREP = utils.extractArray(obj.PREP, ';');
    obj.TOIT = utils.extractArray(obj.TOIT, /[,;]/);
    obj.LOCA = utils.extractArray(obj.LOCA, ';');
    obj.JDAT = utils.extractArray(obj.JDAT, ';');
    obj.JATT = utils.extractArray(obj.JATT, ';');
    obj.DOMN = utils.extractArray(obj.DOMN, ';');
    obj.DATE = utils.extractArray(obj.DATE, ';');

    obj.COLL = utils.extractArray(obj.COLL, ';');
    obj.CADA = utils.extractArray(obj.CADA, ';');
    obj.APRO = utils.extractArray(obj.APRO, ';');
    obj.VOUT = utils.extractArray(obj.VOUT, ';');
    obj.VISI = utils.extractArray(obj.VISI, ';');
    obj.PERS = utils.extractArray(obj.PERS, ';');
    obj.INTE = utils.extractArray(obj.INTE, ';');
    obj.ENER = utils.extractArray(obj.ENER, ';');
    obj.ELEV = utils.extractArray(obj.ELEV, ';');
    obj.ETAG = utils.extractArray(obj.ETAG, ';');
    obj.IMPL = utils.extractArray(obj.IMPL, ';');
    obj.PROT = utils.extractArray(obj.PROT, ';');

    //liens
    obj.REFE = utils.extractLink(obj.REFE, obj.REF);
    obj.REFO = utils.extractLink(obj.REFO, obj.REF);
    obj.REFP = utils.extractLink(obj.REFP, obj.REF);
    obj.RENV = utils.extractLink(obj.RENV, obj.REF);

    obj.WRENV = utils.extractLink(obj.WRENV, obj.REF);

    //POP DATA
    obj.POP_DATE = utils.extractPOPDate(obj.SCLE, obj.REF);

    {
        const points = utils.extractPoint(obj.COOR, obj.ZONE, obj.REF);
        if (points) { obj.POP_COORDINATES_POINT = { 'type': 'Point', coordinates: points }; }
    }
    {
        const points = utils.extractPolygon(obj.COORM, obj.ZONE, obj.REF);
        if (points) { obj.POP_COORDINATES_POLYGON = { 'type': 'Polygon', coordinates: points }; }
    }
    obj.POP_HAS_LOCATION = obj.POP_COORDINATES_POINT || obj.POP_COORDINATES_POLYGON ? "oui" : "non"
    obj.POP_HAS_IMAGE = obj.IMG ? "oui" : "non"

    obj.LIENS = utils.extractUrls(obj.LIENS, obj.REF);

    switch (obj.REF.substring(0, 2)) {
        case "IA": obj.POP_DOMAINE = 'Inventaire'; break;
        case "PA": obj.POP_DOMAINE = 'Monument Historique'; break;
        case "EA": obj.POP_DOMAINE = 'Architecture'; break;
        default: obj.POP_DOMAINE = 'NULL'; break;
    }

    console.log(obj)

    return obj;
}

function syncWithMongoDb(file, object, domaine) {
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
            const newObj = MerimeeClean(obj)
            done(null, newObj);
        }, { parallel: 1 });

        var mongo = transform((arr, done) => {
            const objects = arr.map((e) => {
                const m = new object(e);
                // m._id = e.REF;
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
            // .pipe(toClean)
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
