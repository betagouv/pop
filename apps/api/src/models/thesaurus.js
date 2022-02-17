var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const Schema = new mongoose.Schema(
  {
    idThesaurus: String,
    arc: String,
    value: String,
    altLabel: Boolean
  },
  { collection: "thesaurus" }
);

Schema.index({ value: "text" });

Schema.plugin(mongoosePaginate);
const object = mongoose.model("thesaurus", Schema);

module.exports = object;
