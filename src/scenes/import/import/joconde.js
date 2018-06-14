const utils = require('./utils')

function cleanJoconde(obj) {
    const errors = [];
    obj.REF = obj.REF.trim();
    obj.ADPT = utils.extractArray(obj.ADPT, ';', errors);
    obj.APPL = utils.extractArray(obj.APPL, ';', errors);
    obj.APTN = obj.APTN
    obj.ATTR = obj.ATTR
    obj.AUTR = obj.AUTR
    obj.BIBL = obj.BIBL
    obj.COMM = obj.COMM
    obj.CONTACT = utils.extractEmail(obj.CONTACT, obj.REF, errors);
    obj.COOR = obj.COOR
    obj.COPY = obj.COPY
    obj.DACQ = obj.DACQ
    obj.DATA = obj.DATA
    obj.DATION = obj.DATION
    obj.DDPT = obj.DDPT
    obj.DECV = obj.DECV
    obj.DENO = utils.extractArray(obj.DENO, ';', errors);
    obj.DEPO = obj.DEPO
    obj.DESC = obj.DESC
    obj.DESY = obj.DESY
    obj.DIFFU = obj.DIFFU ? "oui" : "non"
    obj.DIMS = obj.DIMS
    obj.DMAJ = obj.DMA
    obj.DMIS = obj.DMIS
    obj.DOMN = utils.extractArray(obj.DOMN, ';', errors);
    obj.DREP = obj.DREP;
    obj.ECOL = utils.extractArray(obj.ECOL, ';', errors);
    obj.EPOQ = utils.extractArray(obj.EPOQ, ';', errors);
    obj.ETAT = utils.extractArray(obj.ETAT, ';', errors);
    obj.EXPO = obj.EXPO
    obj.GENE = utils.extractArray(obj.GENE, ';', errors);
    obj.GEOHI = utils.extractArray(obj.GEOHI, ';', errors);
    obj.HIST = obj.HIST
    obj.IMAGE = obj.IMAGE
    obj.IMG = obj.IMG//extractIMG(obj.IMG, obj.REF, errors);
    obj.INSC = utils.extractArray(obj.INSC, ';', errors);
    obj.INV = obj.INV
    obj.LABEL = obj.LABEL
    obj.LABO = obj.LABO
    obj.LARC = obj.LARC
    obj.LIEUX = obj.LIEUX
    obj.LOCA = obj.LOCA
    obj.LOCA2 = obj.LOCA2
    obj.LOCA3 = obj.LOCA3
    obj.MILL = utils.extractArray(obj.MILL, ';', errors);
    obj.MILU = obj.MILU
    obj.MOSA = obj.MOSA
    obj.MSGCOM = obj.MSGCOM
    obj.MUSEO = obj.MUSEO
    obj.NSDA = obj.NSDA
    obj.ONOM = utils.extractArray(obj.ONOM, ';', errors);
    obj.PAUT = obj.PAUT
    obj.PDAT = obj.PDAT
    obj.PDEC = obj.PDEC
    obj.PEOC = utils.extractArray(obj.PEOC, ';', errors);
    obj.PERI = utils.extractArray(obj.PERI, ';', errors);
    obj.PERU = utils.extractArray(obj.PERU, ';', errors);
    obj.PHOT = obj.PHOT
    obj.PINS = obj.PINS
    obj.PLIEUX = obj.PLIEUX
    obj.PREP = utils.extractArray(obj.PREP, ';', errors);
    obj.PUTI = obj.PUTI
    obj.RANG = obj.RANG
    obj.REDA = utils.extractArray(obj.REDA, ';', errors);
    obj.REFIM = obj.REFIM
    obj.REPR = obj.REPR
    obj.RETIF = obj.RETIF
    obj.SREP = utils.extractArray(obj.SREP, ';', errors);
    obj.STAT = utils.extractArray(obj.STAT, ';', errors);
    obj.TECH = utils.extractArray(obj.TECH, ';', errors);
    obj.TICO = obj.TICO
    obj.TITR = obj.TITR
    obj.TOUT = obj.TOUT
    obj.UTIL = utils.extractArray(obj.UTIL, ';', errors);
    obj.VIDEO = obj.VIDEO
    obj.WWW = utils.extractUrls(obj.WWW, obj.REF, errors);
    obj.LVID = obj.LVID;
    return { notice: obj, errors };
}

function getMappingJoconde() {
    return ["REF",
        "REFMIS",
        "ADPT",
        "APPL",
        "APTN",
        "ATTR",
        "AUTR",
        "BIBL",
        "COMM",
        "CONTACT",
        "COOR",
        "COPY",
        "DACQ",
        "DATA",
        "DATION",
        "DDPT",
        "DECV",
        "DENO",
        "DEPO",
        "DESC",
        "DESY",
        "DIFFU",
        "DIMS",
        "DMAJ",
        "DMIS",
        "DOMN",
        "DREP",
        "ECOL",
        "EPOQ",
        "ETAT",
        "EXPO",
        "GENE",
        "GEOHI",
        "HIST",
        "IMAGE",
        "IMG",
        "INSC",
        "INV",
        "LABEL",
        "LABO",
        "LARC",
        "LIEUX",
        "LOCA",
        "LOCA2",
        "LOCA3",
        "MILL",
        "MILU",
        "MOSA",
        "MSGCOM",
        "MUSEO",
        "NSDA",
        "ONOM",
        "PAUT",
        "PDAT",
        "PDEC",
        "PEOC",
        "PERI",
        "PERU",
        "PHOT",
        "PINS",
        "PLIEUX",
        "PREP",
        "PUTI",
        "RANG",
        "REDA",
        "REFIM",
        "REPR",
        "RETIF",
        "SREP",
        "STAT",
        "TECH",
        "TICO",
        "TITR",
        "TOUT",
        "UTIL",
        "VIDEO",
        "WWW",
        "LVID"]
}


module.exports = {
    cleanJoconde,
    getMappingJoconde
}
