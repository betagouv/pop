const MongoClient = require("mongodb").MongoClient;
const json2csv = require("json2csv").parse;
const fs = require("fs");
const toS3 = require("./s3");
const collections = ["mnr", "joconde", "merimee", "palissy", "memoire"];
const mongoUrl = process.env.DB_ENDPOINT || "mongodb://127.0.0.1:27017/pop";

// Convert collection to CSV and send it to s3.
async function collectionToCsv(db, name, transform) {
  const col = db.collection(name);
  const filename = `storage/${name}.csv`;
  for (let i = 0, l = 2000, c = await col.countDocuments(); i < c; i += l) {
    console.log(`${i}/${c}`);
    let items = await col
      .find()
      .sort({
        _id: 1
      })
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
  // toS3(`${name}.csv`, fs.createReadStream(filename));
}

// Create storage dir (temporary).
function mkStorage() {
  try {
    fs.mkdirSync("storage");
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
}

// Export all collections.
async function main() {
  const client = await MongoClient.connect(
    mongoUrl,
    {
      useNewUrlParser: true
    }
  );
  const db = await client.db();
  mkStorage();
  // await collectionToCsv(db, "palissy", palissy);
  // await collectionToCsv(db, "merimee", merimee);
  await collectionToCsv(db, "joconde", joconde);

  // await Promise.all(collections.map(c => collectionToCsv(db, c)));
  await client.close();
}

function merimee(arr) {
  const filteredArray = arr.filter(e => e.PRODUCTEUR === "Monument Historique");
  const fieldsToKeep = [
    "REF",
    "ETUD",
    "REG",
    "DEPT",
    "COM",
    "INSEE",
    "TICO",
    "ADRS",
    "STAT",
    "AFFE",
    "PPRO",
    "DPRO",
    "AUTR",
    "SCLE"
  ];

  for (let i = 0; i < filteredArray.length; i++) {
    for (let key in filteredArray[i]) {
      if (!fieldsToKeep.includes(key)) {
        delete filteredArray[i][key];
      }
    }
  }

  return filteredArray;
}

function palissy(arr) {
  const filteredArray = arr.filter(e => e.PRODUCTEUR === "Monument Historique");
  const fieldsToKeep = [
    "REF",
    "REG",
    "DPT",
    "COM",
    "INSEE",
    "EDIF",
    "DENO",
    "TICO",
    "MATR",
    "AUTR",
    "SCLE",
    "DPRO",
    "STAT"
  ];

  for (let i = 0; i < filteredArray.length; i++) {
    for (let key in filteredArray[i]) {
      if (!fieldsToKeep.includes(key)) {
        delete filteredArray[i][key];
      }
    }
  }

  return filteredArray;
}

function joconde(arr) {
  const fieldsToKeep = [
    "INV",
    "DOMN",
    "DENO",
    "APPL",
    "TITR",
    "AUTR",
    "PAUT",
    "LIEUX",
    "PERI",
    "MILL",
    "PEOC",
    "EPOQ",
    "UTIL",
    "PERU",
    "MILU",
    "DIMS",
    "TECH",
    "GEOHI",
    "DECV",
    "REPR",
    "SREP",
    "ONOM",
    "STAT",
    "DACQ",
    "DDPT",
    "ADPT",
    "REF",
    "LOCA",
    "MUSEO",
    "DMIS",
    "DMAJ",
    "MUSEO",
    "LABEL"
  ];

  for (let i = 0; i < arr.length; i++) {
    for (let key in arr[i]) {
      if (!fieldsToKeep.includes(key)) {
        delete arr[i][key];
      }
    }
  }

  return arr;
}

main();
