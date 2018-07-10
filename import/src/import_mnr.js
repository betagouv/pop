var fs = require('fs');
var path = require('path');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var transform = require('stream-transform');
var csvparse = require('csv-parse');
var batch = require('through-batch');
var http = require('http');

const showInconsistentLines = require('./utils/check_file_integrity')
const sync = require('./sync');
const utils = require('./utils')


function run() {
    return new Promise(async (resolve, reject) => {
        const files = ['./import/data/mnrbis-DMF-valid.csv']
        for (var i = 0; i < files.length; i++) {
            console.log('RUN  ', files[i])

            console.log('Start file integrity check');
            const errs = await (showInconsistentLines(files[i]))
            console.log('End file integrity check', errs.length);

            console.log('Start syncWithMongoDb');
            await (sync(files[i], require('../../src/models/mnr'), clean))
            console.log('End syncWithMongoDb');
        }
        resolve();
    })
}

function clean(obj) {
    return new Promise((resolve, reject) => {
        obj.REF = obj.REF.trim();
        obj.TOUT = obj.TOUT;
        obj.AUTR = obj.AUTR;
        obj.PAUT = obj.PAUT;
        obj.ATTR = obj.ATTR;
        obj.ECOL = obj.ECOL;
        obj.TITR = obj.TITR;
        obj.ATIT = obj.ATIT;
        obj.PTIT = obj.PTIT;
        obj.DENO = utils.extractArray(obj.DENO, ';');
        obj.DESC = obj.DESC;
        obj.DOMN = obj.DOMN;
        obj.LOCA = obj.LOCA;
        obj.INSC = obj.INSC;
        obj.MARQ = obj.MARQ;
        obj.OBSE = obj.OBSE;
        obj.ETAT = obj.ETAT;
        obj.GENE = obj.GENE;
        obj.PROV = obj.PROV;
        obj.HIST = obj.HIST;
        obj.HIST2 = obj.HIST2;
        obj.HIST3 = obj.HIST3;
        obj.HIST4 = obj.HIST4;
        obj.HIST5 = obj.HIST5;
        obj.HIST6 = obj.HIST6;
        obj.SCLE = utils.extractArray(obj.SCLE, ';');
        obj.STYL = obj.STYL;
        obj.MILL = obj.MILL;
        obj.TECH = utils.extractArray(obj.TECH, ';');
        obj.DIMS = obj.DIMS;

        obj.INV = obj.INV;
        obj.EXPO = obj.EXPO;
        obj.BIBL = obj.BIBL;
        obj.AATT = obj.AATT;
        obj.AUTI = obj.AUTI;
        obj.CATE = obj.CATE;
        obj.NOTE = obj.NOTE;
        obj.REDC = obj.REDC;
        obj.DREP = obj.DREP;
        obj.PREP = obj.PREP;
        obj.REPR = obj.REPR;
        obj.SREP = obj.SREP;
        obj.REFIM = obj.REFIM;
        obj.DMAJ = obj.DMAJ.replace('/', '-');
        obj.NUMS = obj.NUMS;
        obj.SUITE = obj.SUITE;
        obj.COMM = obj.COMM;
        obj.NOTE2 = obj.NOTE2;
        obj.RESUME = obj.RESUME;
        obj.PHOT = obj.PHOT;
        obj.CONTIENT_IMAGE = obj.VIDEO.length ? "oui" : "non";
        extractIMG(obj.VIDEO, obj.REF).then((videos) => {
            obj.VIDEO = videos;
            resolve(obj);
        })
    })
}

function extractIMG(str, REF) {
    return new Promise(async (resolve, reject) => {
        if (!str) resolve([]);
        let arr = utils.extractArray(str, ';');
        arr = arr.filter(e => !e.includes('v.'))

        for (var i = 0; i < arr.length; i++) {
            // console.log(`1- http://www2.culture.gouv.fr/Wave/savimage/mnr/${arr[i]}`)
            arr[i] = arr[i].replace(/[a-z0-9A-Z]+\//g, '');
            // console.log(`2- http://www2.culture.gouv.fr/Wave/savimage/mnr/${arr[i]}`)
            await (download(`http://www2.culture.gouv.fr/Wave/savimage/mnr/${arr[i]}`, REF));
            //   console.log(`http://www2.culture.gouv.fr/Wave/savimage/mnr/${arr[i]} downloaded`)
        }
        resolve(arr.map(e => `mnr/${REF}${e}`))
        //        return arr.map(e => `http://www2.culture.gouv.fr/Wave/savimage/mnr/${e}`)
    });
}

function download(url, dest) {
    // console.log(`downloading ${url}`)
    return new Promise((resolve, reject) => {
        var request = http.get(url, function (response) {
            if (!response.headers['content-type'].match(/image/)) {
                console.log(dest, url)
                resolve();
            } else {
                // console.log('Is an image ', url)
                resolve();
            }
        }).on('error', function (err) { // Handle errors
            console.log('Erreur with file', url, dest)
        })
    })
};

// function download(url, dest) {
//     console.log(`downloading ${url}`)
//     return new Promise((resolve, reject) => {
//         var dirname = path.dirname(dest);
//         if (!fs.existsSync(dirname)) {
//             fs.mkdirSync(dirname);
//         }
//         if (fs.existsSync(dest)) {
//             console.log('PASS ', dest)
//             resolve()
//             return;
//         }
//         var file = fs.createWriteStream(dest);
//         var request = http.get(url, function (response) {
//             response.pipe(file);
//             file.on('finish', function () {
//                 file.close(resolve);  // close() is async, call cb after close completes.
//             });
//         }).on('error', function (err) { // Handle errors
//             fs.unlink(dest); // Delete the file async. (But we don't check the result)
//             console.log('Erreur with file', url, dest)

//         })
//     })
// };

module.exports = run;
