const fs = require("fs");
const sm = require("sitemap");

async function run() {
  await generateHeader();
  // await generateSiteMapFile("merimee");
  // await generateSiteMapFile("palissy");
  // await generateSiteMapFile("mnr");
  generateSiteMapFile("joconde");
  await generateSiteMapFile("memoire");

  const smi = sm.buildSitemapIndex({
    urls: [
      "http://pop.culture.gouv.fr/sitemap_general.xml",
      "http://pop.culture.gouv.fr/sitemap_merimee.xml",
      "http://pop.culture.gouv.fr/sitemap_mnr.xml",
      "http://pop.culture.gouv.fr/sitemap_palissy.xml",
      "http://pop.culture.gouv.fr/sitemap_memoire.xml",
      "http://pop.culture.gouv.fr/sitemap_joconde.xml"
    ]
  });

  fs.writeFileSync(`./src/server/sitemap/sitemap.xml`, smi.toString());
}

run();

function generateHeader() {
  return new Promise((resolve, reject) => {
    let urls = [];
    urls.push(getURL("pop.culture.gouv.fr"));
    var sitemap = sm.createSitemap({
      hostname: "http://pop.culture.gouv.fr",
      urls
    });
    fs.writeFileSync(
      `./sitemap/sitemap_general.xml`,
      sitemap.toString()
    );
    resolve();
  });
}

function getAll(index) {
  let offset = 0;
  let tag = true;
  const limit = 100;
  return new Promise(async (resolve, reject) => {
    const objs = [];
    while (tag) {
      let data = await getContent(
        `http://api.pop.culture.gouv.fr/${index}?offset=${offset}&limit=${limit}`
      );
      console.log(index, offset);
      offset += limit;
      const refs = data.map(e => e.REF);
      objs.push(...refs);
      if (!data.length) {
        tag = false;
      }
    }
    resolve(objs);
  });
}

async function generateSiteMapFile(index) {
  return new Promise(async (resolve, reject) => {
    const urls = [];
    const refs = await getAll(index);
    for (var i = 0; i < refs.length; i++) {
      const url = `/notice/${index}/${refs[i]}`;
      urls.push(getURL(url));
    }
    var sitemap = sm.createSitemap({
      hostname: "http://pop.culture.gouv.fr",
      urls
    });
    fs.writeFileSync(
      `./src/server/sitemap/sitemap_${index}.xml`,
      sitemap.toString()
    );
  });
}

function getURL(url) {
  return {
    url,
    changefreq: "weekly",
    priority: 0.7,
    mobile: true
  };
}

function getContent(url) {
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith("https") ? require("https") : require("http");
    const request = lib.get(url, response => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error("Failed to load page, status code: " + response.statusCode)
        );
      }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on("data", chunk => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on("end", () => resolve(JSON.parse(body.join(""))));
    });
    // handle connection errors of the request
    request.on("error", err => reject(err));
  });
}
