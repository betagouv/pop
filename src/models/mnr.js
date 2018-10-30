var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    PRODUCTEUR: { type: String, default: "MNR" },
    BASE: { type: String, default: "Oeuvres spoliées (MNR Rose-Valland)" },
    CONTIENT_IMAGE: { type: String, default: "non" },
    REF: { type: String, unique: true, index: true, trim: true },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    TOUT: { type: String, default: "" },
    AUTR: { type: [String], default: [] },
    PAUT: { type: String, default: "" },
    ATTR: { type: String, default: "" },
    ECOL: { type: String, default: "" },
    TITR: { type: String, default: "" },
    ATIT: { type: String, default: "" },
    PTIT: { type: String, default: "" },
    DENO: { type: [String], default: [] },
    DESC: { type: String, default: "" },
    DOMN: { type: [String], default: [] },
    LOCA: { type: String, default: "" },
    INSC: { type: String, default: "" },
    MARQ: { type: String, default: "" },
    OBSE: { type: String, default: "" },
    ETAT: { type: String, default: "" },
    GENE: { type: String, default: "" },
    PROV: { type: String, default: "" },
    HIST: { type: String, default: "" },
    HIST2: { type: String, default: "" },
    HIST3: { type: String, default: "" },
    HIST4: { type: String, default: "" },
    HIST5: { type: String, default: "" },
    HIST6: { type: String, default: "" },
    SCLE: { type: [String], default: [] },
    STYL: { type: String, default: "" },
    MILL: { type: String, default: "" },
    TECH: { type: [String], default: [] },
    DIMS: { type: [String], default: [] },
    VIDEO: { type: [String], default: [] },
    INV: { type: String, default: "" },
    EXPO: { type: String, default: "" },
    BIBL: { type: String, default: "" },
    AATT: { type: String, default: "" },
    AUTI: { type: String, default: "" },
    CATE: { type: String, default: "" },
    CATE_DEPREC: { type: String, default: "" },
    NOTE: { type: String, default: "" },
    REDC: { type: [String], default: [] },
    DREP: { type: String, default: "" },
    PREP: { type: String, default: "" },
    REPR: { type: String, default: "" },
    SREP: { type: String, default: "" },
    REFIM: { type: String, default: "" },
    DMAJ: { type: String, default: "" },
    AFFE: { type: String, default: "" },
    NUMS: { type: String, default: "" },
    SUITE: { type: String, default: "" },
    COMM: { type: String, default: "" },
    NOTE2: { type: String, default: "" },
    RESUME: { type: String, default: "" },
    PHOT: { type: String, default: "" }
  },
  { collection: "mnr" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "mnr",
  bulk: { size: 500, delay: 2000 }
});

const object = mongoose.model("mnr", Schema);

module.exports = object;
