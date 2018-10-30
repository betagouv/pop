var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");
const Schema = new mongoose.Schema(
  {
    PRODUCTEUR: { type: String, default: "" },
    BASE: { type: String, default: "Photographies (Mémoire)" },
    CONTIENT_IMAGE: { type: String, default: "" },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    REF: { type: String, unique: true, index: true, trim: true },
    TOUT: { type: String, default: "" },
    ADRESSE: { type: String, default: "" },
    AUTOEU: { type: String, default: "" },
    AUTG: { type: String, default: "" },
    AUTP: { type: String, default: "" },
    AUTOR: { type: String, default: "" },
    AUTTI: { type: String, default: "" },
    COM: { type: String, default: "" },
    DOM: { type: String, default: "" },
    EDIF: { type: String, default: "" },
    EXPO: { type: String, default: "" },
    JDATPV: { type: String, default: "" },
    LIEUCOR: { type: String, default: "" },
    COTECOR: { type: String, default: "" },
    LIEUCTI: { type: String, default: "" },
    COTECTI: { type: String, default: "" },
    LIEUCP: { type: String, default: "" },
    COTECP: { type: String, default: "" },
    LEG: { type: String, default: "" },
    OBJT: { type: String, default: "" },
    OBS: { type: String, default: "" },
    OBSOR: { type: String, default: "" },
    OBSTI: { type: String, default: "" },
    PAYS: { type: String, default: "" },
    PUBLI: { type: String, default: "" },
    TIREDE: { type: String, default: "" },
    ROLE: { type: String, default: "" },
    PRECOR: { type: String, default: "" },
    SERIE: { type: String, default: "" },
    THEATRE: { type: String, default: "" },
    TITRE: { type: String, default: "" },
    DMAJ: { type: String, default: "" },
    DMIS: { type: String, default: "" },
    IDPROD: { type: String, default: "" },
    NUMCD: { type: String, default: "" },
    NUMF: { type: String, default: "" },
    INSEE: { type: String, default: "" },
    NVD: { type: String, default: "" },
    MARQ: { type: String, default: "" },
    ACC: { type: String, default: "" },
    ACQU: { type: String, default: "" },
    ADPHOT: { type: String, default: "" },
    AIRE: { type: String, default: "" },
    ANUMP: { type: String, default: "" },
    COPY: { type: String, default: "" },
    COULEUR: { type: String, default: "" },
    COSTUME: { type: String, default: "" },
    DATIMM: { type: String, default: "" },
    DATOEU: { type: String, default: "" },
    DATPV: { type: String, default: "" },
    DATOR: { type: String, default: "" },
    DATTI: { type: String, default: "" },
    DATG: { type: String, default: "" },
    DATD: { type: String, default: "" },
    DIFF: { type: String, default: "" },
    DPT: { type: String, default: "" },
    EDIARCH: { type: String, default: "" },
    ECH: { type: String, default: "" },
    FORMAT: { type: String, default: "" },
    FORMATOR: { type: String, default: "" },
    FORMATTI: { type: String, default: "" },
    LBASE: { type: String, index: true, default: "" },
    WEB: { type: String, default: "" },
    LIB: { type: String, default: "" },
    LOCA: { type: String, default: "" },
    LIEUORIG: { type: String, default: "" },
    MCGEO: { type: String, default: "" },
    MCL: { type: String, default: "" },
    MENTIONS: { type: String, default: "" },
    MENTOR: { type: String, default: "" },
    MENTTI: { type: String, default: "" },
    MCPER: { type: String, default: "" },
    VUECD: { type: String, default: "" },
    NUMAUTP: { type: String, default: "" },
    NUMCAF: { type: String, default: "" },
    ANUMOR: { type: String, default: "" },
    NUMOR: { type: String, default: "" },
    NUMP: { type: String, default: "" },
    ANUMTI: { type: String, default: "" },
    NUMTI: { type: String, default: "" },
    RENV: { type: String, default: "" },
    REG: { type: String, default: "" },
    SENS: { type: String, default: "" },
    SCLE: { type: String, default: "" },
    SUP: { type: String, default: "" },
    TECH: { type: String, default: "" },
    TECHOR: { type: String, default: "" },
    TECHTI: { type: String, default: "" },
    TOILE: { type: String, default: "" },
    TYP: { type: String, default: "" },
    TYPDOC: { type: String, default: "" },
    TYPEIMG: { type: String, default: "" },
    TYPSUPP: { type: String, default: "" },
    VIDEO: { type: String, default: "" },
    LBASE2: { type: String, default: "" },
    LEG2: { type: String, default: "" },
    REFIM: { type: String, default: "" },
    REFIMG: { type: String, default: "" },
    MOSA: { type: String, default: "" },
    SITE: { type: String, default: "" },
    NUMSITE: { type: String, default: "" },
    NUMOP: { type: String, default: "" },
    CHRONO: { type: String, default: "" },
    STRUCT: { type: String, default: "" },
    SUJET: { type: String, default: "" },
    TICO: { type: String, default: "" },
    NUMI: { type: String, default: "" },
    LIEU: { type: String, default: "" },
    ADRS: { type: String, default: "" },
    CONTACT: { type: String, default: "" },
    EMET: { type: String, default: "" },
    NUM: { type: String, default: "" },
    IMG: { type: String, default: "" },
    WCOM: { type: String, default: "" },
    LIENS: { type: String, default: "" },
    LAUTP: { type: String, default: "" }
  },
  { collection: "memoire" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "memoire",
  bulk: { size: 500, delay: 2000 }
});

Schema.pre("save", function(next, done) {
  switch (this.REF.substring(0, 2)) {
    case "IV":
      this.PRODUCTEUR = "INV";
      break;
    case "OA":
      this.PRODUCTEUR = "CAOA";
      break;
    case "MH":
      this.PRODUCTEUR = "CRMH";
      break;
    case "AR":
      this.PRODUCTEUR = "ARCH";
      break;
    case "AP":
      this.PRODUCTEUR = "SDAP";
      break;
    default:
      this.PRODUCTEUR = "SAP";
      break;
  }

  this.CONTIENT_IMAGE = this.IMG ? "oui" : "non";
  next();
});

const object = mongoose.model("memoire", Schema);

module.exports = object;
