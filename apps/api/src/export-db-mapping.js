const fs = require("fs");
const path = require("path");
const modelsPath = "./models";
const markdownPath = "../pop_mapping.js";

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
        required: required,
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

// 2. Convert to markdown and write to file
fs.writeFileSync(
  path.join(__dirname, markdownPath),
  `${models
    .map(model => {
      const obj = {};
      for (let i = 0; i < model.paths.length; i++) {
        obj[model.paths[i].path] = model.paths[i];
        delete obj[model.paths[i].path].path;
      }
      return `const ${model.name} = ${JSON.stringify(obj)}`;
    })
    .join("\n")}
    const mapping = {${models.map(e => e.name).join(",")}}
    export default mapping;
    `
);
