const mongoose = require("mongoose");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const GallerySchema = new mongoose.Schema(
  {
    params: {},
    createdBy: { type: String, default: "anonyme" },
    institution: { type: String, default: "public" },
    name: String,
    description: String,
    image: String,
    createdAt: { type: Date, default: Date.now() }
  },
  { collection: "gallery" }
);

GallerySchema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "gallery"
});

module.exports = mongoose.model("Gallery", GallerySchema);
