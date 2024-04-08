const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { join } = require("path");
const Sentry = require("@sentry/node");

// Load environment variables from ".env" file.
require("dotenv").config();

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	release: `pop-consultation@${require("../../package.json").version}`,
	environment: process.env.NODE_ENV,
});
const dev = process.env.NODE_ENV === "development";
const port = process.env.PORT || 8081;

const app = next({ dev, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer(async (req, res) => {
		const parsedUrl = parse(req.url, true);
		const { pathname, query } = parsedUrl;

		const rootStaticFiles = [
			"/robots.txt",
			"/manifest.json",
			"/favicon.ico",
			"/googleb0e4bedffce14a4a.html",
		];
		const noticeRegex = /^\/notice\/(.*?)\/(.*)$/;
		const museoRegex = /^\/museo\/(.*?)$/;
		const sitemapRegex = /^\/sitemap\/(.*?)$/;
		const galleryRegex = /^\/gallery\/(.*?)$/;
		const searchRegex =
			/^\/(advanced-search|search)\/(list|map|mosaic)(?:\/(.+))?$/;
		let isProdDomain = false;
		if (req.headers.host != null) {
			isProdDomain = req.headers.host.match(/pop\.culture\.gouv\.fr/);
		}

		const isNotSecure =
			req.headers["x-forwarded-proto"] &&
			req.headers["x-forwarded-proto"] === "http";
		const splitUrl = req.url.split("/");

		// Vérifie si un élément est vide dans l'url
		if (splitUrl.indexOf("", 1) > -1) {
			res.statusCode = 404;
			await handle(req, res, parsedUrl);
		} else if (
			isProdDomain &&
			(isNotSecure || !req.headers.host.match(/^www/))
		) {
			res.writeHead(301, {
				Location: `https://www.pop.culture.gouv.fr${req.url}`,
			});
			res.end();
		} else if (pathname.match(sitemapRegex)) {
			const url = req.url.replace("/sitemap/", "");
			res.writeHead(301, {
				Location: `https://s3.eu-west-3.amazonaws.com/pop-sitemap/${url}`,
			});
			res.end();
		} /* else if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
      const path = join(__dirname, "../../static", parsedUrl.pathname);
      app.serveStatic(req, res, path);
    }*/ else if (pathname === "/service-worker.js") {
			const path = join(
				__dirname,
				"../../.next/static",
				parsedUrl.pathname,
			);
			await app.serveStatic(req, res, path);
		} else if (pathname.match(searchRegex)) {
			const renderParams = Object.assign(
				{
					view: pathname.replace(searchRegex, "$2"),
					mode:
						pathname.replace(searchRegex, "$1") === "search"
							? "simple"
							: "advanced",
					base: pathname.replace(searchRegex, "$3"),
				},
				query,
			);
			await app.render(req, res, "/search", renderParams);
		} else if (pathname.match(noticeRegex)) {
			const renderPath = `/notice/${pathname.replace(noticeRegex, "$1")}`;
			const renderParams = Object.assign(
				{ id: pathname.replace(noticeRegex, "$2") },
				query,
			);
			await app.render(req, res, renderPath, renderParams);
		} else if (pathname.match(galleryRegex)) {
			const renderParams = Object.assign(
				{ id: pathname.replace(galleryRegex, "$1") },
				query,
			);
			await app.render(req, res, "/gallery", renderParams);
		} else {
			await handle(req, res, parsedUrl);
		}
	}).listen(port, (err) => {
		if (err) throw err;
		console.log("> Ready on http://localhost:8081");
		console.log(`> API_URL ${process.env.API_URL}`);
	});
});
