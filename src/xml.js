const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const mongoUrl = process.env.DB_ENDPOINT || "mongodb://127.0.0.1:27017/pop";
const { mkStorage } = require("./lib.js");
const js2xmlparser = require("js2xmlparser");
const iconv = require("iconv-lite");

const LIMIT = 1000;

async function main() {
  const client = await MongoClient.connect(
    mongoUrl,
    { useNewUrlParser: true }
  );
  const db = await client.db();
  mkStorage();
  await collectionToXml(db, "joconde", joconde);
  await collectionToXml(db, "palissy", palissy);
  await client.close();
}

async function collectionToXml(db, name, transform) {
  const col = db.collection(name);
  const filename = `storage/${name}.xml`;
  console.log(`File: ${filename}`);
  transform(
    filename,
    await col
      .find()
      .sort({ _id: 1 })
      .limit(LIMIT)
      .toArray()
  );
}

function joconde(filename, elements) {
  fs.writeFileSync(
    filename,
    js2xmlparser.parse(
      "csv_data",
      {
        row: elements.map(e => ({
          REF: e.REF,
          INV: e.INV,
          DOMN: e.DOMN,
          DENO: e.DENO,
          TITR: e.TITR,
          AUTR: e.AUTR,
          PERI: e.PERI,
          EPOQ: e.EPOQ,
          TECH: e.TECH,
          DIMS: e.DIMS,
          DECV: e.DECV,
          STAT: e.STAT,
          LOCA: e.LOCA,
          COPY: e.COPY
        }))
      },
      { declaration: { encoding: "UTF-8" } }
    ) + "\n"
  );
  return;
}

function palissy(filename, elements) {
  fs.writeFileSync(
    filename + ".xml",
    iconv.encode(
      "<?xml version='1.0' encoding='iso-8859-1' standalone='yes'?><doc>pépé</doc>",
      "ISO-8859-1"
    )
  );
  fs.writeFileSync(
    filename,
    iconv.encode(
      js2xmlparser.parse(
        "BASE",
        {
          NAME: "Palissy",
          DOMAINE: "INV",
          NOTICES: [
            elements.map(e => ({
              "@": {
                ID: e.REF
              },
              ...Object.assign(
                ...Object.entries(e)
                  .filter(([k, v]) => {
                    return ![
                      "_id",
                      "__v",
                      "PRODUCTEUR",
                      "CONTIENT_IMAGE",
                      "POP_COORDONNEES",
                      "POP_CONTIENT_GEOLOCALISATION",
                      "POP_COORDINATES_POLYGON",
                      "BASE",
                      "MEMOIRE",
                      "POP_IMPORT"
                    ].includes(k);
                  })
                  .map(([k, v]) => {
                    return {
                      [k]: Array.isArray(v) ? v.join(" ; ") : v
                    };
                  })
              )
            }))
          ]
        },
        {
          declaration: { encoding: "iso-8859-1", standalone: "yes" },
          cdataKeys: Object.keys(elements[0])
        }
      ) + "\n",
      "ISO-8859-1"
    )
  );
  return;
}

main();
