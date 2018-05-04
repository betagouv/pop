const Mongo = require('../src/mongo');

const Parse = require('./parsing');
const Models = require('../src/models')


const arr = [];
arr.push({ file: './data/joconde-MUSEES-valid.csv', model: Models.joconde });
arr.push({ file: './data/memoire-ARCHEO-valid.csv', model: Models.memoire });
arr.push({ file: './data/memoire-CAOA-valid.csv', model: Models.memoire });
arr.push({ file: './data/memoire-CRMH-valid.csv', model: Models.memoire });
arr.push({ file: './data/memoire-IVR-valid.csv', model: Models.memoire });
arr.push({ file: './data/memoire-SAP-valid.csv', model: Models.memoire });
arr.push({ file: './data/memoire-SDAP-valid.csv', model: Models.memoire });
arr.push({ file: './data/merimee-ETAT-valid.csv', model: Models.merimee });
arr.push({ file: './data/merimee-INV-valid.csv', model: Models.merimee });
arr.push({ file: './data/merimee-MH-valid.csv', model: Models.merimee });
arr.push({ file: './data/mnrbis-DMF-valid.csv', model: Models.mnr });
arr.push({ file: './data/palissy-ETAT-valid.csv', model: Models.palissy });
arr.push({ file: './data/palissy-INV-valid.csv', model: Models.palissy });
arr.push({ file: './data/palissy-MH-valid.csv', model: Models.palissy });

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