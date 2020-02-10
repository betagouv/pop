const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const ProducteurSchema = new Schema({
  LABEL: { type: String, required: true },
  BASE: { type: String, required: true }
});

ProducteurSchema.method("toJSON", function() {
  var producteur = this.toObject();
  return producteur;
});

module.exports = mongoose.model("Producteur", ProducteurSchema);