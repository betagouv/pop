var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    PRODUCTEUR: { type: String, default: "MUSEE" },
    BASE: {
      type: String,
      default: "Collections des musées de France (Joconde)"
    },
    CONTIENT_IMAGE: { type: String, default: "" },
    REF: { type: String, unique: true, index: true, trim: true },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    REFMIS: { type: String, default: "" },
    ADPT: { type: [String], default: [] },
    APPL: { type: [String], default: [] },
    APTN: { type: String, default: "" },
    ATTR: { type: String, default: "" },
    AUTR: { type: String, default: "" },
    BIBL: { type: String, default: "" },
    COMM: { type: String, default: "" },
    CONTACT: { type: String, default: "" },
    COOR: { type: String, default: "" },
    COPY: { type: String, default: "" },
    DACQ: { type: String, default: "" },
    DATA: { type: String, default: "" },
    DATION: { type: String, default: "" },
    DDPT: { type: String, default: "" },
    DECV: { type: String, default: "" },
    DENO: { type: [String], default: [] },
    DEPO: { type: String, default: "" },
    DESC: { type: String, default: "" },
    DESY: { type: String, default: "" },
    DIFFU: { type: String, default: "" },
    DIMS: { type: String, default: "" },
    DMAJ: { type: String, default: "" },
    DMIS: { type: String, default: "" },
    DOMN: { type: [String], default: [] },
    DREP: { type: String, default: "" },
    ECOL: { type: [String], default: [] },
    EPOQ: { type: [String], default: [] },
    ETAT: { type: [String], default: [] },
    EXPO: { type: String, default: "" },
    GENE: { type: [String], default: [] },
    GEOHI: { type: [String], default: [] },
    HIST: { type: String, default: "" },
    IMAGE: { type: String, default: "" },
    IMG: { type: [String], default: [] },
    INSC: { type: [String], default: [] },
    INV: { type: String, default: "" },
    LABEL: {
      type: String,
      default: "Musée de France au sens de la loi n°2002-5 du 4 janvier 2002"
    },
    LABO: { type: String, default: "" },
    LARC: { type: String, default: "" },
    LIEUX: { type: String, default: "" },
    LOCA: { type: String, default: "" },
    LOCA2: { type: String, default: "" },
    LOCA3: { type: String, default: "" },
    MILL: { type: [String], default: [] },
    MILU: { type: String, default: "" },
    MOSA: { type: String, default: "" },
    MSGCOM: { type: String, default: "" },
    MUSEO: { type: String, default: "" },
    NSDA: { type: String, default: "" },
    ONOM: { type: [String], default: [] },
    PAUT: { type: String, default: "" },
    PDAT: { type: String, default: "" },
    PDEC: { type: String, default: "" },
    PEOC: { type: [String], default: [] },
    PERI: { type: [String], default: [] },
    PERU: { type: [String], default: [] },
    PHOT: { type: String, default: "" },
    PINS: { type: String, default: "" },
    PLIEUX: { type: String, default: "" },
    PREP: { type: [String], default: [] },
    PUTI: { type: String, default: "" },
    RANG: { type: String, default: "" },
    REDA: { type: [String], default: [] },
    REFIM: { type: String, default: "" },
    REPR: { type: String, default: "" },
    RETIF: { type: String, default: "" },
    SREP: { type: [String], default: [] },
    STAT: { type: [String], default: [] },
    TECH: { type: [String], default: [] },
    TICO: { type: String, default: "" },
    TITR: { type: String, default: "" },
    TOUT: { type: String, default: "" },
    UTIL: { type: [String], default: [] },
    VIDEO: { type: [String], default: [] },
    WWW: { type: String, default: "" },
    LVID: { type: String, default: "" }
  },
  { collection: "joconde" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "joconde"
});

Schema.pre("save", function(next, done) {
  this.CONTIENT_IMAGE = this.IMG ? "oui" : "non";
  next();
});

const object = mongoose.model("joconde", Schema);

module.exports = object;
