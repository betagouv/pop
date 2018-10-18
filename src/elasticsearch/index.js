const program = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const es = require("../elasticsearch")();

async function run() {
  program
    .version("0.1.0")
    .option("-f, --force", "Force reindex")
    .parse(process.argv);

  if (!program.force) {
    const answers = await inquirer.prompt({
      type: "confirm",
      name: "force",
      message: "Do you really want to re-index all indices?"
    });
    if (!answers.force) {
      return;
    }
  }

  const available = await es.ping({
    requestTimeout: 30000
  });
  if (!available) {
    console.log(chalk.orange("Elasticsearch not available."));
    process.exit(1);
  }

  ["joconde"].map(async db => {
    // The original index name
    const rootDbname = db;
    // A new index name
    const dbname = db + new Date().valueOf();

    // Create a new index with correct settings and mappings.
    let response = await es.indices.create({
      index: dbname,
      body: require(`./indices/${db}.js`)
    });
    if (!response.acknowledged) {
      console.log(chalk.orange("Failed to create new index."));
      process.exit(1);
    }
    // Reindex only if previous index exists,
    // otherwise, the index is empty, so nothing to do.
    if (await es.indices.exists({ index: rootDbname })) {
      response = await es.reindex({
        body: {
          source: { index: rootDbname },
          dest: { index: dbname }
        }
      });
      if (response.failures.length) {
        console.log(chalk.orange("Oups. There where some failures."));
        console.log(response);
        process.exit(1);
      }
      // Find previous db name.
      const aliases = await es.indices.getAlias({ index: "*" });
      const previousDbname =
        Object.keys(aliases).find(key => aliases[key].aliases[rootDbname]) ||
        rootDbname;
      // Create alias to the rootname and remove previous db.
      response = await es.indices.updateAliases({
        body: {
          actions: [
            { add: { index: dbname, alias: rootDbname } },
            { remove_index: { index: previousDbname } }
          ]
        }
      });
    } else {
      // Create alias to the rootname.
      response = await es.indices.updateAliases({
        body: {
          actions: [{ add: { index: dbname, alias: rootDbname } }]
        }
      });
    }
    if (!response.acknowledged) {
      console.log(
        chalk.red(
          "Fatal error, RED FLAG, run away! Alias rename failed. Rebuild it NOW!"
        )
      );
      process.exit(1);
    }
    console.log(chalk.green("Fine!"));
  });
}

run();
