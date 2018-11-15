const fs = require("fs");
const path = require("path");
const modelsPath = "./models";
const markdownPath = "../SCHEMAS.md";

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
      opendata: v.options.opendata,
      description: v.options.description
    }))
  }));

// 2. Convert to markdown and write to file
fs.writeFileSync(
  path.join(__dirname, markdownPath),
  // Page Title
  `# POP SCHEMAS\n${models
    // Write one "table" for each model
    .map(model => {
      return [
        // Upper case title
        `## ${model.name[0].toUpperCase() + model.name.slice(1)}`,
        // Headers
        `|Name|Type|Required|Master|Opendata|Description|`,
        `|----|----|--------|------|--------|-----------|`,
        // Lines, one line for each model property
        ...model.paths.map(path => {
          const elements = [
            path.name,
            path.type,
            path.required ? "true" : "false",
            path.master ? "true" : "false",
            path.opendata ? "true" : "false",
            path.description
          ];
          return "|" + elements.join("|") + "|";
        })
      ].join("\n");
    })
    .join("\n")}`
);
