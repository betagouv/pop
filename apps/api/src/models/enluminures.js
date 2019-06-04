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
    BASE: {
      type: String,
      default: "Enluminures (Enluminures)",
      documentation: {
        description: "Nom de la base : Enluminures (Enluminures)",
        generated: true,
        label: "Nom de la base"
      }
    },
    CONTIENT_IMAGE: {
      type: String,
      default: "",
      documentation: {
        description:
          "Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champ sera 'oui', sinon 'non'. Ce champ est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES",
        generated: true,
        label: "Contient une image"
      }
    },
    ATTRIB: {
      type: String,
      default: "",
      documentation: { label: "Auteur de l'oeuvre ou de l'original" }
    },
    APPL: { type: String, default: "", documentation: { label: "" } },
    AUTR: { type: String, default: "", documentation: { label: "" } },
    AUTS: { type: String, default: "", documentation: { label: "" } },
    CONSERV: { type: String, default: "", documentation: { label: "" } },
    CONTXT: { type: String, default: "", documentation: { label: "Contexte" } },
    COTE: { type: String, default: "", documentation: { label: "" } },
    DATE: { type: String, default: "", documentation: { label: "Datation" } },
    DATDEB: { type: String, default: "", documentation: { label: "" } },
    DATFIN: { type: String, default: "", documentation: { label: "" } },
    DIMS: { type: String, default: "", documentation: { label: "" } },
    ETAB: { type: String, default: "", documentation: { label: "" } },
    FOPG: { type: String, default: "", documentation: { label: "" } },
    FOLIOS: { type: String, default: "", documentation: { label: "" } },
    LANGOUV: { type: String, default: "", documentation: { label: "" } },
    NFICH: { type: String, default: "", documentation: { label: "" } },
    NVUE: { type: String, default: "", documentation: { label: "" } },
    NOMENC: { type: [String], default: [], documentation: { label: "Domaine" } },
    NOTES: { type: String, default: "", documentation: { label: "Notes manuscrit" } },
    NOTDEC: { type: String, default: "", documentation: { label: "Remarques sur le décors" } },
    OPHOT: { type: String, default: "", documentation: { label: "" } },
    ORIGG: { type: String, default: "", documentation: { label: "Origine géographique" } },
    ORIGH: { type: String, default: "", documentation: { label: "Origine historique" } },
    ORIGP: { type: String, default: "", documentation: { label: "" } },
    DOMN: { type: String, default: "", documentation: { label: "" } },
    TYPE: { type: String, default: "", documentation: { label: "" } },
    POSS: { type: [String], default: [], documentation: { label: "Possesseur" } },
    REFD: { type: String, default: "", documentation: { label: "Cote" } },
    REFIM: { type: String, default: "", documentation: { label: "" } },
    ENRGFP: { type: String, default: "", documentation: { label: "" } },
    ENRGMS: { type: String, default: "", documentation: { label: "" } },
    DROIT: { type: String, default: "", documentation: { label: "Crédits photographiques" } },
    COPY: { type: String, default: "", documentation: { label: "Copyright notice" } },
    SUJET: { type: String, default: "", documentation: { label: "Titre de l'enluminure / Sujet" } },
    SUPP: { type: String, default: "", documentation: { label: "" } },
    TITR: { type: String, default: "", documentation: { label: "Titre de l'ouvrage" } },
    TYPDEC: { type: String, default: "", documentation: { label: "Typologie du décors" } },
    TYPCOD: { type: String, default: "", documentation: { label: "" } },
    LOCA: { type: String, default: "", documentation: { label: "" } },
    LOCA2: { type: String, default: "", documentation: { label: "" } },
    VISITE: { type: String, default: "", documentation: { label: "" } },
    VIDEO: { type: [String], default: [], documentation: { label: "" } },
    TOUT: { type: String, default: "", documentation: { label: "" } },
    IMG: { type: String, default: "" },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "Date de mise à jour (format AAAA-MM-JJ)",
        generated: true,
        label: "Date de mise à jour"
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la création (format AAAA-MM-JJ)",
        generated: true,
        label: "Date de création"
      }
    }
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
