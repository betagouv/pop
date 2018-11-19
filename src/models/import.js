const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const ImportSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    description: "Identifiant de l'utilisateur à l'origine de l'import"
  },
  importedAt: {
    type: Date,
    default: Date.now(),
    description: "Date de l'import "
  },
  institution: {
    type: String,
    description: "Institution à l'origine de l'import"
  },
  created: {
    type: Number,
    description: "Nombre de notices créées lors de l'import"
  },
  updated: {
    type: Number,
    description: "Nombre de notices mises à jour lors de l'import"
  },
  rejected: {
    type: Number,
    description: "Nombre de notices rejetées lors de l'import"
  },
  unChanged: {
    type: Number,
    description: "Nombre de notices non mises à jour lors de l'import"
  }
});

module.exports = mongoose.model("Import", ImportSchema);
