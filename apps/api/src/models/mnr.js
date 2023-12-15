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
        generated: true
      }
    },
    BASE: {
      type: String,
      default: "Rose Valland (MNR-Jeu de Paume)",
      documentation: {
        description: "Valeur Rose Valland (MNR-Jeu de Paume)",
        generated: true,
        label: "Nom de la base"
      }
    },
    CONTIENT_IMAGE: {
      type: String,
      default: "non",
      documentation: {
        description:
          "Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES",
        generated: true,
        deprecated: true
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
    REF: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      documentation: {
        description: "Référence unique de la notice",
        label: "Référence"
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    NET: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        deprecated: true,
        label: "Présence sur site internet du musée ; date"
      }
    },
    AUTR: {
      type: [String],
      default: [],
      documentation: {
        description: "Auteur / exécutant / collecteur",
        label: "Auteur / exécutant / collecteur"
      }
    },
    PAUT: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions auteur",
        label: "Précisions auteur"
      }
    },
    ATTR: {
      type: String,
      default: "",
      documentation: {
        description: "Anciennes attributions",
        label: "Anciennes attributions"
      }
    },
    ECOL: {
      type: String,
      default: "",
      documentation: { description: "Ecole ", label: "Ecole" }
    },
    TITR: {
      type: String,
      default: "",
      documentation: { description: "Titre ", label: "Titre" }
    },
    ATIT: {
      type: String,
      default: "",
      documentation: {
        description: "Ancien titre",
        label: "Ancien titre"
      }
    },
    PTIT: {
      type: String,
      default: "",
      documentation: {
        description: "Précision titre",
        label: "Précision titre"
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: {
        description: "Dénomination du bien",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T96",
        label: "Dénomination du bien"
      }
    },
    DESC: {
      type: String,
      default: "",
      documentation: {
        description: "Description ",
        label: "Description"
      }
    },
    DOMN: {
      type: [String],
      default: [],
      documentation: {
        description: "Domaine (catégorie du bien)",
        label: "Domaine"
      }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: {
        description: "Localisation ",
        label: "Localisation"
      }
    },
    INSC: {
      type: String,
      default: "",
      documentation: {
        description: "Inscriptions ",
        label: "Inscriptions"
      }
    },
    MARQ: {
      type: String,
      default: "",
      documentation: { description: "Marques ", label: "Marques" }
    },
    OBSE: {
      type: String,
      default: "",
      documentation: {
        description: "Observations ",
        label: "Observations"
      }
    },
    ETAT: {
      type: String,
      default: "",
      documentation: {
        description: "Etat de conservation",
        label: "Etat de conservation"
      }
    },
    GENE: {
      type: String,
      default: "",
      documentation: { description: "Genèse ", label: "Genèse" }
    },
    PROV: {
      type: String,
      default: "",
      documentation: {
        description: "Provenance ",
        label: "Provenance"
      }
    },
    HIST: {
      type: String,
      default: "",
      documentation: {
        description: "Historique ",
        label: "Historique"
      }
    },
    HIST2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    HIST3: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    HIST4: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        deprecated: true,
        label: "Restitution"
      }
    },
    SALLES: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        deprecated: true,
        label: "Exposé en salles, à telle date"
      }
    },
    CARTELS: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        deprecated: true,
        label: "Formulation des cartels (fautive ou non, à telle date)"
      }
    },
    SCLE: {
      type: [String],
      default: [],
      documentation: { description: "Siècle ", label: "Siècle " }
    },
    STYL: {
      type: String,
      default: "",
      documentation: { description: "Style ", label: "Style" }
    },
    MILL: {
      type: String,
      default: "",
      documentation: {
        description: "Millénaire ",
        label: "Millénaire"
      }
    },
    TECH: {
      type: [String],
      default: [],
      documentation: {
        description: "Technique ",
        label: "Technique"
      }
    },
    DIMS: {
      type: [String],
      default: [],
      documentation: {
        description: "Dimensions ",
        label: "Dimensions"
      }
    },
    VIDEO: {
      type: [String],
      default: [],
      documentation: {
        description: "Champ qui contient les images",
        deprecated: true,
        label: "Champ qui contient les images"
      }
    },
    INV: {
      type: String,
      default: "",
      documentation: {
        description: "N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt",
        label: "N°Inventaire"
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: {
        description: "Exposition ",
        label: "Exposition"
      }
    },
    BIBL: {
      type: String,
      default: "",
      documentation: {
        description: "Bibliographie ",
        label: "Bibliographie"
      }
    },
    AATT: {
      type: String,
      default: "",
      documentation: {
        description: "Ancienne attribution",
        label: "Ancienne attribution"
      }
    },
    AUTI: {
      type: String,
      default: "",
      documentation: {
        description: "Autre titre",
        label: "Autre titre"
      }
    },
    CATE: {
      type: String,
      default: "",
      documentation: {
        description: "Catégorie ",
        label: "Catégorie"
      }
    },
    RCL: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        deprecated: true,
        label: "Récolé, date"
      }
    },
    NOTE: {
      type: String,
      default: "",
      documentation: { description: "Notes ", label: "Notes" }
    },
    REDC: {
      type: [String],
      default: [],
      documentation: {
        description: "Rédacteurs ",
        label: "Rédacteurs"
      }
    },
    DREP: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la représentation",
        label: "Date de la représentation"
      }
    },
    PREP: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur la représentation",
        label: "Précisions sur la représentation"
      }
    },
    REPR: {
      type: String,
      default: "",
      documentation: {
        description: "Représentation ",
        label: "Représentation"
      }
    },
    SREP: {
      type: String,
      default: "",
      documentation: {
        description: "Sujet de la représentation (source littéraire ou musicale) ",
        label: "Sujet de la représentation (source littéraire ou musicale) "
      }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: {
        description: "Adresses images jointes générique (actuellement non utilisé)",
        label: "Adresses images jointes générique (actuellement non utilisé)"
      }
    },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la dernière mise à jour",
        label: "Date de la dernière mise à jour",
        generated: true
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la création POP/Mistral",
        label: "Date de la création POP/Mistral",
        generated: true
      }
    },
    AFFE: {
      type: String,
      default: "",
      documentation: {
        description: "Etablissement affectataire qui existe dans d’autres bases",
        label: "Etablissement affectataire"
      }
    },
    NUMS: {
      type: String,
      default: "",
      documentation: {
        description: "Autres numéros",
        label: "Autres numéros"
      }
    },
    SUITE: {
      type: String,
      default: "",
      documentation: {
        description: "OEuvres liées, ensemble",
        label: "OEuvres liées, ensemble"
      }
    },
    COMM: {
      type: String,
      default: "",
      documentation: {
        description: "Commentaire ",
        label: "Commentaire"
      }
    },
    NOTE2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        deprecated: true,
        label: "Avertissement"
      }
    },
    RESUME: {
      type: String,
      default: "",
      documentation: { description: "Résumé ", label: "Résumé" }
    },
    PHOT: {
      type: String,
      default: "",
      documentation: {
        description: "Droits de copie photo ",
        label: "Droits de copie photo"
      }
    },
    HISTORIQUE: [
      { 
        nom: String,
        prenom: String,
        email: String,
        date: String,
        updateMode: String
      }
    ],
    RENV: {
      type: [String],
      default: [],
      documentation: {
        description:
          "Numéro de renvoi vers un autre domaine. Doit être une référence valide vers une notice MNR.",
        label: "Numéro de renvoi vers un autre domaine"
      }
    },
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
