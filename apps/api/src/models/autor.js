const mongoose = require("mongoose");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    REF: {
      type: String,
      default: "",
      unique: true,
      index: true,
      trim: true,
      required: true,
      documentation: { label: "Référence" }
    },
    ISNI: { type: String, default: "", documentation: { label: "Référence ISNI (ajouté)" } },
    ISNI_VERIFIEE: {
      type: String,
      default: "non",
      documentation: { label: "Référence ISNI a-t-elle été vérifiée" }
    },
    ALIAS: { type: [String], default: [], documentation: { label: "Alias (ajouté)" } },
    BIBLIO: { type: [String], default: [], documentation: { label: "Bibliographie" } },
    BIO: { type: String, default: "", documentation: { label: "Biographie" } },
    CONTACT: { type: String, default: "", documentation: { label: "Contact" } },
    COPY: { type: String, default: "", documentation: { label: "Copyright" } },
    DMORT: { type: String, default: "", documentation: { label: "Date mort" } },
    DNAISS: { type: String, default: "", documentation: { label: "Date naissance" } },
    EXPO: { type: [String], default: [], documentation: { label: "Expositions sur l'auteur" } },
    FONC: { type: [String], default: [], documentation: { label: "Fonctions" } },
    VIDEO: { type: String, default: "", documentation: { label: "VIDEO" } },
    LIENS: { type: [String], default: [], documentation: { label: "Liens" } },
    LWEB: { type: String, default: "", documentation: { label: "LWEB" } },
    LMDP: { type: String, default: "", documentation: { label: "LMDP" } },
    LMEM: { type: String, default: "", documentation: { label: "LMEM" } },
    LMORT: { type: String, default: "", documentation: { label: "LMORT" } },
    LNAISS: { type: String, default: "", documentation: { label: "LNAISS" } },
    RESID: { type: [String], default: [], documentation: { label: "Résidences" } },
    NATIO: { type: [String], default: [], documentation: { label: "Nationnalitées" } },
    NOM: { type: String, default: "", documentation: { label: "Nom" } },
    PNOM: { type: String, default: "", documentation: { label: "Prénom" } },
    TYPAPE: { type: String, default: "", documentation: { label: "TYPAPE" } },
    REJET: { type: String, default: "", documentation: { label: "Rejet" } },
    OEUVR: { type: [String], default: [], documentation: { label: "Oeuvres" } },
    PUBLI: { type: [String], default: [], documentation: { label: "Publications" } },
    ALAMAP: { type: [String], default: [], documentation: { label: "ALAMAP" } },
    EMET: { type: String, default: "", documentation: { label: "EMET" } },
    REDAC: { type: [String], default: [], documentation: { label: "Rédactions" } },
    LRELA: { type: [String], default: [], documentation: { label: "Relations" } },
    SEXE: { type: String, default: "", documentation: { label: "Sexe" } },
    SOCSAV: { type: [String], default: [], documentation: { label: "SOCSAV ?" } },
    SOURCES: { type: [String], default: [], documentation: { label: "SOURCES" } },
    STAT: { type: String, default: "", documentation: { label: "STAT" } },
    TITR: { type: [String], default: [], documentation: { label: "Titres" } },
    TYPID: { type: String, default: "", documentation: { label: "TYPID" } },
    IDENT: { type: String, default: "", documentation: { label: "IDENT" } },
    ARK: { type: String, default: "", documentation: { label: "ARK" } },
    OBSMAP: { type: String, default: "", documentation: { label: "OBSMAP" } },
    OBSMAP: { type: String, default: "", documentation: { label: "OBSMAP" } },

    DMAJ: {
      type: String,
      default: "",
      documentation: {
        label: "Date de la dernière mise à jour",
        generated: true
      }
    },
    POP_FLAGS: {
      type: [String],
      default: [],
      documentation: {
        description: "Informations et avertissements techniques",
        label: "Alertes POP",
        generated: true
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        label: "Date de chargement dans la base ",
        generated: true
      }
    }
  },
  { collection: "autor" }
);

Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "autor",
  bulk: { size: 500, delay: 2000 }
});

const object = mongoose.model("autor", Schema);

module.exports = object;
