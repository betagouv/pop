var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var mongoosastic = require('mongoosastic')
var getElasticInstance = require('../elasticsearch')

const Schema = new mongoose.Schema({
  PRODUCTEUR: { type: String, default: 'MNR' },
  BASE: { type: String, default: 'Oeuvres spoliées (MNR Rose-Valland)' },
  CONTIENT_IMAGE: { type: String, default: 'non' },
  REF: { type: String, unique: true, index: true, trim: true },
  TOUT: { type: String, default: '' },
  AUTR: { type: [String], default: [] },
  PAUT: { type: String, default: '' },
  ATTR: { type: String, default: '' },
  ECOL: { type: String, default: '' },
  TITR: { type: String, default: '' },
  ATIT: { type: String, default: '' },
  PTIT: { type: String, default: '' },
  DENO: { type: [String], default: [] },
  DESC: { type: String, default: '' },
  DOMN: { type: [String], default: [] },
  LOCA: { type: String, default: '' },
  INSC: { type: String, default: '' },
  MARQ: { type: String, default: '' },
  OBSE: { type: String, default: '' },
  ETAT: { type: String, default: '' },
  GENE: { type: String, default: '' },
  PROV: { type: String, default: '' },
  HIST: { type: String, default: '' },
  HIST2: { type: String, default: '' },
  HIST3: { type: String, default: '' },
  HIST4: { type: String, default: '' },
  HIST5: { type: String, default: '' },
  HIST6: { type: String, default: '' },
  SCLE: { type: [String], default: [] },
  STYL: { type: String, default: '' },
  MILL: { type: String, default: '' },
  TECH: { type: [String], default: [] },
  DIMS: { type: [String], default: [] },
  VIDEO: { type: [String], default: [] },
  INV: { type: String, default: '' },
  EXPO: { type: String, default: '' },
  BIBL: { type: String, default: '' },
  AATT: { type: String, default: '' },
  AUTI: { type: String, default: '' },
  CATE: { type: String, default: '' },
  CATE_DEPREC: { type: String, default: '' },
  NOTE: { type: String, default: '' },
  REDC: { type: [String], default: [] },
  DREP: { type: String, default: '' },
  PREP: { type: String, default: '' },
  REPR: { type: String, default: '' },
  SREP: { type: String, default: '' },
  REFIM: { type: String, default: '' },
  DMAJ: { type: String, default: '' },
  AFFE: { type: String, default: '' },
  NUMS: { type: String, default: '' },
  SUITE: { type: String, default: '' },
  COMM: { type: String, default: '' },
  NOTE2: { type: String, default: '' },
  RESUME: { type: String, default: '' },
  PHOT: { type: String, default: '' },
}, { collection: 'mnr' })

Schema.plugin(mongoosePaginate)
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: 'mnr',
  bulk: { size: 500, delay: 2000 }
})

const object = mongoose.model('mnr', Schema)

object.createMapping({
  "mappings": {
    "mnr": {
      "properties": {
        "TITR": { "type": "text", "analyzer": "french" },
        "PRODUCTEUR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "BASE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "CONTIENT_IMAGE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REF": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "TOUT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "AUTR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PAUT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ATTR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ECOL": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "TITR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ATIT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PTIT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DENO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DESC": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DOMN": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "LOCA": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "INSC": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "MARQ": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "OBSE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ETAT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "GENE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PROV": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "HIST": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "HIST2": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "HIST3": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "HIST4": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "HIST5": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "HIST6": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "SCLE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "STYL": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "MILL": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "TECH": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DIMS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "VIDEO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "INV": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "EXPO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "BIBL": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "AATT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "AUTI": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "CATE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "CATE_DEPREC": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "NOTE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REDC": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DREP": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PREP": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REPR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "SREP": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REFIM": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DMAJ": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "AFFE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "NUMS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "SUITE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "COMM": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "NOTE2": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "RESUME": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PHOT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
      }
    }
  }
}, function (err, mapping) {
  if (err) {
    console.log('error mapping created', err)
    return
  }
})

module.exports = object
