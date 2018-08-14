var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var mongoosastic = require('mongoosastic')
var getElasticInstance = require('../elasticsearch')

const Schema = new mongoose.Schema({
  PRODUCTEUR: { type: String, default: 'MUSEE' },
  CONTIENT_IMAGE: { type: String, default: '', es_indexed: true },
  REF: { type: String, unique: true, index: true, trim: true, es_indexed: true },
  REFMIS: { type: String, default: '' },
  ADPT: { type: [String], default: [] },
  APPL: { type: [String], default: [] },
  APTN: { type: String, default: '' },
  ATTR: { type: String, default: '' },
  AUTR: { type: String, default: '', es_indexed: true },
  BIBL: { type: String, default: '' },
  COMM: { type: String, default: '' },
  CONTACT: { type: String, default: '' },
  COOR: { type: String, default: '' },
  COPY: { type: String, default: '' },
  DACQ: { type: String, default: '' },
  DATA: { type: String, default: '' },
  DATION: { type: String, default: '' },
  DDPT: { type: String, default: '' },
  DECV: { type: String, default: '' },
  DENO: { type: [String], default: [], es_indexed: true },
  DEPO: { type: String, default: '' },
  DESC: { type: String, default: '' },
  DESY: { type: String, default: '' },
  DIFFU: { type: String, default: '' },
  DIMS: { type: String, default: '' },
  DMAJ: { type: String, default: '' },
  DMIS: { type: String, default: '' },
  DOMN: { type: [String], default: [], es_indexed: true },
  DREP: { type: String, default: '' },
  ECOL: { type: [String], default: [] },
  EPOQ: { type: [String], default: [] },
  ETAT: { type: [String], default: [] },
  EXPO: { type: String, default: '' },
  GENE: { type: [String], default: [] },
  GEOHI: { type: [String], default: [] },
  HIST: { type: String, default: '' },
  IMAGE: { type: String, default: '' },
  IMG: { type: [String], default: [], es_indexed: true },
  INSC: { type: [String], default: [] },
  INV: { type: String, default: '', es_indexed: true },
  LABEL: { type: String, default: 'Musée de France au sens de la loi n°2002-5 du 4 janvier 2002' },
  LABO: { type: String, default: '' },
  LARC: { type: String, default: '' },
  LIEUX: { type: String, default: '' },
  LOCA: { type: String, default: '', es_indexed: true },
  LOCA2: { type: String, default: '' },
  LOCA3: { type: String, default: '' },
  MILL: { type: [String], default: [] },
  MILU: { type: String, default: '' },
  MOSA: { type: String, default: '' },
  MSGCOM: { type: String, default: '' },
  MUSEO: { type: String, default: '' },
  NSDA: { type: String, default: '' },
  ONOM: { type: [String], default: [] },
  PAUT: { type: String, default: '' },
  PDAT: { type: String, default: '' },
  PDEC: { type: String, default: '' },
  PEOC: { type: [String], default: [] },
  PERI: { type: [String], default: [], es_indexed: true },
  PERU: { type: [String], default: [] },
  PHOT: { type: String, default: '' },
  PINS: { type: String, default: '' },
  PLIEUX: { type: String, default: '' },
  PREP: { type: [String], default: [] },
  PUTI: { type: String, default: '' },
  RANG: { type: String, default: '' },
  REDA: { type: [String], default: [] },
  REFIM: { type: String, default: '' },
  REPR: { type: String, default: '' },
  RETIF: { type: String, default: '' },
  SREP: { type: [String], default: [] },
  STAT: { type: [String], default: [] },
  TECH: { type: [String], default: [], es_indexed: true },
  TICO: { type: String, default: '', es_indexed: true },
  TITR: { type: String, default: '', es_indexed: true },
  TOUT: { type: String, default: '' },
  UTIL: { type: [String], default: [] },
  VIDEO: { type: String, default: '' },
  WWW: { type: String, default: '' },
  LVID: { type: String, default: '' }

}, { collection: 'joconde' })

Schema.plugin(mongoosePaginate)
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: 'joconde',
  bulk: {
    batch: 500,
    delay: 2000
  }
})

const object = mongoose.model('joconde', Schema)

object.createMapping({
  "mappings": {
    "joconde": {
      "properties": {
        "REF": {
          "type": "text",
        },
        "DMIS": {
          "type": "text",
        },
        "DMAJ": {
          "type": "text"
        }
      }
    }
  }
}, function (err, mapping) {
  if (err) {
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  } else {
    console.log('mapping created!');
    console.log(mapping);
  }
});

module.exports = object
