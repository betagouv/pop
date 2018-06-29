const utils = require('./utils')

function cleanMerimee(obj) {
    const errors = [];

    obj.IMG = utils.extractIMG(obj.IMG, errors);

    obj.CONTACT = utils.extractEmail(obj.CONTACT, errors);
    obj.DENO = utils.extractArray(obj.DENO, /[,;]/, errors);
    obj.TYPO = utils.extractArray(obj.TYPO, /[,;]/, errors);
    obj.TECH = utils.extractArray(obj.TECH, /[,;]/, errors);
    obj.STAT = utils.extractArray(obj.STAT, /[,;]/, errors);
    obj.SCLE = utils.extractArray(obj.SCLE, /[,;]/, errors);
    // obj.SCLX = utils.extractArray(obj.SCLX, /[,;]/, errors);
    obj.SCLD = utils.extractArray(obj.SCLD, /[,;]/, errors);
    obj.AUTR = utils.extractAuteurs(obj.AUTR, errors);
    obj.AUTP = utils.extractArray(obj.AUTP, /[,;]/, errors);
    obj.NOMS = utils.extractArray(obj.NOMS, /[,;]/, errors);

    obj.PARN = utils.extractArray(obj.PARN, /[,;]/, errors);
    obj.PART = utils.extractArray(obj.PART, /[,;]/, errors);
    obj.MHPP = utils.extractArray(obj.MHPP, /[,;]/, errors);

    obj.REPR = utils.extractArray(obj.REPR, /[,;]/, errors);
    obj.COUV = utils.extractArray(obj.COUV, /[,;]/, errors);
    obj.MURS = utils.extractArray(obj.MURS, /[,;]/, errors);
    obj.ESCA = utils.extractArray(obj.ESCA, /[,;]/, errors);
    obj.PREP = utils.extractArray(obj.PREP, /[,;]/, errors);
    obj.TOIT = utils.extractArray(obj.TOIT, /[,;]/, errors);
    // obj.LOCA = utils.extractArray(obj.LOCA, /[,;]/, errors);
    obj.JDAT = utils.extractArray(obj.JDAT, /[,;]/, errors);
    obj.JATT = utils.extractArray(obj.JATT, /[,;]/, errors);
    // obj.DOMN = utils.extractArray(obj.DOMN, /[,;]/, errors);
    obj.DATE = utils.extractArray(obj.DATE, /[,;]/, errors);

    obj.COLL = utils.extractArray(obj.COLL, /[,;]/, errors);
    obj.CADA = utils.extractArray(obj.CADA, /[,;]/, errors);
    obj.APRO = utils.extractArray(obj.APRO, /[,;]/, errors);
    obj.VOUT = utils.extractArray(obj.VOUT, /[,;]/, errors);
    obj.VISI = utils.extractArray(obj.VISI, /[,;]/, errors);
    obj.PERS = utils.extractArray(obj.PERS, /[,;]/, errors);
    obj.INTE = utils.extractArray(obj.INTE, /[,;]/, errors);
    obj.ENER = utils.extractArray(obj.ENER, /[,;]/, errors);
    obj.ELEV = utils.extractArray(obj.ELEV, /[,;]/, errors);
    obj.ETAG = utils.extractArray(obj.ETAG, /[,;]/, errors);
    obj.IMPL = utils.extractArray(obj.IMPL, /[,;]/, errors);
    obj.PROT = utils.extractArray(obj.PROT, /[,;]/, errors);

    obj.ETUD = utils.extractArray(obj.ETUD, /[,;]/, errors);
    obj.COPY = utils.extractArray(obj.COPY, /[,;]/, errors);

    // obj.DMIS = ('' + obj.DMIS).replace('/', '-', errors);
    // obj.DMAJ = ('' + obj.DMAJ).replace('/', '-', errors);

    //liens
    obj.REFE = utils.extractLink(obj.REFE, errors);
    obj.REFO = utils.extractLink(obj.REFO, errors);
    obj.REFP = utils.extractLink(obj.REFP, errors);
    obj.RENV = utils.extractLink(obj.RENV, errors);
    obj.WRENV = utils.extractLink(obj.WRENV, errors);

    // obj.POP_HAS_LOCATION = obj.POP_COORDINATES_POINT || obj.POP_COORDINATES_POLYGON ? "oui" : "non"
    // obj.POP_HAS_IMAGE = obj.IMG ? "oui" : "non"

    obj.LIENS = utils.extractUrls(obj.LIENS, errors);

    // switch (obj.REF.substring(0, 2)) {
    //     case "IA": obj.POP_DOMAINE = 'Inventaire'; break;
    //     case "PA": obj.POP_DOMAINE = 'Monument Historique'; break;
    //     case "EA": obj.POP_DOMAINE = 'Architecture'; break;
    //     default: obj.POP_DOMAINE = 'NULL'; break;
    // }
    return { notice: obj, errors };
}


function getMappingMerimee() {
    return ["REF",
        "TOUT",
        "ACTU",
        "ADRS",
        "AFFE",
        "AIRE",
        "APRO",
        "ARCHEO",
        "AUTP",
        "AUTR",
        "CADA",
        "CANT",
        "COLL",
        "COM",
        "COOR",
        "COORM",
        "COPY",
        "COUV",
        "DATE",
        "DBOR",
        "DENO",
        "DENQ",
        "DEPL",
        "DESC",
        "DIMS",
        "DOSS",
        "DPRO",
        "DPT",
        "EDIF",
        "ELEV",
        "ENER",
        "ESCA",
        "ETAG",
        "ETAT",
        "ETUD",
        "GENR",
        "HIST",
        "HYDR",
        "IMPL",
        "INSEE",
        "INTE",
        "JATT",
        "JDAT",
        "LBASE2",
        "LIEU",
        "MFICH",
        "MOSA",
        "MHPP",
        "MICR",
        "MURS",
        "NBOR",
        "NOMS",
        "OBS",
        "PAFF",
        "PART",
        "PARN",
        "PDEN",
        "PERS",
        "PLAN",
        "PLOC",
        "PPRO",
        "PREP",
        "PROT",
        "PSTA",
        "REFE",
        "REFO",
        "REFP",
        "REG",
        "REMA",
        "REMP",
        "RENV",
        "REPR",
        "RFPA",
        "SCLD",
        "SCLE",
        "SITE",
        "STAT",
        "TECH",
        "TICO",
        "TOIT",
        "TYPO",
        "VERT",
        "REFIM",
        "IMG",
        "VIDEO",
        "DOSURL",
        "DOSURLP",
        "DOSADRS",
        "LIENS",
        "IMAGE",
        "VISI",
        "VOCA",
        "VOUT",
        "WEB",
        "ZONE",
        "THEM",
        "ACMH",
        "ACURL",
        "WADRS",
        "WCOM",
        "WRENV",
        "REFM",
        "CONTACT",
        "IDAGR",
        "LMDP",
        "PINT",
        "DLAB",
        "APPL"]

}


module.exports = {
    cleanMerimee,
    getMappingMerimee
}
