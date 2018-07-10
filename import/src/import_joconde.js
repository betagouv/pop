var fs = require('fs');
var path = require('path');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var transform = require('stream-transform');
var csvparse = require('csv-parse');
var batch = require('through-batch');
var http = require('http');

const AWS = require('aws-sdk');
const showInconsistentLines = require('./utils/check_file_integrity')
const sync = require('./sync');
const utils = require('./utils')
const log = require('./utils/log.js')

var s3 = new AWS.S3();

function run() {
    return new Promise(async (resolve, reject) => {
        const files = ['./import/data/joconde-MUSEES-valid.csv']
        for (var i = 0; i < files.length; i++) {
            console.log('RUN  ', files[i])

            console.log('Start file integrity check');
            const errs = await (showInconsistentLines(files[i]))
            console.log('End file integrity check', errs.length);

            console.log('Start syncWithMongoDb');
            await (sync(files[i], require('../../src/models/joconde'), clean))
            console.log('End syncWithMongoDb');
        }
        resolve();
    })
}

function clean(obj) {
    return new Promise((resolve, reject) => {


        obj.REF = obj.REF.trim();
        obj.ADPT = utils.extractArray(obj.ADPT, ';');
        obj.APPL = utils.extractArray(obj.APPL, ';');
        obj.APTN = obj.APTN
        obj.ATTR = obj.ATTR
        obj.AUTR = obj.AUTR
        obj.BIBL = obj.BIBL
        obj.COMM = obj.COMM
        obj.CONTACT = utils.extractEmail(obj.CONTACT, obj.REF);
        obj.COOR = obj.COOR
        obj.COPY = obj.COPY
        obj.DACQ = obj.DACQ
        obj.DATA = obj.DATA
        obj.DATION = obj.DATION
        obj.DDPT = obj.DDPT
        obj.DECV = obj.DECV
        obj.DENO = utils.extractArray(obj.DENO, ';');
        obj.DEPO = obj.DEPO
        obj.DESC = obj.DESC
        obj.DESY = obj.DESY
        obj.DIFFU = obj.DIFFU ? "oui" : "non"
        obj.DIMS = obj.DIMS
        obj.DMAJ = obj.DMAJ.replace('/', '-');;
        obj.DMIS = obj.DMIS.replace('/', '-');
        obj.DOMN = utils.extractArray(obj.DOMN, ';');
        obj.DREP = obj.DREP;
        obj.ECOL = utils.extractArray(obj.ECOL, ';');
        obj.EPOQ = utils.extractArray(obj.EPOQ, ';');
        obj.ETAT = utils.extractArray(obj.ETAT, ';');
        obj.EXPO = obj.EXPO
        obj.GENE = utils.extractArray(obj.GENE, ';');
        obj.GEOHI = utils.extractArray(obj.GEOHI, ';');
        obj.HIST = obj.HIST
        obj.IMAGE = obj.IMAGE
        obj.INSC = utils.extractArray(obj.INSC, ';');
        obj.INV = obj.INV
        obj.LABEL = obj.LABEL
        obj.LABO = obj.LABO
        obj.LARC = obj.LARC
        obj.LIEUX = obj.LIEUX
        obj.LOCA = obj.LOCA
        obj.LOCA2 = obj.LOCA2
        obj.LOCA3 = obj.LOCA3
        obj.MILL = utils.extractArray(obj.MILL, ';');
        obj.MILU = obj.MILU
        obj.MOSA = obj.MOSA
        obj.MSGCOM = obj.MSGCOM
        obj.MUSEO = obj.MUSEO
        obj.NSDA = obj.NSDA
        obj.ONOM = utils.extractArray(obj.ONOM, ';');
        obj.PAUT = obj.PAUT
        obj.PDAT = obj.PDAT
        obj.PDEC = obj.PDEC
        obj.PEOC = utils.extractArray(obj.PEOC, ';');
        obj.PERI = utils.extractArray(obj.PERI, ';');
        obj.PERU = utils.extractArray(obj.PERU, ';');
        obj.PHOT = obj.PHOT
        obj.PINS = obj.PINS
        obj.PLIEUX = obj.PLIEUX
        obj.PREP = utils.extractArray(obj.PREP, ';');
        obj.PUTI = obj.PUTI
        obj.RANG = obj.RANG
        obj.REDA = utils.extractArray(obj.REDA, ';');
        obj.REFIM = obj.REFIM
        obj.REPR = obj.REPR
        obj.RETIF = obj.RETIF
        obj.SREP = utils.extractArray(obj.SREP, ';');
        obj.STAT = utils.extractArray(obj.STAT, ';');
        obj.TECH = utils.extractArray(obj.TECH, ';');
        obj.TICO = obj.TICO.replace(/(<([^>]+)>)/ig, '')
        obj.TITR = obj.TITR
        obj.TOUT = obj.TOUT
        obj.UTIL = utils.extractArray(obj.UTIL, ';');
        obj.VIDEO = obj.VIDEO
        obj.WWW = utils.extractUrls(obj.WWW, obj.REF).length ? utils.extractUrls(obj.WWW, obj.REF)[0] : '';
        obj.LVID = obj.LVID;

        //GENERATED 


        extractIMG(obj.REFIM, obj.IMG, obj.REF).then((img) => {
            obj.IMG = img;
            obj.CONTIENT_IMAGE = obj.IMG.length ? "oui" : "non"
            resolve(obj);
        })
    })
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        var dirname = path.dirname(dest);
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname);
        }
        var file = fs.createWriteStream(dest);
        var request = http.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close(resolve);  // close() is async, call cb after close completes.
            });
        }).on('error', function (err) { // Handle errors
            fs.unlink(dest); // Delete the file async. (But we don't check the result)
            console.log('Erreur with file', url, dest)
            resolve()
        });
    })
};

function extractIMG(REFIM, IMG, REF) {
    return new Promise(async (resolve, reject) => {

        if (!IMG) { resolve([]); return; }
        const arr = utils._regex(IMG, /([a-zA-Z0-9_\/-]+.(gif|jpg|jpeg|tiff|png|avi))/g);

        const files = [];

        for (var i = 0; i < arr.length; i++) {
            let name = arr[i].replace(/\/[\/0-9a-z]+\//g, '');
            name = name.replace(/_[a-zA-Z0-9]\./g, '.');
            name = name.replace(/[a-zA-Z0-9]*_/g, '');

            files.push(`https://s3.eu-west-3.amazonaws.com/pop-phototeque-staging/joconde/${REF}/${name}`)

            // await (download(`http://www2.culture.gouv.fr/Wave/image/joconde${arr[i]}`, `./joconde/${REF}/${name}`));
            // console.log('DOWNLOADED ', `http://www2.culture.gouv.fr/Wave/image/joconde${arr[i]}`)
        }

        resolve(files);
    })
}



module.exports = run;
