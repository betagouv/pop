const program = require("commander");
const inquirer = require("inquirer");
const es = require("../elasticsearch")();
const Listr = require("listr");
const fs = require("fs");

async function run() {
  program
    .version("0.1.0")
    .option("-f, --force", "Force reindex")
    .option(
      "-i --indices <indices>",
      "The name of the indices",
      val => val.split(","),
      "joconde,memoire,merimee,mnr,palissy".split(",")
    )
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

  const tasks = new Listr([
    {
      title: "Ping",
      task: async () => {
        const available = await es.ping({ requestTimeout: 10000 });
        if (!available) {
          throw new Error("Elasticsearch not available.");
        }
      }
    }
  ]);
  program.indices.map(async db => {
    tasks.add(
      {
        title: `Processing ${db}...`,
        task: async () => {
          // The original index name.
          const rootDbname = db;
          // A new index name.
          const dbname = db + new Date().valueOf();

          // Sub-task list for each index.
          return new Listr([
            {
              title: "Create a new index with correct settings and mappings.",
              task: async ctx => {
                const filename = `./indices/${db}.js`;
                if (!fs.existsSync(`${__dirname}/${filename}`)) {
                  ctx.error = true;
                  throw new Error(`Failed to locate ${__dirname}/${filename}`);
                }
                const response = await es.indices.create({
                  index: dbname,
                  body: require(filename)
                });
                if (!response.acknowledged) {
                  ctx.error = true;
                  throw new Error("Failed to create new index.");
                }
                ctx.rootExists = await es.indices.exists({ index: rootDbname });
              }
            },
            {
              title: "Reindex",
              enabled: ctx => ctx.rootExists === true && ctx.error !== true,
              task: async () => {
                const response = await es.reindex({
                  timeout: "1h",
                  body: {
                    source: { index: rootDbname },
                    dest: { index: dbname }
                  }
                });
                if (response.failures.length) {
                  ctx.error = true;
                  console.error(response);
                  throw new Error("Oups. There where some failures.");
                }
              }
            },
            {
              title: "Create alias to the rootname and remove previous db",
              enabled: ctx => ctx.rootExists === true && ctx.error !== true,
              task: async () => {
                // Find previous db name.
                const aliases = await es.indices.getAlias({ index: "*" });
                const previousDbname =
                  Object.keys(aliases).find(
                    key => aliases[key].aliases[rootDbname]
                  ) || rootDbname;
                // Create alias to the rootname and remove previous db.
                const response = await es.indices.updateAliases({
                  body: {
                    actions: [
                      { add: { index: dbname, alias: rootDbname } },
                      { remove_index: { index: previousDbname } }
                    ]
                  }
                });
                if (!response.acknowledged) {
                  console.error(response);
                  throw new Error("Fatal error!");
                }
              }
            },
            {
              title: "Create alias to the rootname",
              enabled: ctx => ctx.rootExists === false && ctx.error !== true,
              task: async () => {
                const response = await es.indices.updateAliases({
                  body: {
                    actions: [{ add: { index: dbname, alias: rootDbname } }]
                  }
                });
                if (!response.acknowledged) {
                  console.error(response);
                  throw new Error("Fatal error!");
                }
              }
            }
          ], { exitOnError: false });
        }
      },
      { concurrent: true }
    );
  });
  try {
    await tasks.run();
  } catch (e) {
    console.error(e.errors);
  }
}

run();
