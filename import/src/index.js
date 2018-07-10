const Mongo = require('../../src/mongo');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

const importMerimee = require('./import_merimee');
const importJoconde = require('./import_joconde');
const importMNR = require('./import_mnr');
const importPalissy = require('./import_palissy');
const importMemoire = require('./import_memoire');
const importThesaurus = require('./import_thesaurus');

async function run() {
  // await importMerimee();
  console.log('END')
  await importMNR();
  console.log('END')
  //await importJoconde();
  console.log('END')
  // await importMemoire();
  console.log('END')
  // await importPalissy();
  console.log('END')

  // await importThesaurus();
}

run();
// importPalissy().then(() => {
//   console.log('END')


// })

// importMNR().then(() => {
//   console.log('END')
// })

// importMerimee().then(() => {
//   console.log('END')
// })

// importJoconde().then(() => {
//   console.log('END')
// })


// const Parse = require('./parsing');
// const Models = require('../src/models')



// const arr = [];
// // arr.push({ file: './data/joconde-MUSEES-valid.csv', model: Models.joconde });
// // arr.push({ file: './data/memoire-ARCHEO-valid.csv', model: Models.memoire });
// // arr.push({ file: './data/memoire-CAOA-valid.csv', model: Models.memoire });
// // arr.push({ file: './data/memoire-CRMH-valid.csv', model: Models.memoire });
// // arr.push({ file: './data/memoire-IVR-valid.csv', model: Models.memoire });
// // arr.push({ file: './data/memoire-SAP-valid.csv', model: Models.memoire });
// // arr.push({ file: './data/memoire-SDAP-valid.csv', model: Models.memoire });
// // arr.push({ file: './data/merimee-ETAT-valid.csv', model: Models.merimee, domaine: 'ETAT' });
// // arr.push({ file: './data/merimee-INV-valid.csv', model: Models.merimee, domaine: 'INV' });
// // arr.push({ file: './data/merimee-MH-valid.csv', model: Models.merimee, domaine: 'MH' });
// // arr.push({ file: './data/mnrbis-DMF-valid.csv', model: Models.mnr });
// arr.push({ file: './data/mnrbis-DMF-valid.1.csv', model: Models.mnr });
// // arr.push({ file: './data/palissy-ETAT-valid.csv', model: Models.palissy });
// // arr.push({ file: './data/palissy-INV-valid.csv', model: Models.palissy });
// // arr.push({ file: './data/palissy-MH-valid.csv', model: Models.palissy });

