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
        const files = ['./import/data/palissy-ETAT-valid.csv', './import/data/palissy-INV-valid.csv', './import/data/palissy-MH-valid.csv']
        for (var i = 0; i < files.length; i++) {
            console.log('RUN  ', files[i])

            console.log('Start file integrity check');
            const errs = await (showInconsistentLines(files[i]))
            console.log('End file integrity check', errs.length);

            console.log('Start syncWithMongoDb');
            await (sync(files[i], require('../../src/models/palissy'), clean))
            console.log('End syncWithMongoDb');
        }
        resolve();
    })
}

function clean(obj) {
    obj.VIDEO = extractIMG(obj.VIDEO);
    obj.CONTACT = utils.extractEmail(obj.CONTACT, obj.REF);
    obj.ACQU = obj.ACQU;
    obj.ADRS = obj.ADRS;
    obj.ADRS2 = obj.ADRS2;
    obj.AFIG = utils.extractArray(obj.AFIG, ';');
    obj.AIRE = obj.AIRE;
    obj.APPL = obj.APPL;
    obj.ATEL = obj.ATEL;
    obj.AUTP = obj.AUTP;
    obj.AUTR = utils.extractArray(obj.AUTR, ';');
    obj.BIBL = obj.BIBL;
    obj.CANT = obj.CANT;
    obj.CATE = utils.extractArray(obj.CATE, ';');
    obj.COM = obj.COM;
    obj.COM2 = obj.COM2;
    obj.CONTACT = obj.CONTACT;
    obj.COOR = obj.COOR;
    obj.COORM = obj.COORM;
    obj.COPY = obj.COPY;
    obj.DATE = utils.extractArray(obj.DATE, ';');
    obj.DBOR = utils.extractArray(obj.DBOR, ';');
    obj.DENO = utils.extractArray(obj.DENO, ';');
    obj.DENQ = utils.extractArray(obj.DENQ, ';');
    obj.DEPL = obj.DEPL;
    obj.DESC = obj.DESC;
    obj.DIMS = obj.DIMS;
    obj.DMAJ = obj.DMAJ.replace('/', '-');;
    obj.DMIS = obj.DMIS.replace('/', '-');
    obj.DOMN = obj.DOMN;
    obj.DOSADRS = obj.DOSADRS;
    obj.DOSS = utils.extractArray(obj.DOSS, ';');
    obj.DOSURL = obj.DOSURL;
    obj.DOSURLP = obj.DOSURLP;
    obj.DPRO = obj.DPRO;
    obj.DPT = obj.DPT;
    obj.EDIF = obj.EDIF;
    obj.EDIF2 = obj.EDIF2;
    obj.EMPL = obj.EMPL;
    obj.EMPL2 = obj.EMPL2;
    obj.ETAT = utils.extractArray(obj.DOSS, ';');
    obj.ETUD = obj.ETUD;
    obj.EXEC = obj.EXEC;
    obj.EXPO = obj.EXPO;
    obj.HIST = obj.HIST;
    obj.IDAGR = utils.extractArray(obj.IDAGR, 'ou');
    obj.IMAGE = obj.IMAGE;
    obj.IMG = obj.IMG;//arf
    obj.IMPL = obj.IMPL;
    obj.INSC = utils.extractArray(obj.INSC, ';');
    obj.INSEE = utils.extractArray(obj.INSEE, ';');
    obj.INSEE2 = obj.INSEE2;
    obj.INTE = obj.INTE;
    obj.JDAT = utils.extractArray(obj.JDAT, ';');
    obj.LBASE2 = obj.LBASE2;
    obj.LIENS = utils.extractArray(obj.LIENS, ';');
    obj.LIEU = obj.LIEU;
    obj.LMDP = obj.LMDP;
    obj.LOCA = obj.LOCA;
    obj.MATR = utils.extractArray(obj.MATR, ';');
    obj.MFICH = utils.extractArray(obj.MFICH, ';');
    obj.MICR = obj.MICR;
    obj.MOSA = obj.MOSA;
    obj.NART = obj.NART;
    obj.NINV = obj.NINV;
    obj.NOMS = utils.extractArray(obj.NOMS, ';');
    obj.NUMA = obj.NUMA;
    obj.NUMP = obj.NUMP;
    obj.OBS = obj.OBS;
    obj.ORIG = obj.ORIG;
    obj.PAPP = obj.PAPP;
    obj.PARN = utils.extractArray(obj.PARN, ';');
    obj.PART = utils.extractArray(obj.PART, ';');
    obj.PDEN = utils.extractArray(obj.PDEN, ';');
    obj.PDIM = obj.PDIM;
    obj.PERS = utils.extractArray(obj.PERS, ';');
    obj.PETA = obj.PETA;
    obj.PHOTO = obj.PHOTO;
    obj.PINS = obj.PINS;
    obj.PINT = obj.PINT;
    obj.PLOC = obj.PLOC;
    obj.PPRO = obj.PPRO;
    obj.PREP = obj.PREP;
    obj.PROT = obj.PROT;
    obj.REFA = utils.extractArray(obj.REFA, ';');
    obj.REFE = utils.extractArray(obj.REFE, ';');
    obj.REFM = obj.REFM;
    obj.REFP = utils.extractArray(obj.REFP, 'ou');
    obj.REG = obj.REG;
    obj.RENP = utils.extractArray(obj.RENP, ';');
    obj.RENV = utils.extractArray(obj.RENV, ';');
    obj.REPR = obj.REPR;
    obj.SCLD = utils.extractArray(obj.SCLD, ';');
    obj.SCLE = utils.extractArray(obj.SCLE, ';');
    obj.SCLX = utils.extractArray(obj.SCLX, ';');
    obj.SOUR = obj.SOUR;
    obj.STAD = utils.extractArray(obj.STAD, ';');
    obj.STAT = utils.extractArray(obj.STAT, ';');
    obj.STRU = utils.extractArray(obj.STRU, ';');
    obj.THEM = obj.THEM;
    obj.TICO = obj.TICO;
    obj.TITR = obj.TITR;
    obj.TOUT = obj.TOUT;
    obj.VIDEO = extractIMG(obj.VIDEO);
    obj.VOLS = obj.VOLS;
    obj.WADRS = obj.WADRS;
    obj.WCOM = obj.WCOM;
    obj.WEB = obj.WEB;
    obj.WRENV = obj.WRENV;
    obj.ZONE = obj.ZONE;
    return obj;
}


function extractIMG(str) {
    // if (!str) return []
    // const arr = utils.extractArray(str, ';');
    // return arr.map(e => `http://www2.culture.gouv.fr/Wave/image/joconde${e}`)
}

module.exports = run;
