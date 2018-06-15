

const showInconsistentLines = require('./utils/check_file_integrity')
const sync = require('./sync');
const utils = require('./utils')


function run() {
    return new Promise(async (resolve, reject) => {
        const files = ['./import/data/memoire-ARCHEO-valid.csv', './import/data/memoire-CRMH-valid.csv', './import/data/memoire-IVR-valid.csv', './import/data/memoire-SAP-valid.csv', './import/data/memoire-SDAP-valid.csv']
        //  const files  =['./import/data/merimee-INV-valid.csv', './import/data/merimee-MH-valid.csv']
        for (var i = 0; i < files.length; i++) {
            console.log('RUN  ', files[i])

            console.log('Start file integrity check');
            const errs = await (showInconsistentLines(files[i]))
            console.log('End file integrity check', errs.length);

            console.log('Start syncWithMongoDb');
            await (sync(files[i], require('../../src/models/memoire'), clean))
            console.log('End syncWithMongoDb');
        }
        resolve();
    })
}

function clean(obj) {

    obj.REF = obj.REF;
    obj.TOUT = obj.TOUT;
    obj.ADRESSE = obj.ADRESSE;
    obj.AUTOEU = obj.AUTOEU;
    obj.AUTG = obj.AUTG;
    obj.AUTP = obj.AUTP;
    obj.AUTOR = obj.AUTOR;
    obj.AUTTI = obj.AUTTI;
    obj.COM = obj.COM;
    obj.DOM = obj.DOM;
    obj.EDIF = obj.EDIF;
    obj.EXPO = obj.EXPO;
    obj.JDATPV = obj.JDATPV;
    obj.LIEUCOR = obj.LIEUCOR;
    obj.COTECOR = obj.COTECOR;
    obj.LIEUCTI = obj.LIEUCTI;
    obj.COTECTI = obj.COTECTI;
    obj.LIEUCP = obj.LIEUCP;
    obj.COTECP = obj.COTECP;
    obj.LEG = obj.LEG;
    obj.OBJT = obj.OBJT;
    obj.OBS = obj.OBS;
    obj.OBSOR = obj.OBSOR;
    obj.OBSTI = obj.OBSTI;
    obj.PAYS = obj.PAYS;
    obj.PUBLI = obj.PUBLI;
    obj.TIREDE = obj.TIREDE;
    obj.ROLE = obj.ROLE;
    obj.PRECOR = obj.PRECOR;
    obj.SERIE = obj.SERIE;
    obj.THEATRE = obj.THEATRE;
    obj.TITRE = obj.TITRE;
    obj.DMIS = obj.DMIS.replace('/', '-');
    obj.DMAJ = obj.DMAJ.replace('/', '-');
    obj.IDPROD = obj.IDPROD;
    obj.NUMCD = obj.NUMCD;
    obj.NUMF = obj.NUMF;
    obj.INSEE = obj.INSEE;
    obj.NVD = obj.NVD;
    obj.MARQ = obj.MARQ;
    obj.ACC = obj.ACC;
    obj.ACQU = obj.ACQU;
    obj.ADPHOT = obj.ADPHOT;
    obj.AIRE = obj.AIRE;
    obj.ANUMP = obj.ANUMP;
    obj.COPY = obj.COPY;
    obj.COULEUR = obj.COULEUR;
    obj.COSTUME = obj.COSTUME;
    obj.DATIMM = obj.DATIMM;
    obj.DATOEU = obj.DATOEU;
    obj.DATPV = obj.DATPV;
    obj.DATOR = obj.DATOR;
    obj.DATTI = obj.DATTI;
    obj.DATG = obj.DATG;
    obj.DATD = obj.DATD;
    obj.DIFF = obj.DIFF;
    obj.DPT = obj.DPT;
    obj.EDIARCH = obj.EDIARCH;
    obj.ECH = obj.ECH;
    obj.FORMAT = obj.FORMAT;
    obj.FORMATOR = obj.FORMATOR;
    obj.FORMATTI = obj.FORMATTI;
    obj.LBASE = obj.LBASE;
    obj.WEB = obj.WEB;
    obj.LIB = obj.LIB;
    obj.LOCA = obj.LOCA;
    obj.LIEUORIG = obj.LIEUORIG;
    obj.MCGEO = obj.MCGEO;
    obj.MCL = obj.MCL;
    obj.MENTIONS = obj.MENTIONS;
    obj.MENTOR = obj.MENTOR;
    obj.MENTTI = obj.MENTTI;
    obj.MCPER = obj.MCPER;
    obj.VUECD = obj.VUECD;
    obj.NUMAUTP = obj.NUMAUTP;
    obj.NUMCAF = obj.NUMCAF;
    obj.ANUMOR = obj.ANUMOR;
    obj.NUMOR = obj.NUMOR;
    obj.NUMP = obj.NUMP;
    obj.ANUMTI = obj.ANUMTI;
    obj.NUMTI = obj.NUMTI;
    obj.RENV = obj.RENV;
    obj.REG = obj.REG;
    obj.SENS = obj.SENS;
    obj.SCLE = obj.SCLE;
    obj.SUP = obj.SUP;
    obj.TECH = obj.TECH;
    obj.TECHOR = obj.TECHOR;
    obj.TECHTI = obj.TECHTI;
    obj.TOILE = obj.TOILE;
    obj.TYP = obj.TYP;
    obj.TYPDOC = obj.TYPDOC;
    obj.TYPEIMG = obj.TYPEIMG;
    obj.TYPSUPP = obj.TYPSUPP;
    obj.VIDEO = obj.VIDEO;
    obj.LBASE2 = obj.LBASE2;
    obj.LEG2 = obj.LEG2;
    obj.REFIM = obj.REFIM;
    obj.REFIMG = obj.REFIMG;
    obj.MOSA = obj.MOSA;
    obj.SITE = obj.SITE;
    obj.NUMSITE = obj.NUMSITE;
    obj.NUMOP = obj.NUMOP;
    obj.CHRONO = obj.CHRONO;
    obj.STRUCT = obj.STRUCT;
    obj.SUJET = obj.SUJET;
    obj.TICO = obj.TICO;
    obj.NUMI = obj.NUMI;
    obj.LIEU = obj.LIEU;
    obj.ADRS = obj.ADRS;
    obj.CONTACT = obj.CONTACT;
    obj.EMET = obj.EMET;
    obj.NUM = obj.NUM;
    obj.IMG = obj.IMG;
    obj.WCOM = obj.WCOM;
    obj.LIENS = obj.LIENS;
    obj.LAUTP = obj.LAUTP;

    return obj;
}

module.exports = run;
