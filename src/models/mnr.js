var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    PRODUCTEUR: {
      type: String,
      default: "MNR",
      documentation: {
        description: "Producteur de la donnée : Valeur MNR",
        master: true
      }
    },
    BASE: {
      type: String,
      default: "Récupération artistique (MNR Rose-Valland)",
      documentation: {
        description:
          "Nom de la base : Valeur Récupération artistique (MNR Rose-Valland)",
        master: true
      }
    },
    CONTIENT_IMAGE: {
      type: String,
      default: "non",
      documentation: {
        description:
          "Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES",
        master: true
      }
    },
    REF: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      documentation: {
        description: "Référence unique de la notice",
        master: true
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    TOUT: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: true }
    },
    AUTR: {
      type: [String],
      default: [],
      documentation: {
        description: "Auteur /exécutant / collecteur",
        master: true
      }
    },
    PAUT: {
      type: String,
      default: "",
      documentation: { description: "Precisions auteur", master: true }
    },
    ATTR: {
      type: String,
      default: "",
      documentation: { description: "Anciennes attributions", master: true }
    },
    ECOL: {
      type: String,
      default: "",
      documentation: { description: "Ecole ", master: true }
    },
    TITR: {
      type: String,
      default: "",
      documentation: { description: "Titre ", master: true }
    },
    ATIT: {
      type: String,
      default: "",
      documentation: { description: "Ancien titre", master: true }
    },
    PTIT: {
      type: String,
      default: "",
      documentation: { description: "Précision titre", master: true }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: { description: "Dénomination du bien", master: true }
    },
    DESC: {
      type: String,
      default: "",
      documentation: { description: "Description ", master: true }
    },
    DOMN: {
      type: [String],
      default: [],
      documentation: {
        description: "Domaine (catégorie du bien)",
        master: true
      }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: { description: "Localisation ", master: true }
    },
    INSC: {
      type: String,
      default: "",
      documentation: { description: "Inscriptions ", master: true }
    },
    MARQ: {
      type: String,
      default: "",
      documentation: { description: "Marques ", master: true }
    },
    OBSE: {
      type: String,
      default: "",
      documentation: { description: "Observations ", master: true }
    },
    ETAT: {
      type: String,
      default: "",
      documentation: { description: "Etat de conservation", master: true }
    },
    GENE: {
      type: String,
      default: "",
      documentation: { description: "Genèse ", master: true }
    },
    PROV: {
      type: String,
      default: "",
      documentation: { description: "Provenance ", master: true }
    },
    HIST: {
      type: String,
      default: "",
      documentation: { description: "Historique ", master: true }
    },
    HIST2: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: true }
    },
    HIST3: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: true }
    },
    HIST4: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: true }
    },
    HIST5: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: true }
    },
    HIST6: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: true }
    },
    SCLE: {
      type: [String],
      default: [],
      documentation: { description: "Siècle ", master: true }
    },
    STYL: {
      type: String,
      default: "",
      documentation: { description: "Style ", master: true }
    },
    MILL: {
      type: String,
      default: "",
      documentation: { description: "Millenaire ", master: true }
    },
    TECH: {
      type: [String],
      default: [],
      documentation: { description: "Technique ", master: true }
    },
    DIMS: {
      type: [String],
      default: [],
      documentation: { description: "Dimensions ", master: true }
    },
    VIDEO: {
      type: [String],
      default: [],
      documentation: { description: "[PAS AFFICHE]", master: true }
    },
    INV: {
      type: String,
      default: "",
      documentation: {
        description:
          "N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt",
        master: true
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: { description: "Exposition ", master: true }
    },
    BIBL: {
      type: String,
      default: "",
      documentation: { description: "Bibliographie ", master: true }
    },
    AATT: {
      type: String,
      default: "",
      documentation: { description: "Ancienne attribution", master: true }
    },
    AUTI: {
      type: String,
      default: "",
      documentation: { description: "Autre titre", master: true }
    },
    CATE: {
      type: String,
      default: "",
      documentation: { description: "Catégorie ", master: true }
    },
    CATE_DEPREC: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: true }
    },
    NOTE: {
      type: String,
      default: "",
      documentation: { description: "Notes ", master: true }
    },
    REDC: {
      type: [String],
      default: [],
      documentation: { description: "Rédacteurs ", master: true }
    },
    DREP: {
      type: String,
      default: "",
      documentation: { description: "Date de la représentation", master: true }
    },
    PREP: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur la représentation",
        master: true
      }
    },
    REPR: {
      type: String,
      default: "",
      documentation: { description: "Représentation ", master: true }
    },
    SREP: {
      type: String,
      default: "",
      documentation: {
        description:
          "Sujet de la représentation (source littéraire ou musicale) ",
        master: true
      }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: {
        description:
          "Adresses images jointes générique (actuellement non utilisé)",
        master: true
      }
    },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la dernière mise à jour",
        master: true
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la création POP/Mistral",
        master: true
      }
    },
    AFFE: {
      type: String,
      default: "",
      documentation: {
        description:
          "Etablissement affectataire qui existe dans d’autres bases",
        master: true
      }
    },
    NUMS: {
      type: String,
      default: "",
      documentation: { description: "Autres numéros", master: true }
    },
    SUITE: {
      type: String,
      default: "",
      documentation: { description: "OEuvres liées, ensemble", master: true }
    },
    COMM: {
      type: String,
      default: "",
      documentation: { description: "Commentaire ", master: true }
    },
    NOTE2: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: true }
    },
    RESUME: {
      type: String,
      default: "",
      documentation: { description: "Résumé ", master: true }
    },
    PHOT: {
      type: String,
      default: "",
      documentation: { description: "Droits de copie photo ", master: true }
    }
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
