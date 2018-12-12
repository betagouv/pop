var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    PRODUCTEUR: {
      type: String,
      default: "",
      documentation: { description: "", master: false }
    },
    CONTIENT_IMAGE: {
      type: String,
      default: "",
      documentation: {
        description:
          "Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES",
        master: true
      }
    },
    POP_COORDONNEES: {
      lat: {
        type: Number,
        default: 0,
        documentation: {
          description: "Latitude de la notice en WGS84",
          master: true
        }
      },
      lon: {
        type: Number,
        default: 0,
        documentation: {
          description: "Longitude de la notice en WGS84",
          master: true
        }
      }
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
    BASE: {
      type: String,
      default: "Patrimoine mobilier (Palissy)",
      documentation: {
        description: "Nom de la base : Patrimoine mobilier (Palissy)",
        master: true
      }
    },
    MEMOIRE: [{ ref: String, url: String }],
    REF: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      documentation: {
        description: "Référence unique de la notice",
        master: false,
        validation: "Alphanumeric"
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    ACQU: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    ADRS: {
      type: String,
      default: "",
      documentation: { description: "Adresse ", master: false }
    },
    ADRS2: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    AFIG: {
      type: [String],
      default: [],
      documentation: {
        description: "Auteur(s) de la source figurée",
        master: false
      }
    },
    AIRE: {
      type: String,
      default: "",
      documentation: { description: "Aire d'étude", master: false }
    },
    APPL: {
      type: String,
      default: "",
      documentation: { description: "Appellation et titre", master: false }
    },
    ATEL: {
      type: String,
      default: "",
      documentation: {
        description:
          "Nom de l’atelier, de la manufacture, de la fabrique ou de l’école ",
        master: false
      }
    },
    AUTP: {
      type: String,
      default: "",
      documentation: { description: "Auteurs phototype", master: false }
    },
    AUTR: {
      type: [String],
      default: [],
      documentation: { description: "Auteurs de l'oeuvre", master: false }
    },
    BIBL: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    CANT: {
      type: String,
      default: "",
      documentation: { description: "Canton ", master: false }
    },
    CATE: {
      type: [String],
      default: [],
      documentation: { description: "Catégorie technique", master: false }
    },
    COM: {
      type: String,
      default: "",
      documentation: { description: "Commune ", master: false }
    },
    COM2: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: {
        description: "Contact ",
        master: true,
        validation: "email"
      }
    },
    COOR: {
      type: String,
      default: "",
      documentation: {
        description: "Coordonnées Lambert (ou autres) d'un points ",
        master: false
      }
    },
    COORM: {
      type: String,
      default: "",
      documentation: {
        description: "Coordonnées Lambert (ou autres) multiples ",
        master: false
      }
    },
    COPY: {
      type: String,
      default: "",
      documentation: { description: "CopyRight", master: false }
    },
    DATE: {
      type: [String],
      default: [],
      documentation: { description: "Datation en années", master: false }
    },
    DBOR: {
      type: [String],
      default: [],
      documentation: {
        description: "Date de rédaction de la notice",
        master: false
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: {
        description: "Dénomination ",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T69"
      }
    },
    DENQ: {
      type: [String],
      default: [],
      documentation: { description: "Date d'enquête", master: false }
    },
    DEPL: {
      type: String,
      default: "",
      documentation: { description: "Partie déplacée", master: false }
    },
    DESC: {
      type: String,
      default: "",
      documentation: { description: "Commentaire description", master: false }
    },
    DIMS: {
      type: String,
      default: "",
      documentation: { description: "Dimensions ", master: false }
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
    DOMN: {
      type: String,
      default: "",
      documentation: { description: "Domaines ", master: false }
    },
    DOSADRS: {
      type: String,
      default: "",
      documentation: { description: "Dossier adresse", master: false }
    },
    DOSS: {
      type: [String],
      default: [],
      documentation: { description: "Dossier ", master: false }
    },
    DOSURL: {
      type: String,
      default: "",
      documentation: { description: "Dossier URL", master: false }
    },
    DOSURLPDF: {
      type: String,
      default: "",
      documentation: { description: "Dossier PDF ", master: true }
    },
    DPRO: {
      type: String,
      default: "",
      documentation: { description: "Date protection", master: false }
    },
    DPT: {
      type: String,
      default: "",
      documentation: { description: "Département ", master: false }
    },
    EDIF: {
      type: String,
      default: "",
      documentation: { description: "Edifice de conservation", master: false }
    },
    EDIF2: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    EMPL: {
      type: String,
      default: "",
      documentation: {
        description: "Emplacement de l’œuvre dans l’édifice",
        master: false
      }
    },
    EMPL2: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    ETAT: {
      type: [String],
      default: [],
      documentation: { description: "Etat de conservation", master: false }
    },
    ETUD: {
      type: String,
      default: "",
      documentation: { description: "Parties non étud", master: false }
    },
    EXEC: {
      type: String,
      default: "",
      documentation: {
        description: "Nom actuel ou historique du lieu d’exécution ",
        master: false
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    HIST: {
      type: String,
      default: "",
      documentation: { description: "Commentaire historique", master: false }
    },
    IDAGR: {
      type: [String],
      default: [],
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    IMAGE: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    IMG: {
      type: [String],
      default: [],
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    IMPL: {
      type: String,
      default: "",
      documentation: {
        description: "Milieu d'implantation",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T12"
      }
    },
    INSC: {
      type: [String],
      default: [],
      documentation: {
        description: "Inscriptions, marques, emblématique et poinçons",
        master: false
      }
    },
    INSEE: {
      type: String,
      default: [],
      documentation: {
        description: "Numéro INSEE de la commune",
        master: false
      }
    },
    INSEE2: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    INTE: {
      type: String,
      default: "",
      documentation: {
        description: "Intérêt de l'oeuvre",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T33"
      }
    },
    JDAT: {
      type: [String],
      default: [],
      documentation: {
        description: "Justification de la datation",
        master: false
      }
    },
    LBASE2: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    LIENS: {
      type: [String],
      default: [],
      documentation: { description: "Liens Divers", master: false }
    },
    LIEU: {
      type: String,
      default: "",
      documentation: { description: "Lieu-dit ", master: false }
    },
    LMDP: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: { description: "Localisation ", master: false }
    },
    MATR: {
      type: [String],
      default: [],
      documentation: { description: "Matériaux ", master: false }
    },
    MFICH: {
      type: [String],
      default: [],
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    MICR: {
      type: String,
      default: "",
      documentation: { description: "Numéro de microfiche", master: false }
    },
    MOSA: {
      type: String,
      default: "",
      documentation: { description: "Mosaïques ", master: false }
    },
    NART: {
      type: String,
      default: "",
      documentation: { description: "Numérotation artificielle", master: false }
    },
    NINV: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    NOMS: {
      type: [String],
      default: [],
      documentation: {
        description: "Noms des rédacteurs de la notice et du dossier ",
        master: false
      }
    },
    NUMA: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    NUMP: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    OBS: {
      type: String,
      default: "",
      documentation: { description: "Observations ", master: false }
    },
    ORIG: {
      type: String,
      default: "",
      documentation: {
        description:
          "Origine de l’œuvre (lieu de provenance ou de destination)",
        master: false
      }
    },
    PAPP: {
      type: String,
      default: "",
      documentation: { description: "Préc. appart", master: false }
    },
    PARN: {
      type: [String],
      default: [],
      documentation: { description: "Parties non étud", master: false }
    },
    PART: {
      type: [String],
      default: [],
      documentation: { description: "Parties constituantes", master: false }
    },
    PDEN: {
      type: [String],
      default: [],
      documentation: {
        description: "Précision sur la dénomination",
        master: false
      }
    },
    PDIM: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur les dimensions",
        master: false
      }
    },
    PERS: {
      type: [String],
      default: [],
      documentation: {
        description: "Personnalitées ",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T6"
      }
    },
    PETA: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur l’état de conservation",
        master: false
      }
    },
    PHOTO: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    PINS: {
      type: String,
      default: "",
      documentation: {
        description:
          "Précisions sur les inscriptions, marques, emblématique et poinçons ",
        master: false
      }
    },
    PINT: {
      type: String,
      default: "",
      documentation: { description: "Intérêt oeuvre", master: false }
    },
    PLOC: {
      type: String,
      default: "",
      documentation: {
        description: "Précision sur la localisation",
        master: false
      }
    },
    PPRO: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur la protection MH",
        master: false
      }
    },
    PREP: {
      type: String,
      default: "",
      documentation: {
        description: "Précision sur la représentation",
        master: false
      }
    },
    PROT: {
      type: String,
      default: "",
      documentation: {
        description: "Nature de la protection MH",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T10"
      }
    },
    REFA: {
      type: [String],
      index: true,
      default: [],
      documentation: {
        description: "Référence de l'édifice de conservation",
        master: false
      }
    },
    REFE: {
      type: [String],
      default: [],
      documentation: {
        description: "Référence de l’ensemble ou de l'oeuvre",
        master: false
      }
    },
    REFM: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    REFP: {
      type: [String],
      default: [],
      documentation: {
        description: "Références des parties constituantes étudiées ",
        master: false
      }
    },
    REG: {
      type: String,
      default: "",
      documentation: { description: "Region ", master: false }
    },
    RENP: {
      type: [String],
      default: [],
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    RENV: {
      type: [String],
      default: [],
      documentation: {
        description: "N° de renvoi au domaine MH ou au domaine INVENTAIRE",
        master: false
      }
    },
    REPR: {
      type: [String],
      default: [],
      documentation: { description: "Représentation ", master: false }
    },
    SCLD: {
      type: [String],
      default: [],
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    SCLE: {
      type: [String],
      default: [],
      documentation: {
        description: "Datation des campagnes principales de construction ",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T17"
      }
    },
    SCLX: {
      type: [String],
      default: [],
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    SOUR: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    STAD: {
      type: [String],
      default: [],
      documentation: { description: "Stade de la création", master: false }
    },
    STAT: {
      type: [String],
      default: [],
      documentation: { description: "Statut de la propriété", master: false }
    },
    STRU: {
      type: [String],
      default: [],
      documentation: { description: "Structure et typologie", master: false }
    },
    THEM: {
      type: String,
      default: "",
      documentation: { description: "Thème ", master: false }
    },
    TICO: {
      type: String,
      default: "",
      documentation: { description: "Titre courant", master: false }
    },
    TITR: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    TOUT: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    VIDEO: {
      type: [String],
      default: [],
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    VOLS: {
      type: String,
      default: "",
      documentation: { description: "Objet(s) volé(s)", master: false }
    },
    WADRS: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    WCOM: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    WEB: {
      type: String,
      default: "",
      documentation: { description: "Visite guidé ", master: false }
    },
    WRENV: {
      type: String,
      default: "",
      documentation: { description: "[PAS AFFICHE]", master: false }
    },
    ZONE: {
      type: String,
      default: "",
      documentation: { description: "Zone Lambert ou autre", master: false }
    }
  },
  { collection: "palissy" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "palissy",
  bulk: { size: 500, delay: 2000 }
});

const object = mongoose.model("palissy", Schema);

module.exports = object;
