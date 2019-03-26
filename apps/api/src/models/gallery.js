const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  params: {}
}, { collection: "gallery" });

module.exports = mongoose.model("Gallery", GallerySchema);
