var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var transform = require('stream-transform');
var csvparse = require('csv-parse');
var batch = require('through-batch');

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
    obj.VIDEO = extractIMG(obj.VIDEO);
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
    obj.DMAJ = obj.DMAJ.replace('/', '-');;
    // obj.DMIS = obj.DMIS.replace('/', '-');
    obj.NUMS = obj.NUMS;
    obj.SUITE = obj.SUITE;
    obj.COMM = obj.COMM;
    obj.NOTE2 = obj.NOTE2;
    obj.RESUME = obj.RESUME;
    obj.PHOT = obj.PHOT;
    obj.CONTIENT_IMAGE = obj.VIDEO.length ? "oui" : "non"
    return obj;
}

function extractIMG(str) {
    if (!str) return []
    const arr = utils.extractArray(str, ';');
    return arr.map(e => `http://www2.culture.gouv.fr/Wave/savimage/mnr/${e}`)
}

module.exports = run;
