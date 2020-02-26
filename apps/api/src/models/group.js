const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  LABEL: { type: String, required: true },
  PRODUCTEURS: { type: Array, required: true }
});

GroupSchema.method("toJSON", function() {
  var group = this.toObject();
  return group;
});

module.exports = mongoose.model("Groups", GroupSchema);