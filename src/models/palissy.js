var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var mongoosastic = require('mongoosastic')
var getElasticInstance = require('../elasticsearch')

const Schema = new mongoose.Schema({
  PRODUCTEUR: { type: String, default: '' },
  CONTIENT_IMAGE: { type: String, default: '' },
  MEMOIRE: [{ ref: String, url: String }],
  REF: { type: String, unique: true, index: true, trim: true },
  ACQU: { type: String, default: '' },
  ADRS: { type: String, default: '' },
  ADRS2: { type: String, default: '' },
  AFIG: { type: [String], default: [] },
  AIRE: { type: String, default: '' },
  APPL: { type: String, default: '' },
  ATEL: { type: String, default: '' },
  AUTP: { type: String, default: '' },
  AUTR: { type: [String], default: [] },
  BIBL: { type: String, default: '' },
  CANT: { type: String, default: '' },
  CATE: { type: [String], default: [] },
  COM: { type: String, default: '' },
  COM2: { type: String, default: '' },
  CONTACT: { type: String, default: '' },
  COOR: { type: String, default: '' },
  COORM: { type: String, default: '' },
  COPY: { type: String, default: '' },
  DATE: { type: [String], default: [] },
  DBOR: { type: [String], default: [] },
  DENO: { type: [String], default: [] },
  DENQ: { type: [String], default: [] },
  DEPL: { type: String, default: '' },
  DESC: { type: String, default: '' },
  DIMS: { type: String, default: '' },
  DMAJ: { type: String, default: '' },
  DMIS: { type: String, default: '' },
  DOMN: { type: String, default: '' },
  DOSADRS: { type: String, default: '' },
  DOSS: { type: [String], default: [] },
  DOSURL: { type: String, default: '' },
  DOSURLP: { type: String, default: '' },
  DPRO: { type: String, default: '' },
  DPT: { type: String, default: '' },
  EDIF: { type: String, default: '' },
  EDIF2: { type: String, default: '' },
  EMPL: { type: String, default: '' },
  EMPL2: { type: String, default: '' },
  ETAT: { type: [String], default: [] },
  ETUD: { type: String, default: '' },
  EXEC: { type: String, default: '' },
  EXPO: { type: String, default: '' },
  HIST: { type: String, default: '' },
  IDAGR: { type: [String], default: [] },
  IMAGE: { type: String, default: '' },
  IMG: { type: [String], default: [] },
  IMPL: { type: String, default: '' },
  INSC: { type: [String], default: [] },
  INSEE: { type: String, default: [] },
  INSEE2: { type: String, default: '' },
  INTE: { type: String, default: '' },
  JDAT: { type: [String], default: [] },
  LBASE2: { type: String, default: '' },
  LIENS: { type: [String], default: [] },
  LIEU: { type: String, default: '' },
  LMDP: { type: String, default: '' },
  LOCA: { type: String, default: '' },
  MATR: { type: [String], default: [] },
  MFICH: { type: [String], default: [] },
  MICR: { type: String, default: '' },
  MOSA: { type: String, default: '' },
  NART: { type: String, default: '' },
  NINV: { type: String, default: '' },
  NOMS: { type: [String], default: [] },
  NUMA: { type: String, default: '' },
  NUMP: { type: String, default: '' },
  OBS: { type: String, default: '' },
  ORIG: { type: String, default: '' },
  PAPP: { type: String, default: '' },
  PARN: { type: [String], default: [] },
  PART: { type: [String], default: [] },
  PDEN: { type: [String], default: [] },
  PDIM: { type: String, default: '' },
  PERS: { type: [String], default: [] },
  PETA: { type: String, default: '' },
  PHOTO: { type: String, default: '' },
  PINS: { type: String, default: '' },
  PINT: { type: String, default: '' },
  PLOC: { type: String, default: '' },
  PPRO: { type: String, default: '' },
  PREP: { type: String, default: '' },
  PROT: { type: String, default: '' },
  REFA: { type: [String], default: [] },
  REFE: { type: [String], default: [] },
  REFM: { type: String, default: '' },
  REFP: { type: [String], default: [] },
  REG: { type: String, default: '' },
  RENP: { type: [String], default: [] },
  RENV: { type: [String], default: [] },
  REPR: { type: [String], default: [] },
  SCLD: { type: [String], default: [] },
  SCLE: { type: [String], default: [] },
  SCLX: { type: [String], default: [] },
  SOUR: { type: String, default: '' },
  STAD: { type: [String], default: [] },
  STAT: { type: [String], default: [] },
  STRU: { type: [String], default: [] },
  THEM: { type: String, default: '' },
  TICO: { type: String, default: '' },
  TITR: { type: String, default: '' },
  TOUT: { type: String, default: '' },
  VIDEO: { type: [String], default: [] },
  VOLS: { type: String, default: '' },
  WADRS: { type: String, default: '' },
  WCOM: { type: String, default: '' },
  WEB: { type: String, default: '' },
  WRENV: { type: String, default: '' },
  ZONE: { type: String, default: '' }
}, { collection: 'palissy' })

Schema.pre('update', function (next) {
  // console.log('UPDATE', this)
  const REF = this.getUpdate().REF
  const IMG = this.getUpdate().IMG

  let PRODUCTEUR
  switch (REF.substring(0, 2)) {
    case 'IM': PRODUCTEUR = 'Inventaire'; break
    case 'PM': PRODUCTEUR = 'Monument Historique'; break
    case 'EM': PRODUCTEUR = 'Etat'; break
    default: PRODUCTEUR = 'Null'; break
  }

  let CONTIENT_IMAGE = IMG ? 'oui' : 'non'

  this.update({}, {
    PRODUCTEUR,
    CONTIENT_IMAGE
  })
  next()
})

Schema.plugin(mongoosePaginate)
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: 'palissy',
  bulk: { size: 500, delay: 2000 }
})

const object = mongoose.model('palissy', Schema)

object.createMapping({
  "settings": {
    "analysis": {
      "analyzer": {
        "folding": {
          "tokenizer": "standard",
          "filter": ["lowercase", "asciifolding"]
        }
      }
    }
  },
  "mappings": {
    "palissy": {
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
    // console.log('error creating mapping (you can safely ignore this)');
    // console.log(err);
  } else {
    console.log('mapping created!');
    // console.log(mapping);
  }
});

module.exports = object
