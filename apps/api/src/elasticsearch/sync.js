require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const inquirer = require("inquirer");
const program = require("commander");
const Listr = require("listr");
const Observable = require("rxjs").Observable;
const { mongoUrl } = require("../config.js");
const Merimee = require("../models/merimee");
const Joconde = require("../models/joconde");
const Palissy = require("../models/palissy");
const Memoire = require("../models/memoire");
const Mnr = require("../models/mnr");
const es = require("../elasticsearch")();
const chalk = require("chalk");
const { pingElasticsearchTask } = require("./utils");

async function run() {
  program
    .version("0.1.0")
    .option("-f, --force", "Force sync and reindex")
    .option("-c, --chunks [chunks]", "Size of chunks", 1000)
    .option("-s, --skip <skip>", "Skip n first entries")
    .option(
      "-i --indices <indices>",
      "The name of the indices",
      val => val.split(","),
      "joconde,memoire,merimee,mnr,palissy".split(",")
    )
    .parse(process.argv);

  program.chunks = Number(program.chunks);

  console.log(
    chalk.white.bgRed.bold(
      "The script may run for several hours and should not be stopped."
    )
  );
  console.log(
    "Still, it can be stopped, but it will leave temporary indices which must be cleaned manually."
  );

  if (!program.force) {
    const answers = await inquirer.prompt({
      type: "confirm",
      name: "force",
      message: "Do you really want to reindex and sync all indices?"
    });
    if (!answers.force) {
      return;
    }
  }

  const tasks = new Listr([
    pingElasticsearchTask(es),
    {
      title: "Mongoose connect",
      task: async () => {
        mongoose.set("useCreateIndex", true);
        await mongoose.connect(
          mongoUrl,
          { useNewUrlParser: true }
        );
        return;
      }
    }
  ]);

  program.indices.map(async db => {
    const noticeClass = {
      joconde: Joconde,
      merimee: Merimee,
      palissy: Palissy,
      memoire: Memoire,
      mnr: Mnr
    }[db];
    tasks.add({
      title: `Processing ${db}`,
      task: () => {
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
            title: "Sync all",
            enabled: ctx => ctx.error !== true,
            task: ctx => {
              return new Observable(async observer => {
                ctx.error = true;
                let counter = 0;
                observer.next(
                  (await noticeClass.estimatedDocumentCount()) +
                    " notices to go."
                );
                let lastId;
                while (true) {
                  let notices = await noticeClass
                    .find(lastId ? { _id: { $gt: lastId } } : {})
                    .sort({ _id: 1 })
                    .limit(program.chunks);
                  if (!notices.length) {
                    ctx.error = false;
                    observer.complete();
                    break;
                  }
                  const bulk = [];
                  for (let i in notices) {
                    const notice = JSON.parse(JSON.stringify(notices[i]));
                    bulk.push({
                      update: { _index: dbname, _type: db, _id: notice._id }
                    });
                    delete notice._id;
                    bulk.push({ doc: notice, doc_as_upsert: true });
                  }
                  if (bulk.length) {
                    res = await es.bulk({ body: bulk });
                    if (res.errors) {
                      observer.error({
                        message: "Error in bulk",
                        sampleError: JSON.stringify(res.items[0])
                      });
                      break;
                    }
                    counter++;
                    lastId = notices[notices.length - 1];
                    observer.next(counter * program.chunks + " notices done.");
                  }
                }
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

  tasks.add({
    title: "Close Mongoose connection",
    task: async () => {
      await mongoose.connection.close();
    }
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
