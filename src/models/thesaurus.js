var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const Schema = new mongoose.Schema({
    arc: String,
    value: String,
}, { collection: 'thesaurus' })

Schema.plugin(mongoosePaginate);

const object = mongoose.model("thesaurus", Schema)

module.exports = object;
