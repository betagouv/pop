const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const mongoUrl = process.env.DB_ENDPOINT || "mongodb://127.0.0.1:27017/pop";
const { mkStorage } = require("./lib.js");
const js2xmlparser = require("js2xmlparser");

async function main() {
  const client = await MongoClient.connect(
    mongoUrl,
    { useNewUrlParser: true }
  );
  const db = await client.db();
  mkStorage();
  const name = "joconde";
  const col = db.collection(name);
  const filename = `storage/${name}.xml`;
  console.log(`File: ${filename}`);
  const items = transform(
    await col
      .find()
      .sort({ _id: 1 })
      .limit(100)
      .toArray()
  );
  fs.writeFileSync(
    filename,
    js2xmlparser.parse(
      "csv_data",
      { row: items },
      { declaration: { encoding: "UTF-8" } }
    ) + "\n"
  );
  await client.close();
}

function transform(elements) {
  return elements.map(e => ({
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
  }));
}

main();
