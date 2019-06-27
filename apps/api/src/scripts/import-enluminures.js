const parse = require("csv-parse/lib/es5/sync");
const fs = require("fs");
const { mongoUrl } = require("../config.js");
const mongoose = require("mongoose");
const Enluminures = require("../models/enluminures");

async function run() {
  mongoose.set("useCreateIndex", true);
  await mongoose.connect(mongoUrl, { useNewUrlParser: true });

  const r = parse(fs.readFileSync("path/to/enlumine-DECOR-valid.csv.utf.csv"), {
    columns: true,
    skip_empty_lines: true,
    delimiter: "|",
    quote: false
  });

  const total = r.length;
  for (let i in r) {
    const e = r[i];
    e.REF = e.REF.trim();
    e.VIDEO =
      e.VIDEO &&
      e.VIDEO.split(";")
        .filter(f => !f.match(/-v\.jpg/))
        .map(f => `http://www2.culture.gouv.fr/Wave/savimage/enlumine${f.trim()}`);
    e.CONTIENT_IMAGE = e.VIDEO && e.VIDEO.length ? "oui" : "non";
    e.NOMENC = e.NOMENC && e.NOMENC.split(";").map(f => f.trim());
    e.POSS = e.POSS && e.POSS.split(";").map(f => f.trim());
    e.BASE = "Enluminures (Enluminures)";
    await Enluminures.findOneAndUpdate({ REF: e.REF }, e, { upsert: true, new: true });
    if (i % 500 === 0) {
      console.log((i / total) * 100 + "%");
    }
  }
  console.log("done");
}

run();
