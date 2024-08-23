require("dotenv").config();
const mongoose = require("mongoose");
const { simpleSitemapAndIndex } = require("sitemap");
const { parse, formatISO } = require("date-fns");
const { Listr } = require("listr2");
const Observable = require("rxjs").Observable;
const program = require("commander");
const fs = require("fs");

const Merimee = require("../models/merimee");
const Joconde = require("../models/joconde");
const Palissy = require("../models/palissy");
const Memoire = require("../models/memoire");
const Mnr = require("../models/mnr");
const Museo = require("../models/museo");
const Enluminures = require("../models/enluminures");
const { mongoUrl, dbName } = require("../config.js");
const s3 = require("../s3");

const BASE_URL_IMG = "https://pop-perf-assets.s3.gra.io.cloud.ovh.net";
const BASE_SITEMAPS_URL = "https://pop-sitemaps.s3.gra.io.cloud.ovh.net";

function extractUpdateDate(doc) {
  if (doc.get("DMAJ") != null && doc.get("DMAJ") != "") {
    const d = parse(doc.get("DMAJ"), "yyyy-MM-dd", new Date(), {
      weekStartsOn: 1,
    });

    if (!isNaN(d)) {
      return formatISO(d);
    }
  }

  return null;
}

function extractImages(doc) {
  const img = doc.get("IMG");
  if (img != null && Array.isArray(img) && img.length > 0) {
    return img.map((i) => `${BASE_URL_IMG}/${i}`);
  }
  return null;
}

const tasks = new Listr([
  {
    title: "Mongoose connect",
    task: async () => {
      mongoose.set("useCreateIndex", true);
      await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName,
      });
      return;
    },
  },
]);

const noticesClass = {
  joconde: Joconde,
  merimee: Merimee,
  palissy: Palissy,
  memoire: Memoire,
  mnr: Mnr,
  museo: Museo,
  enluminures: Enluminures,
};

async function run() {
  program
    .version("0.1.0")
    .option("-q, --quiet", "Silence mode")
    .option("-u, --upload", "Upload sitemaps to S3")
    .parse(process.argv);

  const opts = program.opts();
  opts.quiet = opts.quiet != null ? Boolean(opts.quiet) : false;

  console.log(`MongoDB : ${mongoUrl}`);

  const ctx = { links: [] };

  tasks.add({
    title: "Processing",
    rendererOptions: { persistentOutput: true, collapseSubstacks: false },
    task: (_ctx, task) => {
      return task.newListr(
        Object.keys(noticesClass).map((collection) => ({
          title: collection,
          task: async (ctx) => {
            const noticeClass = noticesClass[collection];
            return new Observable(async (observer) => {
              {
                const estimatedDocumentCount =
                  await noticeClass.estimatedDocumentCount();

                let counter = 0;
                if (!opts.quiet) {
                  observer.next(
                    `${Math.ceil((counter / estimatedDocumentCount) * 100)}% / ${estimatedDocumentCount}`,
                  );
                } else {
                  observer.next(
                    `Processing: ${estimatedDocumentCount} documents`,
                  );
                }

                const cursor = noticeClass
                  .find()
                  .select("REF IMG DMAJ")
                  .cursor();
                for (
                  let doc = await cursor.next();
                  doc != null;
                  doc = await cursor.next()
                ) {
                  ctx.links.push({
                    url: `https://pop.culture.gouv.fr/notice/${collection}/${doc.get("REF")}`,
                    changefreq: "monthly",
                    priority: 0.7,
                    lastmodISO: extractUpdateDate(doc),
                    img: extractImages(doc),
                  });

                  counter++;

                  if (!opts.quiet && counter % 500 === 0) {
                    observer.next(
                      `${Math.ceil((counter / estimatedDocumentCount) * 100)}% / ${estimatedDocumentCount}`,
                    );
                  }
                }

                observer.complete();
              }
            });
          },
        })),
        { concurrent: false, ctx },
      );
    },
  });

  try {
    await tasks.run();

    await simpleSitemapAndIndex({
      hostname: BASE_SITEMAPS_URL,
      lastmodDateDateOnly: true,
      destinationDir: "./sitemaps",
      sourceData: ctx.links,
    });
  } catch (err) {
    console.error(err);
    await mongoose.connection.close();
  }

  if (opts.upload) {
    console.log("uploading sitemaps");

    try {
      const files = fs.readdirSync("./sitemaps");

      for (const file of files) {
        const data = fs.readFileSync(`./sitemaps/${file}`);
        const params = {
          Bucket: "pop-sitemaps",
          Body: data,
          ContentType: "application/xml",
          ContentEncoding: "gzip",
          ACL: "public-read",
          Metadata: {
            "Cache-Control": "max-age=31536000",
          },
        };

        await new Promise((resolve, reject) => {
          s3.putObject(params, (err) => {
            fs.unlikeSync(file.path);
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log(`uploaded: ${file.path}`);
              resolve();
            }
          });
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  process.exit(0);
}

run();
