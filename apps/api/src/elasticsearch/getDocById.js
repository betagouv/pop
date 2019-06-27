require("dotenv").config();
const program = require("commander");
const es = require("../elasticsearch")();
const chalk = require("chalk");

// Get one doc from elastic search by its ID.
async function run() {
  program
    .version("0.1.0")
    .option("-d, --db [db]", "Database (index) name")
    .option("-i, --id [id]", "ID of the item")
    .parse(process.argv);

  if (!program.id || !program.db) {
    console.error(chalk.red("You need to add doc id AND db (i.e. --db and --id)"));
    return;
  }

  const available = await es.ping({ requestTimeout: 10000 });
  if (!available) {
    console.error(chalk.red("Elasticsearch not available."));
    return;
  }

  try {
    const res = await es.get({
      index: program.db,
      type: "_" + program.db,
      id: program.id
    });
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}
run();
