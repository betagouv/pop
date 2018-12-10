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
    paths: Object.entries(model.schema.paths).map(([k, v]) => ({
      path: v.path,
      type: v.instance,
      required: v.options.required,
      label: v.options.documentation ? v.options.documentation.label : "",
      opendata: v.options.documentation ? v.options.documentation.opendata : "",
      master: v.options.documentation ? v.options.documentation.master : "",
      description: v.options.documentation
        ? v.options.documentation.description
        : ""
    }))
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
