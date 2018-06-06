
const { extractPoint, extractPolygon } = require('./extract_geoloc');
const { extractIMG, extractEmail, extractArray, extractUrls, extractPOPDate, extractLink, extractAuteurs, } = require('./extract_other');

module.exports = {
    extractIMG,
    extractEmail,
    extractArray,
    extractUrls,
    extractPOPDate,
    extractLink,
    extractAuteurs,
    extractPoint,
    extractPolygon
};

