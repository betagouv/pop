const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { join } = require("path");

const dev = process.env.NODE_ENV !== "production";
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
    if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
      const path = join(__dirname, "../static", parsedUrl.pathname);
      app.serveStatic(req, res, path);
    } else if (pathname.match(noticeRegex)) {
      const renderPath = "/notice/" + pathname.replace(noticeRegex, "$1");
      const renderParams = Object.assign({ id: pathname.replace(noticeRegex, "$2") }, query);
      app.render(req, res, renderPath, renderParams);
    } else if (pathname.match(museoRegex)) {
      const renderPath = "/museo";
      const renderParams = Object.assign({ id: pathname.replace(museoRegex, "$1") }, query);
      app.render(req, res, renderPath, renderParams);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(8081, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:8081");
  });
});
