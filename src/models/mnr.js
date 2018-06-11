var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var mongoosastic = require('mongoosastic')
var getElasticInstance = require("../elasticsearch");


const Schema = new mongoose.Schema({

    POP_HAS_IMAGE: { type: String, default: '' },
    REF: { type: String, index: true },
    TOUT: String,
    AUTR: String,
    PAUT: String,
    ATTR: String,
    ECOL: String,
    TITR: String,
    ATIT: String,
    PTIT: String,
    DENO: String,
    DESC: String,
    DOMN: String,
    LOCA: String,
    INSC: String,
    MARQ: String,
    OBSE: String,
    ETAT: String,
    GENE: String,
    PROV: String,
    HIST: String,
    HIST2: String,
    HIST3: String,
    HIST4: String,
    HIST5: String,
    HIST6: String,
    SCLE: String,
    STYL: String,
    MILL: String,
    TECH: String,
    DIMS: String,
    VIDEO: String,
    INV: String,
    EXPO: String,
    BIBL: String,
    AATT: String,
    AUTI: String,
    CATE: String,
    NOTE: String,
    REDC: String,
    DREP: String,
    PREP: String,
    REPR: String,
    SREP: String,
    REFIM: String,
    DMAJ: String,
    NUMS: String,
    SUITE: String,
    COMM: String,
    NOTE2: String,
    RESUME: String,
    PHOT: String,
}, { collection: 'mnr' })

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
    esClient: getElasticInstance(),
    index: 'mnr',
    bulk: { size: 1000, delay: 1000 }
});

const object = mongoose.model("mnr", Schema)

module.exports = object;