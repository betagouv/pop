const utils = require('./utils')

function cleanPalissy(obj) {
    const errors = [];
    obj.VIDEO = '';//extractIMG(obj.VIDEO);
    obj.CONTACT = utils.extractEmail(obj.CONTACT, obj.REF, errors);
    obj.ACQU = obj.ACQU;
    obj.ADRS = obj.ADRS;
    obj.ADRS2 = obj.ADRS2;
    obj.AFIG = utils.extractArray(obj.AFIG, ';', errors);
    obj.AIRE = obj.AIRE;
    obj.APPL = obj.APPL;
    obj.ATEL = obj.ATEL;
    obj.AUTP = obj.AUTP;
    obj.AUTR = utils.extractArray(obj.AUTR, ';', errors);
    obj.BIBL = obj.BIBL;
    obj.CANT = obj.CANT;
    obj.CATE = utils.extractArray(obj.CATE, ';', errors);
    obj.COM = obj.COM;
    obj.COM2 = obj.COM2;
    obj.COOR = obj.COOR;
    obj.COORM = obj.COORM;
    obj.COPY = obj.COPY;
    obj.DATE = utils.extractArray(obj.DATE, ';', errors);
    obj.DBOR = utils.extractArray(obj.DBOR, ';', errors);
    obj.DENO = utils.extractArray(obj.DENO, ';', errors);
    obj.DENQ = utils.extractArray(obj.DENQ, ';', errors);
    obj.DEPL = obj.DEPL;
    obj.DESC = obj.DESC;
    obj.DIMS = obj.DIMS;
    obj.DMAJ = obj.DMAJ.replace('/', '-', errors);;
    obj.DMIS = obj.DMIS.replace('/', '-', errors);
    obj.DOMN = obj.DOMN;
    obj.DOSADRS = obj.DOSADRS;
    obj.DOSS = utils.extractArray(obj.DOSS, ';', errors);
    obj.DOSURL = obj.DOSURL;
    obj.DOSURLP = obj.DOSURLP;
    obj.DPRO = obj.DPRO;
    obj.DPT = obj.DPT;
    obj.EDIF = obj.EDIF;
    obj.EDIF2 = obj.EDIF2;
    obj.EMPL = obj.EMPL;
    obj.EMPL2 = obj.EMPL2;
    obj.ETAT = utils.extractArray(obj.DOSS, ';', errors);
    obj.ETUD = obj.ETUD;
    obj.EXEC = obj.EXEC;
    obj.EXPO = obj.EXPO;
    obj.HIST = obj.HIST;
    obj.IDAGR = utils.extractArray(obj.IDAGR, 'ou', errors);
    obj.IMAGE = obj.IMAGE;
    obj.IMG = obj.IMG;//arf
    obj.IMPL = obj.IMPL;
    obj.INSC = utils.extractArray(obj.INSC, ';', errors);
    obj.INSEE = utils.extractArray(obj.INSEE, ';', errors);
    obj.INSEE2 = obj.INSEE2;
    obj.INTE = obj.INTE;
    obj.JDAT = utils.extractArray(obj.JDAT, ';', errors);
    obj.LBASE2 = obj.LBASE2;
    obj.LIENS = utils.extractArray(obj.LIENS, ';', errors);
    obj.LIEU = obj.LIEU;
    obj.LMDP = obj.LMDP;
    obj.LOCA = obj.LOCA;
    obj.MATR = utils.extractArray(obj.MATR, ';', errors);
    obj.MFICH = utils.extractArray(obj.MFICH, ';', errors);
    obj.MICR = obj.MICR;
    obj.MOSA = obj.MOSA;
    obj.NART = obj.NART;
    obj.NINV = obj.NINV;
    obj.NOMS = utils.extractArray(obj.NOMS, ';', errors);
    obj.NUMA = obj.NUMA;
    obj.NUMP = obj.NUMP;
    obj.OBS = obj.OBS;
    obj.ORIG = obj.ORIG;
    obj.PAPP = obj.PAPP;
    obj.PARN = utils.extractArray(obj.PARN, ';', errors);
    obj.PART = utils.extractArray(obj.PART, ';', errors);
    obj.PDEN = utils.extractArray(obj.PDEN, ';', errors);
    obj.PDIM = obj.PDIM;
    obj.PERS = utils.extractArray(obj.PERS, ';', errors);
    obj.PETA = obj.PETA;
    obj.PHOTO = obj.PHOTO;
    obj.PINS = obj.PINS;
    obj.PINT = obj.PINT;
    obj.PLOC = obj.PLOC;
    obj.PPRO = obj.PPRO;
    obj.PREP = obj.PREP;
    obj.PROT = obj.PROT;
    obj.REFA = utils.extractArray(obj.REFA, ';', errors);
    obj.REFE = utils.extractArray(obj.REFE, ';', errors);
    obj.REFM = obj.REFM;
    obj.REFP = utils.extractArray(obj.REFP, 'ou', errors);
    obj.REG = obj.REG;
    obj.RENP = utils.extractArray(obj.RENP, ';', errors);
    obj.RENV = utils.extractArray(obj.RENV, ';', errors);
    obj.REPR = obj.REPR;
    obj.SCLD = utils.extractArray(obj.SCLD, ';', errors);
    obj.SCLE = utils.extractArray(obj.SCLE, ';', errors);
    obj.SCLX = utils.extractArray(obj.SCLX, ';', errors);
    obj.SOUR = obj.SOUR;
    obj.STAD = utils.extractArray(obj.STAD, ';', errors);
    obj.STAT = utils.extractArray(obj.STAT, ';', errors);
    obj.STRU = utils.extractArray(obj.STRU, ';', errors);
    obj.THEM = obj.THEM;
    obj.TICO = obj.TICO;
    obj.TITR = obj.TITR;
    obj.TOUT = obj.TOUT;
    obj.VIDEO = '';//extractIMG(obj.VIDEO, errors);
    obj.VOLS = obj.VOLS;
    obj.WADRS = obj.WADRS;
    obj.WCOM = obj.WCOM;
    obj.WEB = obj.WEB;
    obj.WRENV = obj.WRENV;
    obj.ZONE = obj.ZONE;
    return { notice: obj, errors };
}



