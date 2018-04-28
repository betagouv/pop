const palissyMH = require('./palissyMH');
const palissyINV = require('./palissyINV');
const palissyETAT = require('./palissyETAT');
const mnrDMF = require('./mnrDMF');
const merimeeMH = require('./merimeeMH');
const merimeeINV = require('./merimeeINV');
const merimeeETAT = require('./merimeeETAT');
const memoireSDAP = require('./memoireSDAP');
const memoireSAP = require('./memoireSAP');
const memoireIVR = require('./memoireIVR');
const memoireCRMH = require('./memoireCRMH');
const memoireCAOA = require('./memoireCAOA');
const memoireARCHEO = require('./memoireARCHEO');
const jocondeMUSEES = require('./jocondeMUSEES');

const get = (collection) => {
    switch (collection) {
        case "palissyMH": return palissyMH;
        case "palissyINV": return palissyINV;
        case "palissyETAT": return palissyETAT;
        case "mnrDMF": return mnrDMF;
        case "merimeeMH": return merimeeMH;
        case "merimeeINV": return merimeeINV;
        case "merimeeETAT": return merimeeETAT;
        case "memoireSDAP": return memoireSDAP;
        case "memoireSAP": return memoireSAP;
        case "memoireIVR": return memoireIVR;
        case "memoireCRMH": return memoireCRMH;
        case "memoireCAOA": return memoireCAOA;
        case "memoireARCHEO": return memoireARCHEO;
        case "jocondeMUSEES": return jocondeMUSEES;
        default: return null;
    }
}


module.exports = {
    palissyMH,
    palissyINV,
    palissyETAT,
    mnrDMF,
    merimeeMH,
    merimeeINV,
    merimeeETAT,
    memoireSDAP,
    memoireSAP,
    memoireIVR,
    memoireCRMH,
    memoireCAOA,
    memoireARCHEO,
    jocondeMUSEES,
    get
};