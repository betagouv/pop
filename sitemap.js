const fs = require("fs");
const sm = require("sitemap");

async function run() {
  await generateGeneral();
  // await generateSiteMapFile("merimee");
  // await generateSiteMapFile("palissy");
  // await generateSiteMapFile("mnr");
  await generateSiteMapFile("joconde");
  // await generateSiteMapFile("memoire");

  const files = fs.readdirSync(`sitemap`);
  const urls = files.map(e => `http://pop.culture.gouv.fr/${e}`);
  const smi = sm.buildSitemapIndex({
    urls
  });

  fs.writeFileSync(`./sitemap/sitemap.xml`, smi.toString());
}

run();

function generateGeneral() {
  return new Promise((resolve, reject) => {
    let urls = [];
    urls.push(getURL("pop.culture.gouv.fr"));
    var sitemap = sm.createSitemap({
      hostname: "http://pop.culture.gouv.fr",
      urls
    });
    fs.writeFileSync(`./sitemap/sitemap_general.xml`, sitemap.toString());
    resolve();
  });
}

function getAll(index) {
  let offset = 0;
  let tag = true;
  const limit = 1000;
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
    let count = 0;
    let urls = [];
    const refs = await getAll(index);

    for (var i = 0; i < refs.length; i++) {
      const url = `/notice/${index}/${refs[i]}`;
      urls.push(getURL(url));

      if (urls.length === 50000 || i === refs.length - 1) {
        var sitemap = sm.createSitemap({
          hostname: "http://pop.culture.gouv.fr",
          urls
        });
        const name = `./sitemap/sitemap_${index}_${count++}.xml`;
        urls = [];
        console.log("WRITE ", name);
        fs.writeFileSync(name, sitemap.toString());
      }
    }

    resolve();
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
