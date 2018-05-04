const palissy = require('./palissy');
const mnr = require('./mnr');
const merimee = require('./merimee');
const memoire = require('./memoire');
const joconde = require('./joconde');

const get = (collection) => {
    switch (collection) {
        case "palissy": return palissy;
        case "mnr": return mnr;
        case "merimee": return merimee;
        case "memoire": return memoire;
        case "joconde": return joconde;
        default: return null;
    }
}


module.exports = {
    palissy,
    mnr,
    merimee,
    memoire,
    joconde,
    get
};