const fs = require("fs");
const path = require("path");
const modelsPath = "./models";
const markdownPath = "../doc";

// 1. Load models
const models = fs
  .readdirSync(path.join(__dirname, modelsPath))
  // Require all files
  .map(file => require(`${modelsPath}/${file}`))
  // Build an object from object's schema properties
  .map(model => ({
    name: model.modelName,
    paths: Object.entries(model.schema.paths).map(([k, v]) => ({
      name: v.path,
      type: v.instance,
      required: v.options.required,
      opendata: v.options.documentation ? v.options.documentation.opendata : "",
      generated: v.options.documentation ? v.options.documentation.generated : "",
      deprecated: v.options.documentation ? v.options.documentation.deprecated : "",
      description:
        v.options.documentation && v.options.documentation.description
          ? v.options.documentation.description
          : "",
      label:
        v.options.documentation && v.options.documentation.label
          ? v.options.documentation.label
          : "",
      validation: v.options.documentation ? v.options.documentation.validation : "",
      thesaurus: v.options.documentation ? v.options.documentation.thesaurus : ""
    }))
  }));

//write ReadMe
fs.writeFileSync(
  path.join(__dirname, markdownPath + "/README.md"),
  `# POP SCHEMAS\n 
  ${models
    .map(
      model =>
        `- [${model.name[0].toUpperCase() + model.name.slice(1)}](/apps/api/doc/${model.name}.md)`
    )
    .join("\n")}`
);

for (let i = 0; i < models.length; i++) {
  const model = models[i];
  const arr = [];

  //TITRE
  arr.push(`# POP SCHEMAS ${model.name}\n`);

  //SUMMARY
  for (let j = 0; j < model.paths.length; j++) {
    arr.push(`- [${model.paths[j].name}](/apps/api/doc/${model.name}.md#${model.paths[j].name})`);
  }

  arr.push(
    ...model.paths.map(path => {
      const elements = [
        path.type,
        path.required ? "oui" : "non",
        path.generated ? "oui" : "non",
        path.deprecated ? "oui" : "non",
        path.opendata ? "oui" : "non",
        path.validation,
        path.label
      ];
      return [
        `### ${path.name}`,
        path.description + "\n\n",
        path.thesaurus ? `Thésaurus : ${path.thesaurus} \n\n` : "",
        "",
        `|Type|Requis|Généré|Déprécié|Opendata|Validation|Label|`,
        `|----|------|------|------|--------|----------|-----|`,
        `|${elements.join("|")}|`,
        ""
      ].join("\n");
    })
  );

  fs.writeFileSync(path.join(__dirname, `${markdownPath}/${model.name}.md`), arr.join("\n"));
}
