var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var mongoosastic = require('mongoosastic')
var getElasticInstance = require('../elasticsearch')

const Schema = new mongoose.Schema({

    REF: { type: String, unique: true, index: true, trim: true },
    PRODUCTEUR: { type: String, default: '' },
    CONTIENT_IMAGE: { type: String, default: '' },
    MEMOIRE: [{ ref: String, url: String }],
    POP_COORDINATES_POINT: {
        'type': { type: String, enum: ['Point'], default: 'Point' },
        coordinates: [{ type: [Number] }]
    },
    POP_COORDINATES_POLYGON: {
        'type': { type: String, enum: ['Polygon'], default: 'Polygon' },
        coordinates: [[{ type: [Number] }]]
    },
    POP_HAS_LOCATION: { type: [String], default: '' },
    POP_DATE: { type: [Number], default: [] },
    TOUT: { type: String, default: '' },
    ACTU: { type: String, default: '' },
    ADRS: { type: String, default: '' },
    AFFE: { type: String, default: '' },
    AIRE: { type: String, default: '' },
    APPL: { type: String, default: '' },
    APRO: { type: [String], default: [] },
    ARCHEO: { type: String, default: '' },
    AUTP: { type: [String], default: [] },
    AUTR: { type: [String], default: [] },
    CADA: { type: [String], default: [] },
    CANT: { type: String, default: '' },
    COLL: { type: [String], default: [] },
    COM: { type: String, default: '' },
    COOR: { type: String, default: '' },
    COORM: { type: String, default: '' },
    COPY: { type: [String], default: [] },
    COUV: { type: [String], default: [] },
    DATE: { type: [String], default: [] },
    DBOR: { type: String, default: '' },
    DOMN: { type: [String], default: [] },
    DENO: { type: [String], default: [] },
    DENQ: { type: String, default: '' },
    DEPL: { type: String, default: '' },
    DESC: { type: String, default: '' },
    DIMS: { type: String, default: '' },
    DMAJ: { type: String, default: '' },
    DMIS: { type: String, default: '' },
    DOSS: { type: String, default: '' },
    DPRO: { type: String, default: '' },
    DPT: { type: String, default: '' },
    EDIF: { type: String, default: '' },
    ELEV: { type: [String], default: [] },
    ENER: { type: [String], default: [] },
    ESCA: { type: [String], default: [] },
    ETAG: { type: [String], default: [] },
    ETAT: { type: String, default: '' },
    ETUD: { type: String, default: '' },
    GENR: { type: String, default: '' },
    HIST: { type: String, default: '' },
    HYDR: { type: String, default: '' },
    IMPL: { type: [String], default: [] },
    INSEE: { type: String, default: '' },
    INTE: { type: [String], default: [] },
    JATT: { type: [String], default: [] },
    JDAT: { type: [String], default: [] },
    LBASE2: { type: String, default: '' },
    LIEU: { type: String, default: '' },
    LOCA: { type: String, default: '' },
    MFICH: { type: String, default: '' },
    MOSA: { type: String, default: '' },
    MHPP: { type: String, default: '' },
    MICR: { type: String, default: '' },
    MURS: { type: [String], default: [] },
    NBOR: { type: String, default: '' },
    NOMS: { type: [String], default: [] },
    OBS: { type: String, default: '' },
    PAFF: { type: String, default: '' },
    PART: { type: [String], default: [] },
    PARN: { type: [String], default: [] },
    PDEN: { type: String, default: '' },
    PERS: { type: [String], default: [] },
    PLAN: { type: String, default: '' },
    PLOC: { type: String, default: '' },
    PPRO: { type: String, default: '' },
    PREP: { type: [String], default: [] },
    PROT: { type: [String], default: [] },
    PSTA: { type: String, default: '' },
    REFE: { type: [String], default: [] },
    REFP: { type: [String], default: [] },
    REFO: { type: [String], default: [] },
    REFO: { type: [String], default: [] },
    REG: { type: String, default: '' },
    REMA: { type: String, default: '' },
    REMP: { type: String, default: '' },
    RENV: { type: [String], default: [] },
    REPR: { type: String, default: '' },
    RFPA: { type: String, default: '' },
    SCLD: { type: [String], default: [] },
    SCLE: { type: [String], default: [] },
    SCLX: { type: [String], default: [] },
    SITE: { type: String, default: '' },
    STAT: { type: String, default: '' },
    TECH: { type: [String], default: [] },
    TICO: { type: String, default: '' },
    TOIT: { type: [String], default: [] },
    TYPO: { type: String, default: '' },
    VERT: { type: String, default: '' },
    REFIM: { type: String, default: '' },
    IMG: { type: [String], default: [] },
    VIDEO: { type: String, default: '' },
    DOSURL: { type: String, default: '' },
    DOSURLP: { type: String, default: '' },
    DOSADRS: { type: String, default: '' },
    LIENS: { type: [String], default: [] },
    IMAGE: { type: String, default: '' },
    VISI: { type: [String], default: [] },
    VOCA: { type: String, default: '' },
    VOUT: { type: [String], default: [] },
    WEB: { type: String, default: '' },
    ZONE: { type: String, default: '' },
    THEM: { type: String, default: '' },
    ACMH: { type: String, default: '' },
    ACURL: { type: String, default: '' },
    WADRS: { type: String, default: '' },
    WCOM: { type: String, default: '' },
    WRENV: { type: String, default: '' },
    REFM: { type: String, default: '' },
    CONTACT: { type: String, default: '' },
    IDAGR: { type: String, default: '' },
    LMDP: { type: String, default: '' },
    PINT: { type: String, default: '' },
    DLAB: { type: String, default: '' }
}, { collection: 'merimee' })

