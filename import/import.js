const Mongo = require('../src/mongo');

const Parse = require('./parsing');
const Models = require('../src/models')


const arr = [];
// arr.push({ file: './data/joconde-MUSEES-valid.csv', model: Models.joconde });
// arr.push({ file: './data/memoire-ARCHEO-valid.csv', model: Models.memoire });
// arr.push({ file: './data/memoire-CAOA-valid.csv', model: Models.memoire });
// arr.push({ file: './data/memoire-CRMH-valid.csv', model: Models.memoire });
// arr.push({ file: './data/memoire-IVR-valid.csv', model: Models.memoire });
// arr.push({ file: './data/memoire-SAP-valid.csv', model: Models.memoire });
// arr.push({ file: './data/memoire-SDAP-valid.csv', model: Models.memoire });
arr.push({ file: './data/merimee-ETAT-valid.csv', model: Models.merimee, domaine: 'ETAT' });
arr.push({ file: './data/merimee-INV-valid.csv', model: Models.merimee, domaine: 'INV' });
arr.push({ file: './data/merimee-MH-valid.csv', model: Models.merimee, domaine: 'MH' });
// arr.push({ file: './data/mnrbis-DMF-valid.csv', model: Models.mnr });
// arr.push({ file: './data/palissy-ETAT-valid.csv', model: Models.palissy });
// arr.push({ file: './data/palissy-INV-valid.csv', model: Models.palissy });
// arr.push({ file: './data/palissy-MH-valid.csv', model: Models.palissy });



function runMongo() {
  return new Promise(async (resolve, reject) => {
    for (var i = 0; i < arr.length; i++) {
      await (Parse(arr[i].file, arr[i].model, arr[i].domaine))
    }
    resolve();
  })
}


function runElastic() {
  return new Promise((resolve, reject) => {
    var stream = Models.merimee.synchronize()
    stream.on('data', function (err, doc) {
      count++;
    });
    stream.on('close', function () {
      console.log('indexed ' + count + ' documents!');
      resolve();
    });
    stream.on('error', function (err) {
      console.log(err);
    });
  })
}


setTimeout(async () => {
  const start = Date.now()
  await (runMongo());
  console.log('Done in ', (Date.now() - start) / 1000, ' seconds')
}, 10000)