require("dotenv").config();
const { Listr } = require("listr2");
const program = require("commander");
const es = require("../elasticsearch")();
const { pingElasticsearchTask } = require("./utils");

async function run() {
  program
    .version("0.1.0")
    .option(
      "-i --indices <indices>",
      "The name of the indices",
      val => val.split(","),
      "joconde,memoire,merimee,mnr,palissy,import,museo,autor,enluminures".split(",")
    )
    .parse(process.argv);

  const opts = program.opts();

  const tasks = new Listr([
    pingElasticsearchTask(es),
  ]);

  for (const db of opts.indices) {
    tasks.add({
      title: `Deleting indexes for ${db}`,
      task: async () => {
        await es.indices.delete({ index: `${db}*` })
      }
    })
  }

  try {
    await tasks.run();
  } catch (e) {
    console.error(e);
  }
  return;
}

run();
