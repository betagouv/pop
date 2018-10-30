var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    REF: { type: String, unique: true, index: true, trim: true },
    PRODUCTEUR: { type: String, default: "" },
    BASE: { type: String, default: "Patrimoine architectural (Mérimée)" },
    CONTIENT_IMAGE: { type: String, default: "" },
    MEMOIRE: [{ ref: String, url: String }],
    POP_COORDONNEES: {
      lat: { type: Number },
      lon: { type: Number }
    },
    POP_CONTIENT_GEOLOCALISATION: {
      type: String,
      enum: ["oui", "non"],
      default: "non"
    },
    POP_COORDINATES_POLYGON: {
      type: { type: String, enum: ["Polygon"], default: "Polygon" },
      coordinates: [[{ type: [Number] }]]
    },
    POP_DATE: { type: [Number], default: [] },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    TOUT: { type: String, default: "" },
    ACTU: { type: String, default: "" },
    ADRS: { type: String, default: "" },
    AFFE: { type: String, default: "" },
    AIRE: { type: String, default: "" },
    APPL: { type: String, default: "" },
    APRO: { type: [String], default: [] },
    ARCHEO: { type: String, default: "" },
    AUTP: { type: [String], default: [] },
    AUTR: { type: [String], default: [] },
    CADA: { type: [String], default: [] },
    CANT: { type: String, default: "" },
    COLL: { type: [String], default: [] },
    COM: { type: String, default: "" },
    COOR: { type: String, default: "" },
    COORM: { type: String, default: "" },
    COPY: { type: [String], default: [] },
    COUV: { type: [String], default: [] },
    DATE: { type: [String], default: [] },
    DBOR: { type: String, default: "" },
    DOMN: { type: [String], default: [] },
    DENO: { type: [String], default: [] },
    DENQ: { type: String, default: "" },
    DEPL: { type: String, default: "" },
    DESC: { type: String, default: "" },
    DIMS: { type: String, default: "" },
    DMAJ: { type: String, default: "", es_type: "keyword" }, // The format of date is not a date object everywhere. I cant translate it to date without a deepclean
    DMIS: { type: String, default: "", es_type: "keyword" }, // The format of date is not a date object everywhere. I cant translate it to date without a deepclean
    DOSS: { type: String, default: "" },
    DPRO: { type: String, default: "" },
    DPT: { type: String, default: "" },
    EDIF: { type: String, default: "" },
    ELEV: { type: [String], default: [] },
    ENER: { type: [String], default: [] },
    ESCA: { type: [String], default: [] },
    ETAG: { type: [String], default: [] },
    ETAT: { type: String, default: "" },
    ETUD: { type: String, default: "" },
    GENR: { type: String, default: "" },
    HIST: { type: String, default: "" },
    HYDR: { type: String, default: "" },
    IMPL: { type: [String], default: [] },
    INSEE: { type: String, default: "" },
    INTE: { type: [String], default: [] },
    JATT: { type: [String], default: [] },
    JDAT: { type: [String], default: [] },
    LBASE2: { type: String, default: "" },
    LIEU: { type: String, default: "" },
    LOCA: { type: String, default: "" },
    MFICH: { type: String, default: "" },
    MOSA: { type: String, default: "" },
    MHPP: { type: String, default: "" },
    MICR: { type: String, default: "" },
    MURS: { type: [String], default: [] },
    NBOR: { type: String, default: "" },
    NOMS: { type: [String], default: [] },
    OBS: { type: String, default: "" },
    PAFF: { type: String, default: "" },
    PART: { type: [String], default: [] },
    PARN: { type: [String], default: [] },
    PDEN: { type: String, default: "" },
    PERS: { type: [String], default: [] },
    PLAN: { type: String, default: "" },
    PLOC: { type: String, default: "" },
    PPRO: { type: String, default: "" },
    PREP: { type: [String], default: [] },
    PROT: { type: [String], default: [] },
    PSTA: { type: String, default: "" },
    REFE: { type: [String], default: [] },
    REFP: { type: [String], default: [] },
    REFO: { type: [String], default: [] },
    REFO: { type: [String], default: [] },
    REG: { type: String, default: "" },
    REMA: { type: String, default: "" },
    REMP: { type: String, default: "" },
    RENV: { type: [String], default: [] },
    REPR: { type: String, default: "" },
    RFPA: { type: String, default: "" },
    SCLD: { type: [String], default: [] },
    SCLE: { type: [String], default: [] },
    SCLX: { type: [String], default: [] },
    SITE: { type: String, default: "" },
    STAT: { type: String, default: "" },
    TECH: { type: [String], default: [] },
    TICO: { type: String, default: "" },
    TOIT: { type: [String], default: [] },
    TYPO: { type: String, default: "" },
    VERT: { type: String, default: "" },
    REFIM: { type: String, default: "" },
    IMG: { type: [String], default: [] },
    VIDEO: { type: String, default: "" },
    DOSURL: { type: String, default: "" },
    DOSURLPDF: { type: String, default: "" },
    DOSADRS: { type: String, default: "" },
    LIENS: { type: [String], default: [] },
    IMAGE: { type: String, default: "" },
    VISI: { type: [String], default: [] },
    VOCA: { type: String, default: "" },
    VOUT: { type: [String], default: [] },
    WEB: { type: String, default: "" },
    ZONE: { type: String, default: "" },
    THEM: { type: String, default: "" },
    ACMH: { type: String, default: "" },
    ACURL: { type: String, default: "" },
    WADRS: { type: String, default: "" },
    WCOM: { type: String, default: "" },
    WRENV: { type: String, default: "" },
    REFM: { type: String, default: "" },
    CONTACT: { type: String, default: "" },
    IDAGR: { type: String, default: "" },
    LMDP: { type: String, default: "" },
    PINT: { type: String, default: "" },
    DLAB: { type: String, default: "" }
  },
  { collection: "merimee" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "merimee"
});

Schema.pre("save", function(next, done) {
  switch (this.REF.substring(0, 2)) {
    case "IA":
      this.DISCIPLINE = this.PRODUCTEUR = "Inventaire";
      break;
    case "PA":
      this.DISCIPLINE = this.PRODUCTEUR = "Monument Historique";
      break;
    case "EA":
      this.DISCIPLINE = this.PRODUCTEUR = "Architecture";
      break;
    default:
      this.DISCIPLINE = this.PRODUCTEUR = "Null";
      break;
  }

  this.CONTIENT_IMAGE = this.IMG ? "oui" : "non";
  next();
});

const object = mongoose.model("merimee", Schema);

module.exports = object;
