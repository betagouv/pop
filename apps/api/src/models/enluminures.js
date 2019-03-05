const mongoose = require("mongoose");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    REF: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      documentation: { label: "Référence" }
    },
    ATTRIB: { type: String, default: "" },
    APPL: { type: String, default: "" },
    AUTR: { type: String, default: "" },
    AUTS: { type: String, default: "" },
    CONSERV: { type: String, default: "" },
    CONTXT: { type: String, default: "" },
    COTE: { type: String, default: "" },
    DATE: { type: String, default: "" },
    DATDEB: { type: String, default: "" },
    DATFIN: { type: String, default: "" },
    DIMS: { type: String, default: "" },
    ETAB: { type: String, default: "" },
    FOPG: { type: String, default: "" },
    FOLIOS: { type: String, default: "" },
    LANGOUV: { type: String, default: "" },
    NFICH: { type: String, default: "" },
    NVUE: { type: String, default: "" },
    NOMENC: { type: [String], default: [] },
    NOTES: { type: String, default: "" },
    NOTDEC: { type: String, default: "" },
    OPHOT: { type: String, default: "" },
    ORIGG: { type: String, default: "" },
    ORIGH: { type: String, default: "" },
    ORIGP: { type: String, default: "" },
    DOMN: { type: String, default: "" },
    TYPE: { type: String, default: "" },
    POSS: { type: [String], default: [] },
    REFD: { type: String, default: "" },
    REFIM: { type: String, default: "" },
    ENRGFP: { type: String, default: "" },
    ENRGMS: { type: String, default: "" },
    DROIT: { type: String, default: "" },
    COPY: { type: String, default: "" },
    SUJET: { type: String, default: "" },
    SUPP: { type: String, default: "" },
    TITR: { type: String, default: "" },
    TYPDEC: { type: String, default: "" },
    TYPCOD: { type: String, default: "" },
    LOCA: { type: String, default: "" },
    LOCA2: { type: String, default: "" },
    VISITE: { type: String, default: "" },
    VIDEO: { type: [String], default: [] },
    TOUT: { type: String, default: "" },
    IMG: { type: String, default: "" }
  },
  { collection: "enluminures" }
);

Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "enluminures",
  bulk: { size: 500, delay: 2000 }
});

const object = mongoose.model("enluminures", Schema);

module.exports = object;