function getMappingPalissy() {
    return ["ACQU",
        "ADRS",
        "ADRS2",
        "AFIG",
        "AIRE",
        "APPL",
        "ATEL",
        "AUTP",
        "AUTR",
        "BIBL",
        "CANT",
        "CATE",
        "COM",
        "COM2",
        "CONTACT",
        "COOR",
        "COORM",
        "COPY",
        "DATE",
        "DBOR",
        "DENO",
        "DENQ",
        "DEPL",
        "DESC",
        "DIMS",
        "DMAJ",
        "DMIS",
        "DOMN",
        "DOSADRS",
        "DOSS",
        "DOSURL",
        "DOSURLP",
        "DPRO",
        "DPT",
        "EDIF",
        "EDIF2",
        "EMPL",
        "EMPL2",
        "ETAT",
        "ETUD",
        "EXEC",
        "EXPO",
        "HIST",
        "IDAGR",
        "IMAGE",
        "IMG",
        "IMPL",
        "INSC",
        "INSEE",
        "INSEE2",
        "INTE",
        "JDAT",
        "LBASE2",
        "LIENS",
        "LIEU",
        "LMDP",
        "LOCA",
        "MATR",
        "MFICH",
        "MICR",
        "MOSA",
        "NART",
        "NINV",
        "NOMS",
        "NUMA",
        "NUMP",
        "OBS",
        "ORIG",
        "PAPP",
        "PARN",
        "PART",
        "PDEN",
        "PDIM",
        "PERS",
        "PETA",
        "PHOTO",
        "PINS",
        "PINT",
        "PLOC",
        "PPRO",
        "PREP",
        "PROT",
        "REFA",
        "REFE",
        "REFM",
        "REFP",
        "REG",
        "RENP",
        "RENV",
        "REPR",
        "SCLD",
        "SCLE",
        "SCLX",
        "SOUR",
        "STAD",
        "STAT",
        "STRU",
        "THEM",
        "TICO",
        "TITR",
        "TOUT",
        "VIDEO",
        "VOLS",
        "WADRS",
        "WCOM",
        "WEB",
        "WRENV",
        "ZONE"]
}


module.exports = {
    cleanPalissy,
    getMappingPalissy
}
