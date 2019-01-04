const fs = require("fs");
const path = require("path");
const modelsPath = "./models";
const markdownPath = "../csv";

// 1. Load models
const models = fs
  .readdirSync(path.join(__dirname, modelsPath))
  // Require all files
  .map(file => require(`${modelsPath}/${file}`))
  // Build an object from object's schema properties
  .map(model => ({
    name: model.modelName,
    paths: Object.entries(model.schema.paths).map(([k, v]) => {
      const { documentation, required } = v.options;
      const obj = {
        path: v.path,
        type: v.instance,
        required: required ? "oui" : "non",
        label: documentation ? documentation.label || "" : "",
        opendata: documentation ? documentation.opendata || "" : "",
        generated: documentation ? documentation.generated || "" : "",
        description: documentation ? documentation.description || "" : "",
        validation: documentation ? documentation.validation || "" : "",
        thesaurus: documentation ? documentation.thesaurus || "" : ""
      };
      return obj;
    })
  }));

for (let i = 0; i < models.length; i++) {
  const model = models[i];
  const arr = [];
  arr.push(Object.keys(model.paths[0]).join(","));

  for (let j = 0; j < model.paths.length; j++) {
    const line = [];
    for (let key in model.paths[j]) {
      line.push(`"${model.paths[j][key]}"`);
    }
    arr.push(line.join(","));
  }

  fs.writeFileSync(
    path.join(__dirname, `${markdownPath}/${model.name}.csv`),
    arr.join("\n")
  );
}
