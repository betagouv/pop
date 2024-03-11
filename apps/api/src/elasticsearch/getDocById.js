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

  const opts = program.opts();

  if (opts.id == null || opts.db == null) {
    console.error(chalk.red("You need to add doc id AND db (i.e. --db and --id)"));
    return;
  }

  try {
    await es.ping();
  } catch (err) {
    console.error(err)
    return
  }

  try {
    const res = await es.get({
      index: opts.db,
      // type: "_" + opts.db,
      id: opts.id
    });
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}
run();
