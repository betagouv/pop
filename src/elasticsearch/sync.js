require('dotenv').config()
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
const { pingElasticsearchTask } = require("./utils");

async function run() {
  program
    .version("0.1.0")
    .option("-f, --force", "Force sync")
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
  if (!program.force) {
    const answers = await inquirer.prompt({
      type: "confirm",
      name: "force",
      message: "Do you really want to sync all indices?"
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
        return new Observable(async observer => {
          let counter = 0;
          if (program.skip) {
            counter = Math.floor(program.skip / program.chunks);
            observer.next(
              (await noticeClass.estimatedDocumentCount()) +
                " notices to go, start at " +
                program.chunks * counter
            );
          } else {
            observer.next(
              (await noticeClass.estimatedDocumentCount()) + " notices to go."
            );
          }
          let lastId;
          while (true) {
            let notices = await noticeClass
              .find(lastId ? {'_id': {'$gt': lastId}} : {})
              .sort({ _id: 1 })
              .limit(program.chunks);
            if (!notices.length) {
              observer.complete();
              break;
            }
            const bulk = [];
            for (let i in notices) {
              const notice = JSON.parse(JSON.stringify(notices[i]));
              bulk.push({
                update: { _index: db, _type: db, _id: notice._id }
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
