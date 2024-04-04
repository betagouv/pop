require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const inquirer = require("inquirer");
const program = require("commander");
const { Listr } = require("listr2");
const Observable = require("rxjs").Observable;
const { mongoUrl, esUrl, dbName, ovh } = require("../config.js");
const Merimee = require("../models/merimee");
const Joconde = require("../models/joconde");
const Palissy = require("../models/palissy");
const Memoire = require("../models/memoire");
const Autor = require("../models/autor");
const Mnr = require("../models/mnr");
const Import = require("../models/import");
const Museo = require("../models/museo");
const Enluminures = require("../models/enluminures");
const es = require("../elasticsearch")();
const chalk = require("chalk");

// Sync all data from mongo to ES. Rebuild indices. It works without breaking off service.
async function run() {
	console.log("ES : " + esUrl);
	console.log("MongoDB : " + mongoUrl);

	program
		.version("0.1.0")
		.option("-f, --force", "Force sync and reindex")
		.option("-c, --chunks [chunks]", "Size of chunks", 1000)
		.option("-s, --skip <skip>", "Skip n first entries")
		.option("-q, --quiet", "Silence mode")
		.option(
			"-i --indices <indices>",
			"The name of the indices",
			(val) => val.split(","),
			"joconde,memoire,merimee,mnr,palissy,import,museo,autor,enluminures".split(
				",",
			),
		)
		.parse(process.argv);

	const opts = program.opts();

	opts.chunks = Number(opts.chunks);
	opts.quiet = Boolean(opts.quiet);
	if (opts.quiet) {
		console.log("Quiet mode enabled");
	}

	console.log(
		chalk.white.bgRed.bold(
			"The script may run for several hours and should not be stopped.",
		),
	);
	console.log(
		"Still, it can be stopped, but it will leave temporary indices which must be cleaned manually.",
	);

	if (!opts.force) {
		const answers = await inquirer.prompt({
			type: "confirm",
			name: "force",
			message: "Do you really want to reindex and sync all indices?",
		});
		if (!answers.force) {
			return;
		}
	}

	const tasks = new Listr([
		{
			title: "Ping Elasticsearch",
			task: async () => {
				try {
					await es.ping();
				} catch (e) {
					console.error(e);
					throw new Error(`Failed to locate ping elasticsearch`, e);
				}
			},
		},
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
		import: Import,
		mnr: Mnr,
		museo: Museo,
		enluminures: Enluminures,
		autor: Autor,
	};

	tasks.add({
		title: "Processing",
		rendererOptions: { persistentOuput: true, collapseSubtasks: false },
		task: (ctx, task) => {
			return task.newListr(
				opts.indices.map((db) => ({
					title: db,
					task: async (ctx, task) => {
						const noticeClass = noticesClass[db];
						// The original index name.
						const rootDbname = db;
						// A new index name.
						const dbname = db + new Date().valueOf();

						// Sub-task list for each index.
						return task.newListr([
							{
								title: "Create a new index with correct settings and mappings.",
								task: async (ctx, task) => {
									const filename = `./indices/${db}.js`;
									if (
										!fs.existsSync(
											`${__dirname}/${filename}`,
										)
									) {
										ctx.error = true;
										throw new Error(
											`Failed to locate ${__dirname}/${filename}`,
										);
									}
									const response = await es.indices.create({
										index: dbname,
										body: require(filename),
									});

									if (
										(ovh && !response.body.acknowledged) ||
										(!ovh && !response.acknowledged)
									) {
										ctx.error = true;
										throw new Error(
											"Failed to create new index.",
										);
									}

									task.output = `Index ${dbname} created.`;

									const existsRes = await es.indices.exists({
										index: rootDbname,
									});
									ctx.rootExists = ovh
										? existsRes.body
										: existsRes;
									task.output =
										"Root index exists: " + ctx.rootExists;
								},
							},
							{
								title: "Sync all",
								enabled: (ctx) => ctx.error !== true,
								task: (ctx) => {
									return new Observable(async (observer) => {
										ctx.error = true;
										let counter = 0;
										const estimatedDocumentCount =
											await noticeClass.estimatedDocumentCount();
										observer.next(
											estimatedDocumentCount +
												" notices to go.",
										);
										let lastId;
										while (true) {
											try {
												const notices = await noticeClass
													.find(
														lastId
															? {
																	_id: {
																		$gt: lastId,
																	},
																}
															: {},
													)
													.sort({ _id: 1 })
													.limit(opts.chunks);

												if (!notices.length) {
													ctx.error = false;
													observer.complete();
													break;
												}

												const bulk = [];
												for (const i in notices) {
													const notice = JSON.parse(
														JSON.stringify(
															notices[i],
														),
													);
													if (ovh) {
														bulk.push({
															update: {
																_index: dbname,
																_id: notice._id,
															},
														});
													} else {
														bulk.push({
															update: {
																_index: dbname,
																_type: db,
																_id: notice._id,
															},
														});
													}
													delete notice._id;
													bulk.push({
														doc: notice,
														doc_as_upsert: true,
													});
												}

												if (bulk.length) {
													const res = await es.bulk({
														body: bulk,
													});
													if (res.errors) {
														observer.error({
															message:
																"Error in bulk",
															sampleError:
																JSON.stringify(
																	res.body
																		.items,
																),
															errors: JSON.stringify(
																res.body.errors,
															),
														});
														break;
													}
													counter++;
													lastId =
														notices[
															notices.length - 1
														];
													if (!opts.quiet) {
														observer.next(
															`${
																counter *
																opts.chunks
															} / ${estimatedDocumentCount} notices done.`,
														);
													}
												}
											} catch (err) {
												observer.error(err);
												break;
											}
										}
									});
								},
							},
							{
								title: "Create alias to the rootname and remove previous db",
								enabled: (ctx) =>
									ctx.rootExists === true &&
									ctx.error !== true,
								task: async () => {
									// Find previous db name.
									const res = await es.indices.getAlias({
										index: `${rootDbname}*`,
									});
									const aliases = ovh ? res.body : res;

									const previousDbname =
										Object.keys(aliases).find(
											(key) =>
												aliases[key].aliases[
													rootDbname
												],
										) || rootDbname;

									if (previousDbname) {
										// Create alias to the rootname and remove previous db.
										const response =
											await es.indices.updateAliases({
												body: {
													actions: [
														{
															add: {
																index: dbname,
																alias: rootDbname,
															},
														},
														{
															remove_index: {
																index: previousDbname,
															},
														},
													],
												},
											});

										if (
											(ovh &&
												!response.body.acknowledged) ||
											(!ovh && !response.acknowledged)
										) {
											console.error(response);
											throw new Error(
												"Fatal error while creating new alias and removing previous db!",
											);
										}
									}
								},
							},
							{
								title: "Create alias to the rootname",
								enabled: (ctx) =>
									ctx.rootExists === false &&
									ctx.error !== true,
								task: async () => {
									const response =
										await es.indices.updateAliases({
											body: {
												actions: [
													{
														add: {
															index: dbname,
															alias: rootDbname,
														},
													},
												],
											},
										});

									if (
										(ovh && !response.body.acknowledged) ||
										(!ovh && !response.acknowledged)
									) {
										console.error(response);
										throw new Error(
											"Fatal error while creating alias!",
										);
									}
								},
							},
						]);
					},
				})),
			);
		},
	});

	tasks.add({
		title: "Close Mongoose connection",
		task: async () => {
			await mongoose.connection.close();
		},
	});

	try {
		await tasks.run();
	} catch (e) {
		console.error(e);
		await mongoose.connection.close();
	}
	return;
}
run();
