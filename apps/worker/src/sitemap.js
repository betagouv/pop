require("dotenv").config();

const fs = require("fs");
const sm = require("sitemap");
const ObjectId = require("mongoose").Types.ObjectId;
require("../../api/src/mongo");

const { uploadFile } = require("../../api/src/controllers/utils");

async function run() {
  if (!fs.existsSync(`sitemap`)) {
    fs.mkdirSync(`sitemap`);
  }

  await generateGeneral();
  await generateSiteMapFile("merimee");
  await generateSiteMapFile("palissy");
  await generateSiteMapFile("mnr");
  await generateSiteMapFile("joconde");
  await generateSiteMapFile("memoire");
  await generateSiteMapFile("enluminures");

  const files = fs.readdirSync(`sitemap`);
  const urls = files.map(e => `http://www.pop.culture.gouv.fr/sitemap/${e}`);
  const smi = sm.buildSitemapIndex({
    urls
  });

  fs.writeFileSync(`./sitemap/sitemap.xml`, smi.toString());

  await uploadFiles();
}

setTimeout(() => {
  run();
}, 5000);

function uploadFiles() {
  return new Promise(async (resolve, reject) => {
    try {
      const files = fs.readdirSync(`sitemap`);
      for (let i = 0; i < files.length; i++) {
        await uploadFile(`${files[i]}`, { path: `sitemap/${files[i]}`, mimetype: "application/xml" }, "pop-sitemap");
      }
    } catch (e) {
      console.log("eee", e);
    }
  });
}

function generateGeneral() {
  return new Promise((resolve, reject) => {
    const urls = [];
    urls.push(getURL("http://www.pop.culture.gouv.fr"));
    const sitemap = sm.createSitemap({
      hostname: "http://www.pop.culture.gouv.fr",
      urls
    });
    fs.writeFileSync(`./sitemap/sitemap_general.xml`, sitemap.toString());
    resolve();
  });
}

function generateSiteMapFile(index, chunkSize = 1000) {
  const collection = require(`../../api/src/models/${index}`);

  return new Promise(async (resolve, reject) => {
    let lastId = null;
    let counter = 1;
    let total = 0;
    let notices = [];
    while (true) {
      const tmp = (await collection
        .find(lastId ? { _id: { $gt: new ObjectId(lastId) } } : {})
        .sort({ _id: 1 })
        .limit(chunkSize)).map(e => ({ REF: e.REF, id: e._id }));

      notices = notices.concat(tmp);

      if (!notices.length) {
        resolve();
        return;
      }
      if (tmp.length) {
        lastId = tmp[tmp.length - 1].id;
      }

      total += tmp.length;
      console.log(total + " notices done.");

      if (!tmp.length || notices.length === 50000) {
        const urls = [];
        for (var i = 0; i < notices.length; i++) {
          const url = `/notice/${index}/${notices[i].REF}`;
          urls.push(getURL(url));
        }
        var sitemap = sm.createSitemap({
          hostname: "http://www.pop.culture.gouv.fr",
          urls
        });
        const name = `./sitemap/sitemap_${index}_${counter}.xml`;

        fs.writeFileSync(name, sitemap.toString());
        console.log(`${name} done`);
        counter++;
        console.log(lastId);
        notices = [];
      }
    }
  });
}

function getURL(url) {
  return {
    url,
    changefreq: "monthly",
    priority: 0.7,
    mobile: true
  };
}
