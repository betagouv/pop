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
        master: true,
        deprecated: true
      }
    },
    REF: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      documentation: {
        description: "Référence unique de la notice",
        master: true,
        validation: "Alphanumeric",
        label: "Référence"
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: true,
        label: "",
        deprecated: true
      }
    },
    AUTR: {
      type: [String],
      default: [],
      documentation: {
        description: "Auteur / exécutant / collecteur",
        master: true,
        label: "Auteur / exécutant / collecteur"
      }
    },
    PAUT: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions auteur",
        master: true,
        label: "Précisions auteur"
      }
    },
    ATTR: {
      type: String,
      default: "",
      documentation: {
        description: "Anciennes attributions",
        master: true,
        label: "Anciennes attributions"
      }
    },
    ECOL: {
      type: String,
      default: "",
      documentation: { description: "Ecole ", master: true, label: "Ecole" }
    },
    TITR: {
      type: String,
      default: "",
      documentation: { description: "Titre ", master: true, label: "Titre" }
    },
    ATIT: {
      type: String,
      default: "",
      documentation: {
        description: "Ancien titre",
        master: true,
        label: "Ancien titre"
      }
    },
    PTIT: {
      type: String,
      default: "",
      documentation: {
        description: "Précision titre",
        master: true,
        label: "Précision titre"
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: {
        description: "Dénomination du bien",
        master: true,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T96",
        label: "Dénomination du bien"
      }
    },
    DESC: {
      type: String,
      default: "",
      documentation: {
        description: "Description ",
        master: true,
        label: "Description"
      }
    },
    DOMN: {
      type: [String],
      default: [],
      documentation: {
        description: "Domaine (catégorie du bien)",
        master: true,
        label: "Domaine (catégorie du bien)"
      }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: {
        description: "Localisation ",
        master: true,
        label: "Localisation"
      }
    },
    INSC: {
      type: String,
      default: "",
      documentation: {
        description: "Inscriptions ",
        master: true,
        label: "Inscriptions"
      }
    },
    MARQ: {
      type: String,
      default: "",
      documentation: { description: "Marques ", master: true, label: "Marques" }
    },
    OBSE: {
      type: String,
      default: "",
      documentation: {
        description: "Observations ",
        master: true,
        label: "Observations"
      }
    },
    ETAT: {
      type: String,
      default: "",
      documentation: {
        description: "Etat de conservation",
        master: true,
        label: "Etat de conservation"
      }
    },
    GENE: {
      type: String,
      default: "",
      documentation: { description: "Genèse ", master: true, label: "Genèse" }
    },
    PROV: {
      type: String,
      default: "",
      documentation: {
        description: "Provenance ",
        master: true,
        label: "Provenance"
      }
    },
    HIST: {
      type: String,
      default: "",
      documentation: {
        description: "Historique ",
        master: true,
        label: "Historique"
      }
    },
    HIST2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: true,
        label: "",
        deprecated: true
      }
    },
    HIST3: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: true,
        label: "",
        deprecated: true
      }
    },
    HIST4: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: true,
        label: "",
        deprecated: true
      }
    },
    HIST5: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: true,
        label: "",
        deprecated: true
      }
    },
    HIST6: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: true,
        label: "",
        deprecated: true
      }
    },
    SCLE: {
      type: [String],
      default: [],
      documentation: { description: "Siècle ", master: true, label: "Siècle " }
    },
    STYL: {
      type: String,
      default: "",
      documentation: { description: "Style ", master: true, label: "Style" }
    },
    MILL: {
      type: String,
      default: "",
      documentation: {
        description: "Millénaire ",
        master: true,
        label: "Millénaire"
      }
    },
    TECH: {
      type: [String],
      default: [],
      documentation: {
        description: "Technique ",
        master: true,
        label: "Technique"
      }
    },
    DIMS: {
      type: [String],
      default: [],
      documentation: {
        description: "Dimensions ",
        master: true,
        label: "Dimensions"
      }
    },
    VIDEO: {
      type: [String],
      default: [],
      documentation: {
        description: "Champ qui contient les images",
        master: true,
        deprecated: true,
        label: "Champ qui contient les images"
      }
    },
    INV: {
      type: String,
      default: "",
      documentation: {
        description:
          "N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt",
        master: true,
        label: "N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt"
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: {
        description: "Exposition ",
        master: true,
        label: "Exposition"
      }
    },
    BIBL: {
      type: String,
      default: "",
      documentation: {
        description: "Bibliographie ",
        master: true,
        label: "Bibliographie"
      }
    },
    AATT: {
      type: String,
      default: "",
      documentation: {
        description: "Ancienne attribution",
        master: true,
        label: "Ancienne attribution"
      }
    },
    AUTI: {
      type: String,
      default: "",
      documentation: {
        description: "Autre titre",
        master: true,
        label: "Autre titre"
      }
    },
    CATE: {
      type: String,
      default: "",
      documentation: {
        description: "Catégorie ",
        master: true,
        label: "Catégorie"
      }
    },
    CATE_DEPREC: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: true,
        label: "",
        deprecated: true
      }
    },
    NOTE: {
      type: String,
      default: "",
      documentation: { description: "Notes ", master: true, label: "Notes" }
    },
    REDC: {
      type: [String],
      default: [],
      documentation: {
        description: "Rédacteurs ",
        master: true,
        label: "Rédacteurs"
      }
    },
    DREP: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la représentation",
        master: true,
        label: "Date de la représentation"
      }
    },
    PREP: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur la représentation",
        master: true,
        label: "Précisions sur la représentation"
      }
    },
    REPR: {
      type: String,
      default: "",
      documentation: {
        description: "Représentation ",
        master: true,
        label: "Représentation"
      }
    },
    SREP: {
      type: String,
      default: "",
      documentation: {
        description:
          "Sujet de la représentation (source littéraire ou musicale) ",
        master: true,
        label: "Sujet de la représentation (source littéraire ou musicale) "
      }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: {
        description:
          "Adresses images jointes générique (actuellement non utilisé)",
        master: true,
        label: "Adresses images jointes générique (actuellement non utilisé)"
      }
    },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la dernière mise à jour",
        master: true,
        label: "Date de la dernière mise à jour"
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la création POP/Mistral",
        master: true,
        label: "Date de la création POP/Mistral"
      }
    },
    AFFE: {
      type: String,
      default: "",
      documentation: {
        description:
          "Etablissement affectataire qui existe dans d’autres bases",
        master: true,
        label: "Etablissement affectataire qui existe dans d’autres bases"
      }
    },
    NUMS: {
      type: String,
      default: "",
      documentation: {
        description: "Autres numéros",
        master: true,
        label: "Autres numéros"
      }
    },
    SUITE: {
      type: String,
      default: "",
      documentation: {
        description: "OEuvres liées, ensemble",
        master: true,
        label: "OEuvres liées, ensemble"
      }
    },
    COMM: {
      type: String,
      default: "",
      documentation: {
        description: "Commentaire ",
        master: true,
        label: "Commentaire"
      }
    },
    NOTE2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: true,
        label: "",
        deprecated: true
      }
    },
    RESUME: {
      type: String,
      default: "",
      documentation: { description: "Résumé ", master: true, label: "Résumé" }
    },
    PHOT: {
      type: String,
      default: "",
      documentation: {
        description: "Droits de copie photo ",
        master: true,
        label: "Droits de copie photo"
      }
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
