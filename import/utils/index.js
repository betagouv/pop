
const { extractPoint, extractPolygon } = require('./geoloc');
const { extractIMG, extractEmail, extractArray, extractUrls, extractPOPDate, extractLink, extractAuteurs, } = require('./other');
const { log } = require('./other');


module.exports = {
    extractIMG,
    extractEmail,
    extractArray,
    extractUrls,
    extractPOPDate,
    extractLink,
    extractAuteurs,
    extractPoint,
    extractPolygon,
    log
};

