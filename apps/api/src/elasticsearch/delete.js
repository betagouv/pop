require("dotenv").config();
const inquirer = require("inquirer");
const program = require("commander");
const Listr = require("listr");
const es = require("../elasticsearch")();
const { pingElasticsearchTask } = require("./utils");
const chalk = require("chalk");

async function run() {
  program.version("0.1.0").parse(process.argv);

  if (!program.args[0]) {
    console.error(chalk.white.bgRed.bold("You need to add coma separated indices as an argument"));
    return;
  }
  const indices = program.args[0].split(",");

  const answers = await inquirer.prompt({
    type: "confirm",
    name: "force",
    message: "Do you really want to delete: " + indices.join(", ")
  });
  if (!answers.force) {
    return;
  }

  const tasks = new Listr([pingElasticsearchTask(es)]);

  indices.map(async index => {
    tasks.add({
      title: `Delete ${index}`,
      task: async () => {
        await es.indices.delete({ index });
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
