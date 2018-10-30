const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const ImportSchema = new Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "user" },
  importedAt: { type: Date, default: Date.now() },
  institution: String,
  created: Number,
  updated: Number,
  rejected: Number,
  unChanged: Number
});

module.exports = mongoose.model("Import", ImportSchema);
