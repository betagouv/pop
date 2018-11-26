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
  // Page Title
  `# POP SCHEMAS\n${models
    // Write one "table" for each model
    .map(model => {
      return [
        // Upper case title
        `## ${model.name[0].toUpperCase() + model.name.slice(1)}`,
        // One block for each model property (title, description, info)
        ...model.paths.map(path => {
          const elements = [
            path.type,
            path.required ? "true" : "false",
            path.master ? "true" : "false",
            path.opendata ? "true" : "false"
          ];
          return [
            `### ${path.name}`,
            path.description,
            "",
            `|Type|Required|Master|Opendata|`,
            `|----|--------|------|--------|`,
            `|${elements.join("|")}|`,
            ""
          ].join("\n");
        })
      ].join("\n");
    })
    .join("\n")}`
);
