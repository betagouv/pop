const utils = require('./utils')

function cleanMnr(obj) {
    const errors = [];
    obj.REF = obj.REF.trim();
    obj.TOUT = obj.TOUT;
    obj.AUTR = obj.AUTR;
    obj.PAUT = obj.PAUT;
    obj.ATTR = obj.ATTR;
    obj.ECOL = obj.ECOL;
    obj.TITR = obj.TITR;
    obj.ATIT = obj.ATIT;
    obj.PTIT = obj.PTIT;
    obj.DENO = utils.extractArray(obj.DENO, ';', errors);
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
    obj.SCLE = utils.extractArray(obj.SCLE, ';', errors);
    obj.STYL = obj.STYL;
    obj.MILL = obj.MILL;
    obj.TECH = utils.extractArray(obj.TECH, ';', errors);
    obj.DIMS = obj.DIMS;
    obj.VIDEO = '';//extractIMG(obj.VIDEO);
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
    obj.DMAJ = obj.DMAJ;
    obj.NUMS = obj.NUMS;
    obj.SUITE = obj.SUITE;
    obj.COMM = obj.COMM;
    obj.NOTE2 = obj.NOTE2;
    obj.RESUME = obj.RESUME;
    obj.PHOT = obj.PHOT;
    obj.POP_HAS_IMAGE = obj.VIDEO.length ? "oui" : "non"
    return { notice: obj, errors };
}


function getMappingMnr() {
    return ["REF",
        "TOUT",
        "AUTR",
        "PAUT",
        "ATTR",
        "ECOL",
        "TITR",
        "ATIT",
        "PTIT",
        "DENO",
        "DESC",
        "DOMN",
        "LOCA",
        "INSC",
        "MARQ",
        "OBSE",
        "ETAT",
        "GENE",
        "PROV",
        "HIST",
        "HIST2",
        "HIST3",
        "HIST4",
        "HIST5",
        "HIST6",
        "SCLE",
        "STYL",
        "MILL",
        "TECH",
        "DIMS",
        "VIDEO",
        "INV",
        "EXPO",
        "BIBL",
        "AATT",
        "AUTI",
        "CATE",
        "NOTE",
        "REDC",
        "DREP",
        "PREP",
        "REPR",
        "SREP",
        "REFIM",
        "DMAJ",
        "NUMS",
        "SUITE",
        "COMM",
        "NOTE2",
        "RESUME",
        "PHOT"]
}


module.exports = {
    cleanMnr,
    getMappingMnr
}


