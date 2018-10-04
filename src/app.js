const MongoClient = require('mongodb').MongoClient;
const json2csv = require('json2csv').parse;
const fs = require('fs');
const toS3 = require('./s3');
const mongoUrl = process.env.DB_ENDPOINT || 'mongodb://127.0.0.1:27017/pop';

// Export all collections.
async function main() {
  const client = await MongoClient.connect(
    mongoUrl,
    { useNewUrlParser: true }
  );
  const db = await client.db();
  mkStorage();
  await collectionToCsv(db, 'palissy', palissy);
  await collectionToCsv(db, 'merimee', merimee);
  await collectionToCsv(db, 'joconde', joconde);
  await client.close();
}

// Convert collection to CSV and optionally send it to s3.
async function collectionToCsv(db, name, transform) {
  const col = db.collection(name);
  const filename = `storage/${name}.csv`;
  console.log(`File: ${filename}`);
  for (let i = 0, l = 2000, c = await col.countDocuments(); i < c; i += l) {
    console.log(`${i}/${c}`);
    let items = await col
      .find()
      .sort({ _id: 1 })
      .skip(i)
      .limit(l)
      .toArray();

    items = transform(items);
    if (!items.length) {
      continue;
    }

    if (i === 0) {
      fs.writeFileSync(filename, json2csv(items));
    } else {
      fs.appendFileSync(filename, json2csv(items, { header: false }));
    }
  }
  if (process.env.SEND_TO_S3 === 1) {
    toS3(`${name}.csv`, fs.createReadStream(filename));
  }
}

// Create storage dir (temporary).
function mkStorage() {
  try {
    fs.mkdirSync('storage');
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
}

// Remove arrays
function removeArrays(e) {
  return Object.keys(e).map(k => {
    if (Array.isArray(e[k])) {
      e[k] = e[k].join(' ; ');
    }
    return e[k];
  });
}

function merimee(elements) {
  return elements
    .filter(e => e.PRODUCTEUR === 'Monument Historique')
    .map(removeArrays)
    .map(e => ({
      REF: e.REF,
      ETUD: e.ETUD,
      REG: e.REG,
      DEPT: e.DEPT,
      COM: e.COM,
      INSEE: e.INSEE,
      TICO: e.TICO,
      ADRS: e.ADRS,
      STAT: e.STAT,
      AFFE: e.AFFE,
      PPRO: e.PPRO,
      DPRO: e.DPRO,
      AUTR: e.AUTR,
      SCLE: e.SCLE
    }));
}

function palissy(elements) {
  return elements
    .filter(e => e.PRODUCTEUR === 'Monument Historique')
    .map(removeArrays)
    .map(e => ({
      REF: e.REF,
      REG: e.REG,
      DPT: e.DPT,
      COM: e.COM,
      INSEE: e.INSEE,
      EDIF: e.EDIF,
      DENO: e.DENO,
      TICO: e.TICO,
      MATR: e.MATR,
      AUTR: e.AUTR,
      SCLE: e.SCLE,
      DPRO: e.DPRO,
      STAT: e.STAT
    }));
}

function joconde(elements) {
  return elements.map(removeArrays).map(e => ({
    INV: e.INV,
    DOMN: e.DOMN,
    DENO: e.DENO,
    APPL: e.APPL,
    TITR: e.TITR,
    AUTR: e.AUTR,
    PAUT: e.PAUT,
    LIEUX: e.LIEUX,
    PERI: e.PERI,
    MILL: e.MILL,
    PEOC: e.PEOC,
    EPOQ: e.EPOQ,
    UTIL: e.UTIL,
    PERU: e.PERU,
    MILU: e.MILU,
    DIMS: e.DIMS,
    TECH: e.TECH,
    GEOHI: e.GEOHI,
    DECV: e.DECV,
    REPR: e.REPR,
    SREP: e.SREP,
    ONOM: e.ONOM,
    STAT: e.STAT,
    DACQ: e.DACQ,
    DDPT: e.DDPT,
    ADPT: e.ADPT,
    REF: e.REF,
    LOCA: e.LOCA,
    MUSEO: e.MUSEO,
    DMIS: e.DMIS,
    DMAJ: e.DMAJ,
    MUSEO: e.MUSEO,
    LABEL: e.LABEL,
    ECOL: e.ECOL,
    DEPO: e.DEPO
  }));
}

main();
