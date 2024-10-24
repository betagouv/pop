const express = require("express");
const path = require("path");
const hsts = require("hsts");
const fs = require("fs");

function replaceString(input, replaceBy) {
	console.log(`Replacing ${input} by ${replaceBy}`);

	// Recursively get all files in build directory
	function getAllFiles(dirPath, arrayOfFiles) {
		const files = fs.readdirSync(dirPath);

		arrayOfFiles = arrayOfFiles || [];

		for (const file of files) {
			const filePath = path.join(dirPath, file);
			if (fs.statSync(filePath).isDirectory()) {
				arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
			} else {
				arrayOfFiles.push(filePath);
			}
		}

		return arrayOfFiles;
	}

	// Get all files in build directory
	const files = getAllFiles("./build");

	// Process each file
	for (const filePath of files) {
		const content = fs.readFileSync(filePath, "utf8");

		if (content.includes(input)) {
			const newContent = content.split(input).join(replaceBy);
			fs.writeFileSync(filePath, newContent, "utf8");
		}
	}
}

// Replace all the strings
replaceString("OVERRIDE_API_URL", process.env.API_URL);
replaceString("OVERRIDE_POP_URL", process.env.POP_URL);
replaceString("OVERRIDE_BUCKET_URL", process.env.BUCKET_URL);
replaceString("OVERRIDE_PUBLIC_URL", process.env.PUBLIC_URL);
replaceString("OVERRIDE_SENTRY_DSN", process.env.SENTRY_DSN);
replaceString("OVERRIDE_SENTRY_ENV", process.env.SENTRY_ENV);
replaceString(
	"OVERRIDE_SENTRY_TRACES_SAMPLE_RATE",
	process.env.SENTRY_TRACES_SAMPLE_RATE,
);
replaceString("OVERRIDE_SRC_REF", process.env.SRC_REF);

if (process.env.NODE_ENV === "production") {
	require("dotenv").config();
}

// function setSecurityHeaders(req, res, next) {
//   res.header('Content-Security-Policy', `default-src 'self'; script-src 'self' https://cdn.ravenjs.com https://cdn.amplitude.com 'unsafe-inline' ; style-src 'self' http://cdnjs.cloudflare.com 'unsafe-inline';font-src 'self' http://at.alicdn.com data:; connect-src 'self' ${process.env.API_URL ? process.env.API_URL : "http://localhost:3000"} https://api.pop.culture.gouv.fr https://o1104995.ingest.sentry.io; img-src 'self' *.amazonaws.com data: blob:;`);
//   next();
// }

console.log("START", new Date());

const app = express();
app.set("trust proxy", true);
const port = 8081;

// app.use(setSecurityHeaders);
app.disable("x-powered-by");

app.use(hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
app.use(express.static(path.join(__dirname, "/../../build")));
app.route("*").all((req, res) => {
	res.sendFile(path.join(__dirname, "/../../build/index.html"));
});
app.listen(port, () => {
	console.log(`App listening at port:${port}`);
});
