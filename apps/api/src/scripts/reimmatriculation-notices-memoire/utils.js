const path = require('path');

const nameFile = 'Reimmatriculation-dernierlot2';
const pathFileCsv = path.resolve(__dirname,`csv/${nameFile}.csv`);
const nameFileLog = path.resolve(__dirname,`logs/${nameFile}.log`);
const nameFileS3Log = path.resolve(__dirname,`logs/${nameFile}_s3.log`);
const validationLog = path.resolve(__dirname,`logs/validationLog.log`);

module.exports = { pathFileCsv, nameFileLog, nameFileS3Log,  validationLog};