const mongoose = require("mongoose");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const GallerySchema = new mongoose.Schema(
  {
    params: {},
    createdBy: String,
    createdAt: String,
    name: String
  },
  { collection: "gallery" }
);

GallerySchema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "gallery"
});

module.exports = mongoose.model("Gallery", GallerySchema);
