const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const DeleteHistoriqueSchema = new Schema({
  REF: { type: String, required: true },
  BASE: { type: String, required: true },
  USER: { type: String, required: false },
  EMAIL: { type: String, required: false },
  DATE: { type: String, required: false }
});

DeleteHistoriqueSchema.method("toJSON", function() {
  var deleteHistorique = this.toObject();
  return deleteHistorique;
});

module.exports = mongoose.model("DeleteHistorique", DeleteHistoriqueSchema);