Schema.plugin(mongoosePaginate)
Schema.plugin(mongoosastic, {
    esClient: getElasticInstance(),
    index: 'merimee',
    bulk: { size: 500, delay: 2000 }
})

Schema.pre('update', function(next, done) {
    switch (this.REF.substring(0, 2)) {
        case 'IA': this.PRODUCTEUR = 'Inventaire'; break
        case 'PA': this.PRODUCTEUR = 'Monument Historique'; break
        case 'EA': this.PRODUCTEUR = 'Architecture'; break
        default: this.PRODUCTEUR = 'Null'; break
    }

    this.CONTIENT_IMAGE = this.IMG ? 'oui' : 'non'
    next()
})

const object = mongoose.model('merimee', Schema)




module.exports = object

object.createMapping({
    "settings": {
        "analysis": {
            "analyzer": {
                "my_analyzer": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase"
                    ]
                },
                "autosuggest_analyzer": {
                    "filter": [
                        "lowercase",
                        "asciifolding",
                        "autosuggest_filter"
                    ],
                    "tokenizer": "standard",
                    "type": "custom"
                },
                "ngram_analyzer": {
                    "filter": [
                        "lowercase",
                        "asciifolding",
                        "ngram_filter"
                    ],
                    "tokenizer": "standard",
                    "type": "custom"
                }
            },
            "filter": {
                "autosuggest_filter": {
                    "max_gram": "20",
                    "min_gram": "1",
                    "token_chars": [
                        "letter",
                        "digit",
                        "punctuation",
                        "symbol"
                    ],
                    "type": "edge_ngram"
                },
                "ngram_filter": {
                    "max_gram": "9",
                    "min_gram": "2",
                    "token_chars": [
                        "letter",
                        "digit",
                        "punctuation",
                        "symbol"
                    ],
                    "type": "ngram"
                }
            }
        }
    },
    "mappings": {
        "merimee": {
            "properties": {
                "REF": {
                    "type": "text",
                },
                "TICO": {
                    "type": "text",
                    "analyzer": "ngram_analyzer",
                    "search_analyzer": "ngram_analyzer",
                    "search_quote_analyzer": "my_analyzer"
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
}, function(err, mapping) {
    if (err) {
        // console.log('error creating mapping (you can safely ignore this)');
        // console.log(err);
    } else {
        console.log('mapping created!');
        // console.log(mapping);
    }
});

// object.createMapping({
//   "settings": {
//     "number_of_shards": 1,
//     "number_of_replicas": 0,
//     "analysis": {
//       "filter": {
//         "nGram_filter": {
//           "type": "nGram",
//           "min_gram": 2,
//           "max_gram": 20,
//           "token_chars": [
//             "letter",
//             "digit",
//             "punctuation",
//             "symbol"
//           ]
//         }
//       },
//       "analyzer": {
//         "nGram_analyzer": {
//           "type": "custom",
//           "tokenizer": "whitespace",
//           "filter": [
//             "lowercase",
//             "asciifolding",
//             "nGram_filter"
//           ]
//         },
//         "whitespace_analyzer": {
//           "type": "custom",
//           "tokenizer": "whitespace",
//           "filter": [
//             "lowercase",
//             "asciifolding"
//           ]
//         }
//       }
//     }
//   },
//   "mappings": {
//     "merimee": {
//       "_all": {
//         "analyzer": "nGram_analyzer",
//         "search_analyzer": "whitespace_analyzer"
//       },
//       "properties": {
//         "DMIS": {
//           "type": "text",
//         },
//         "DMAJ": {
//           "type": "text"
//         }
//       }
//     }
//   }
// }, function (err, mapping) {
//   if (err) {
//     console.log('error creating mapping (you can safely ignore this)');
//     console.log(err);
//   } else {
//     console.log('mapping created!');
//     console.log(mapping);
//   }
// });