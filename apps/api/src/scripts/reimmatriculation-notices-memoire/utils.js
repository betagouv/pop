const path = require('path');

const nameFile = 'Reimmatriculation_BFCV2';
const pathFileCsv = path.resolve(__dirname,`csv/${nameFile}.csv`);
const nameFileLog = path.resolve(__dirname,`logs/${nameFile}.log`);
const nameFileS3Log = path.resolve(__dirname,`logs/${nameFile}_s3.log`);

module.exports = { pathFileCsv, nameFileLog, nameFileS3Log };