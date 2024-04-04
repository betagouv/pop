require("dotenv").config();
const program = require("commander");
const es = require("../elasticsearch")();
const chalk = require("chalk");

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

	await es.ping();
	console.log("connected to OpenSearch");

	// const res = await es.cat.indices({
	//   format: 'json',
	//   index: `${indice}*`
	// })
	// console.log(res.body)

	const res = await es.indices.getAlias({ index: `${indice}*` });
	console.log("aliases", res.body);
	const aliases = res.body;
	const previousDbname =
		Object.keys(aliases).find((key) => aliases[key].aliases[indice]) ||
		indice;
	console.log("previousDbname", previousDbname);
}

run();
