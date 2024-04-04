var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const Schema = new mongoose.Schema(
	{
		idThesaurus: {
			type: String,
			index: true,
		},
		arc: {
			type: String,
			index: true,
		},
		value: {
			type: String,
			index: true,
		},
		altLabel: Boolean,
		updatedAt: String,
	},
	{ collection: "thesaurus" },
);

Schema.index({ value: "text" });

Schema.plugin(mongoosePaginate);
const object = mongoose.model("thesaurus", Schema);

module.exports = object;
