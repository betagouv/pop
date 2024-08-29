require("dotenv").config();
const mongoose = require("mongoose");
const { SitemapStream, SitemapAndIndexStream } = require("sitemap");
const { finished } = require("stream");
const { parse, formatISO } = require("date-fns");
const { Listr } = require("listr2");
const Observable = require("rxjs").Observable;
const program = require("commander");
const fs = require("fs");
const { createGzip } = require("zlib");
const { resolve } = require("path");
const { promisify } = require("util");

const Merimee = require("../models/merimee");
const Joconde = require("../models/joconde");
const Palissy = require("../models/palissy");
const Memoire = require("../models/memoire");
const Mnr = require("../models/mnr");
const Enluminures = require("../models/enluminures");
const { mongoUrl, dbName } = require("../config.js");
const s3 = require("../s3");

const BASE_URL_IMG = "https://pop-perf-assets.s3.gra.io.cloud.ovh.net";
const BASE_SITEMAPS_URL = "https://pop-sitemaps.s3.gra.io.cloud.ovh.net";
const SITEMAPS_BUCKET = process.env.SITEMAPS_BUCKET ?? "pop-dev-sitemaps";

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
	enluminures: Enluminures,
};

async function run() {
	program
		.version("0.1.0")
		.option("-q, --quiet", "Silence mode")
		.option("-u, --upload", "Upload sitemaps to S3")
		.parse(process.argv);

	const opts = program.opts();
	opts.quiet = opts.quiet != null;
	opts.upload = opts.upload != null;

	console.log(`MongoDB : ${mongoUrl}`);

	const ctx = { links: [] };

	fs.mkdirSync("./sitemaps", { recursive: true });

	const smsStream = new SitemapAndIndexStream({
		getSitemapStream: (i) => {
			const sitemapStream = new SitemapStream({
				hostname: BASE_SITEMAPS_URL,
				lastmodDateOnly: true,
			});
			const path = `./sitemaps/sitemap-${i}.xml`;

			const ws = fs.createWriteStream(resolve(path + ".gz"));
			sitemapStream
				.pipe(createGzip()) // compress the output of the sitemap
				.pipe(ws); // write it to sitemap-NUMBER.xml

			return [
				new URL(`sitemap-${i}.xml`, BASE_SITEMAPS_URL).toString(),
				sitemapStream,
				ws,
			];
		},
	});
	smsStream.pipe(createGzip());

	const sitemapFile = fs.createWriteStream(
		resolve("./sitemaps/sitemap-index.xml"),
	);

	smsStream.pipe(sitemapFile);

	tasks.add({
		title: "Processing",
		rendererOptions: { persistentOutput: true, collapseSubstacks: false },
		task: (_ctx, task) => {
			return task.newListr(
				Object.keys(noticesClass).map((collection) => ({
					title: collection,
					task: async () => {
						const noticeClass = noticesClass[collection];
						return new Observable(async (observer) => {
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
								smsStream.write({
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
						});
					},
				})),
				{ concurrent: false, ctx },
			);
		},
	});

	try {
		await tasks.run();
		smsStream.end();
		await promisify(finished)(sitemapFile);
	} catch (err) {
		console.error(err);
		await mongoose.connection.close();
	}

	if (opts.upload) {
		console.log("uploading sitemaps");

		try {
			const files = fs
				.readdirSync("./sitemaps")
				.filter((f) => f.includes(".xml"));

			for (const file of files) {
				const data = fs.readFileSync(`./sitemaps/${file}`);
				const params = {
					Bucket: SITEMAPS_BUCKET,
					Key: file,
					Body: data,
					ContentType: "application/xml",
					ContentEncoding: file.includes("index")
						? undefined
						: "gzip",
					ACL: "public-read",
					Metadata: {
						"Cache-Control": "max-age=31536000",
					},
				};

				console.log(`uploading: ${file}`);
				await new Promise((resolve, reject) => {
					s3.putObject(params, (err) => {
						fs.unlinkSync("./sitemaps/" + file);
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
