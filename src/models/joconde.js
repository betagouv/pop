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

const object = mongoose.model("joconde", Schema);

// object.createMapping(
//   {
//     mappings: {
//       joconde: {
//         properties: {
//           TICO: { type: "text", analyzer: "french" },
//           TITR: { type: "text", analyzer: "french" },
//           PRODUCTEUR: {
//             type: "text",
//             fields: { keyword: { type: "keyword" } }
//           },
//           BASE: { type: "text", fields: { keyword: { type: "keyword" } } },
//           CONTIENT_IMAGE: {
//             type: "text",
//             fields: { keyword: { type: "keyword" } }
//           },
//           REF: { type: "text", fields: { keyword: { type: "keyword" } } },
//           REFMIS: { type: "text", fields: { keyword: { type: "keyword" } } },
//           ADPT: { type: "text", fields: { keyword: { type: "keyword" } } },
//           APPL: { type: "text", fields: { keyword: { type: "keyword" } } },
//           APTN: { type: "text", fields: { keyword: { type: "keyword" } } },
//           ATTR: { type: "text", fields: { keyword: { type: "keyword" } } },
//           AUTR: { type: "text", fields: { keyword: { type: "keyword" } } },
//           BIBL: { type: "text", fields: { keyword: { type: "keyword" } } },
//           COMM: { type: "text", fields: { keyword: { type: "keyword" } } },
//           CONTACT: { type: "text", fields: { keyword: { type: "keyword" } } },
//           COOR: { type: "text", fields: { keyword: { type: "keyword" } } },
//           COPY: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DACQ: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DATA: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DATION: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DDPT: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DECV: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DENO: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DEPO: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DESC: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DESY: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DIFFU: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DIMS: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DMAJ: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DMIS: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DOMN: { type: "text", fields: { keyword: { type: "keyword" } } },
//           DREP: { type: "text", fields: { keyword: { type: "keyword" } } },
//           ECOL: { type: "text", fields: { keyword: { type: "keyword" } } },
//           EPOQ: { type: "text", fields: { keyword: { type: "keyword" } } },
//           ETAT: { type: "text", fields: { keyword: { type: "keyword" } } },
//           EXPO: { type: "text", fields: { keyword: { type: "keyword" } } },
//           GENE: { type: "text", fields: { keyword: { type: "keyword" } } },
//           GEOHI: { type: "text", fields: { keyword: { type: "keyword" } } },
//           HIST: { type: "text", fields: { keyword: { type: "keyword" } } },
//           IMAGE: { type: "text", fields: { keyword: { type: "keyword" } } },
//           IMG: { type: "text", fields: { keyword: { type: "keyword" } } },
//           INSC: { type: "text", fields: { keyword: { type: "keyword" } } },
//           INV: { type: "text", fields: { keyword: { type: "keyword" } } },
//           LABEL: { type: "text", fields: { keyword: { type: "keyword" } } },
//           LABO: { type: "text", fields: { keyword: { type: "keyword" } } },
//           LARC: { type: "text", fields: { keyword: { type: "keyword" } } },
//           LIEUX: { type: "text", fields: { keyword: { type: "keyword" } } },
//           LOCA: { type: "text", fields: { keyword: { type: "keyword" } } },
//           LOCA2: { type: "text", fields: { keyword: { type: "keyword" } } },
//           LOCA3: { type: "text", fields: { keyword: { type: "keyword" } } },
//           MILL: { type: "text", fields: { keyword: { type: "keyword" } } },
//           MILU: { type: "text", fields: { keyword: { type: "keyword" } } },
//           MOSA: { type: "text", fields: { keyword: { type: "keyword" } } },
//           MSGCOM: { type: "text", fields: { keyword: { type: "keyword" } } },
//           MUSEO: { type: "text", fields: { keyword: { type: "keyword" } } },
//           NSDA: { type: "text", fields: { keyword: { type: "keyword" } } },
//           ONOM: { type: "text", fields: { keyword: { type: "keyword" } } },
//           PAUT: { type: "text", fields: { keyword: { type: "keyword" } } },
//           PDAT: { type: "text", fields: { keyword: { type: "keyword" } } },
//           PDEC: { type: "text", fields: { keyword: { type: "keyword" } } },
//           PEOC: { type: "text", fields: { keyword: { type: "keyword" } } },
//           PERI: { type: "text", fields: { keyword: { type: "keyword" } } },
//           PERU: { type: "text", fields: { keyword: { type: "keyword" } } },
//           PHOT: { type: "text", fields: { keyword: { type: "keyword" } } },
//           PINS: { type: "text", fields: { keyword: { type: "keyword" } } },
//           PLIEUX: { type: "text", fields: { keyword: { type: "keyword" } } },
//           PREP: { type: "text", fields: { keyword: { type: "keyword" } } },
//           PUTI: { type: "text", fields: { keyword: { type: "keyword" } } },
//           RANG: { type: "text", fields: { keyword: { type: "keyword" } } },
//           REDA: { type: "text", fields: { keyword: { type: "keyword" } } },
//           REFIM: { type: "text", fields: { keyword: { type: "keyword" } } },
//           REPR: { type: "text", fields: { keyword: { type: "keyword" } } },
//           RETIF: { type: "text", fields: { keyword: { type: "keyword" } } },
//           SREP: { type: "text", fields: { keyword: { type: "keyword" } } },
//           STAT: { type: "text", fields: { keyword: { type: "keyword" } } },
//           TECH: { type: "text", fields: { keyword: { type: "keyword" } } },
//           TOUT: { type: "text", fields: { keyword: { type: "keyword" } } },
//           UTIL: { type: "text", fields: { keyword: { type: "keyword" } } },
//           VIDEO: { type: "text", fields: { keyword: { type: "keyword" } } },
//           WWW: { type: "text", fields: { keyword: { type: "keyword" } } },
//           LVID: { type: "text", fields: { keyword: { type: "keyword" } } }
//         }
//       }
//     }
//   },
//   function(err, mapping) {
//     if (err) {
//       console.log("error mapping created", err);
//       return;
//     }
//   }
// );

module.exports = object;
