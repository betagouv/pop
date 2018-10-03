const fs = require("fs");
const sm = require("sitemap");

async function run() {
  const urls = [];
  //Home page
  urls.push(getURL("pop.culture.gouv.fr"));

  //// MERIMEE
  const refs = await getAll("merimee");
  for (var i = 0; i < refs.length; i++) {
    const url = `/notice/merimee/${refs[i]}`;
    urls.push(getURL(url));
  }
  console.log("DDD",urls)
  var sitemap = sm.createSitemap({hostname: 'http://pop.culture.gouv.fr', urls });
  fs.writeFileSync("./src/assets/sitemap.xml", sitemap.toString());
  //   fs.writeFileSync("./build/sitemap.xml", sitemap.toString());
}

run();

function getAll(index) {
  let offset = 0;
  let tag = true;
  const limit = 100;
  return new Promise(async (resolve, reject) => {
    const objs = [];
    while (tag) {
      let data = await getContent(
        `http://localhost:3000/${index}?offset=${offset}&limit=${limit}`
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
