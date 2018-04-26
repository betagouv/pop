const Mongo = require('./mongo');

const Parse = require('./parse');
const Models = require('./models')

let count = 0;

// Parse('./data/joconde-MUSEES-valid.csv', Models.jocondeMUSEES).then(() => {
//   console.log('DONE')
// })

// Parse('./data/memoire-IVR-valid.csv', Models.memoireIVR).then(() => {
//   console.log('DONE')
// })

// Parse('./data/memoire-SAP-valid.csv', Models.memoireSAP).then(() => {
//   console.log('DONE')
// })


Parse('./data/palissy-ETAT-valid.csv', Models.palissyETAT).then(() => {
  console.log('DONE')
})



