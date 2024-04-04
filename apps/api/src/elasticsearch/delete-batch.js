require("dotenv").config();
const inquirer = require("inquirer");
const program = require("commander");
const { Listr } = require("listr2");
const es = require("../elasticsearch.js")();
const chalk = require("chalk");
const { esUrl } = require("../config.js");

// Delete one index in ES (i.e. an obsolete indice)
// Usage: `node delete.js mnr1234`
async function run() {
	program.version("0.1.0").parse(process.argv);

	if (!program.args[0]) {
		console.error(
			chalk.white.bgRed.bold(
				"You need to add coma separated indices as an argument",
			),
		);
		return;
	}
	const indice = program.args[0];

	const res = await es.cat.indices({
		format: "json",
		index: `${indice}*`,
	});
	console.log(`${res.body.length} found`);
	console.log(res.body.map((i) => i.index));
	const indexesToDelete = res.body.map((i) => i.index);

	const answers = await inquirer.prompt({
		type: "confirm",
		name: "force",
		message: "Do you really want to delete them?",
	});
	if (!answers.force) {
		return;
	}

	const tasks = new Listr();

	console.log("ES:", esUrl);

	tasks.add({
		title: "Ping OpenSearch",
		task: async () => {
			try {
				await es.ping();
			} catch (err) {
				throw new Error(`Failed to locate ping elasticsearch`, err);
			}
		},
	});

	tasks.add({
		title: `Deleting indexes`,
		task: async () => {
			return new Listr(
				indexesToDelete.map((index) => ({
					title: "Delete " + index,
					task: async () => {
						return await es.indices.delete({ index });
					},
				})),
				{ concurrent: true },
			);
		},
	});

	try {
		await tasks.run();
	} catch (e) {
		console.error(e);
	}
}

run();
