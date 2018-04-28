// const Mongo = require('../src/mongo');

const Parse = require('./import_parse');
const Models = require('../src/models')


const arr = [];
arr.push({ file: './data/joconde-MUSEES-valid.csv', model: Models.jocondeMUSEES });
arr.push({ file: './data/memoire-ARCHEO-valid.csv', model: Models.memoireARCHEO });
arr.push({ file: './data/memoire-CAOA-valid.csv', model: Models.memoireCAOA });
arr.push({ file: './data/memoire-CRMH-valid.csv', model: Models.memoireCRMH });
arr.push({ file: './data/memoire-IVR-valid.csv', model: Models.memoireIVR });
arr.push({ file: './data/memoire-SAP-valid.csv', model: Models.memoireSAP });
arr.push({ file: './data/memoire-SDAP-valid.csv', model: Models.memoireSDAP });
arr.push({ file: './data/merimee-ETAT-valid.csv', model: Models.merimeeETAT });
arr.push({ file: './data/merimee-INV-valid.csv', model: Models.merimeeINV });
arr.push({ file: './data/merimee-MH-valid.csv', model: Models.merimeeMH });
arr.push({ file: './data/mnrbis-DMF-valid.csv', model: Models.mnrDMF });
arr.push({ file: './data/palissy-ETAT-valid.csv', model: Models.palissyETAT });
arr.push({ file: './data/palissy-INV-valid.csv', model: Models.palissyINV });
arr.push({ file: './data/palissy-MH-valid.csv', model: Models.palissyMH });


const start = Date.now()
async function run() {
  for (var i = 0; i < arr.length; i++) {
    await (Parse(arr[i].file, arr[i].model))
  }
  console.log('DONE in ', (Date.now() - start) / 1000, ' seconds')
}

setTimeout(() => {
  run();
}, 5000)