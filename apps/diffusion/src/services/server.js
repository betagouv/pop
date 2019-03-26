const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { join } = require("path");
const Sentry = require("@sentry/node");

Sentry.init({ dsn: "https://9cca185065d74dbd9e05987036f2d16d@sentry.data.gouv.fr/21" });
const dev = process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "staging";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    const rootStaticFiles = [
      "/robots.txt",
      "/manifest.json",
      "/favicon.ico",
      "/googleb0e4bedffce14a4a.html"
    ];
    const noticeRegex = /^\/notice\/(.*?)\/(.*)$/;
    const museoRegex = /^\/museo\/(.*?)$/;
    const sitemapRegex = /^\/sitemap\/(.*?)$/;
    const galleryRegex = /^\/gallery\/(.*?)$/;
    const searchRegex = /^\/(advanced-search|search)\/(list|map|mosaic)(?:\/(.+))?$/;
    const isProdDomain = req.headers.host.match(/pop\.culture\.gouv\.fr/);
    const isNotSecure =
      req.headers["x-forwarded-proto"] && req.headers["x-forwarded-proto"] === "http";

    if (isProdDomain && (isNotSecure || !req.headers.host.match(/^www/))) {
      res.writeHead(301, { Location: `https://www.pop.culture.gouv.fr${req.url}` });
      res.end();
    } else if (pathname.match(sitemapRegex)) {
      const url = req.url.replace("/sitemap/", "");
      res.writeHead(301, { Location: `https://s3.eu-west-3.amazonaws.com/pop-sitemap/${url}` });
      res.end();
    } else if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
      const path = join(__dirname, "../../static", parsedUrl.pathname);
      app.serveStatic(req, res, path);
    } else if (pathname === "/service-worker.js") {
      const path = join(__dirname, "../../.next", parsedUrl.pathname);
      app.serveStatic(req, res, path);
    } else if (pathname.match(searchRegex)) {
      const renderParams = Object.assign(
        {
          view: pathname.replace(searchRegex, "$2"),
          mode: pathname.replace(searchRegex, "$1") === "search" ? "simple" : "advanced",
          base: pathname.replace(searchRegex, "$3")
        },
        query
      );
      app.render(req, res, "/search", renderParams);
    } else if (pathname.match(noticeRegex)) {
      const renderPath = "/notice/" + pathname.replace(noticeRegex, "$1");
      const renderParams = Object.assign({ id: pathname.replace(noticeRegex, "$2") }, query);
      app.render(req, res, renderPath, renderParams);
    } else if (pathname.match(museoRegex)) {
      const renderParams = Object.assign({ id: pathname.replace(museoRegex, "$1") }, query);
      app.render(req, res, "/museo", renderParams);
    } else if (pathname.match(galleryRegex)) {
      console.log("POODSODKSOK");
      const renderParams = Object.assign({ id: pathname.replace(galleryRegex, "$1") }, query);
      app.render(req, res, "/gallery", renderParams);
      /*
      const id = pathname.replace(museoRegex, "$1");
      let params = {}
      try {
        const result = (async () => {
          fetch(url)
        })
        const gallery = (async () => await API.getGallery(id))();
        params = gallery.params;
      } catch(e) {}
      const renderParams = Object.assign({
        view: "simple",
        mode: "mosaic",
        ...params
      }, query);
      app.render(req, res, "/gallery", renderParams);
      */
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(8081, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:8081");
  });
});
