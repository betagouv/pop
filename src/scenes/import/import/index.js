
const { cleanMerimee, getMappingMerimee } = require('./merimee');
const { cleanJoconde, getMappingJoconde } = require('./joconde');
const { cleanMnr, getMappingMnr } = require('./mnr');
const { cleanPalissy, getMappingPalissy } = require('./palissy');

function getMapping(collection) {
  switch (collection) {
    case 'merimee': return getMappingMerimee();
    case 'joconde': return getMappingJoconde();
    case 'palissy': return getMappingPalissy();
    case 'mnr': return getMappingMnr();
    default: [];
  }
}


function clean(collection, obj) {
  switch (collection) {
    case 'merimee': return cleanMerimee(obj);
    case 'joconde': return cleanJoconde(obj);
    case 'palissy': return cleanPalissy(obj);
    case 'mnr': return cleanMnr(obj);
    default: [];
  }
}


module.exports = {
  clean,
  getMapping
}