const program = require("commander");
const inquirer = require("inquirer");
const es = require("../elasticsearch")();
const Listr = require("listr");
const Observable = require("rxjs").Observable;
const fs = require("fs");
const { pingElasticsearchTask } = require("./utils");

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

  const tasks = new Listr([ pingElasticsearchTask(es) ]);
  
  program.indices.map(async db => {
    tasks.add({
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
              ctx.rootExists = await es.indices.exists({
                index: rootDbname
              });
            }
          },
          {
            title: "Reindex",
            enabled: ctx => ctx.rootExists === true && ctx.error !== true,
            task: async ctx => {
              let response;
              try {
                response = await es.reindex({
                  requestTimeout: 120 * 60 * 1000,
                  timeout: "2h",
                  waitForCompletion: false,
                  body: {
                    source: { index: rootDbname },
                    dest: { index: dbname }
                  }
                });
              } catch (e) {
                ctx.error = true;
                console.error(e);
                throw new Error(e);
              }
              if (!response || !response.task) {
                ctx.error = true;
                console.error(response);
                throw new Error("Oups. There where some failures.");
              }
              return new Observable(observer => {
                const intervalId = setInterval(async () => {
                  const task = await es.tasks.get({ taskId: response.task });
                  if (!task || task.completed === true) {
                    clearInterval(intervalId);
                    observer.complete();
                  }
                  observer.next(
                    "Reindexing - " +
                      JSON.stringify({
                        total: task.task.status.total,
                        updated: task.task.status.updated,
                        created: task.task.status.created,
                        deleted: task.task.status.deleted
                      })
                  );
                }, 2000);
              });
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
        ]);
      }
    });
  });
  try {
    await tasks.run();
  } catch (e) {
    console.error(e);
  }
}

run();
