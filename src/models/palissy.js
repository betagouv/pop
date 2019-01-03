var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    PRODUCTEUR: {
      type: String,
      default: "",
      documentation: {
        description: "Producteur  de la notice",
        master: false,
        label: "Producteur"
      }
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
    MEMOIRE: [{ ref: { type: String, index: true }, url: String }],
    REF: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      documentation: {
        description: "Référence unique de la notice",
        master: false,
        validation: "Alphanumeric",
        label: "Référence notice"
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    ACQU: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    ADRS: {
      type: String,
      default: "",
      documentation: {
        description: "Adresse ",
        master: false,
        label: "Adresse"
      }
    },
    ADRS2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    AFIG: {
      type: [String],
      default: [],
      documentation: {
        description: "Auteur(s) de la source figurée",
        master: false,
        label: "Auteur(s) de la source figurée"
      }
    },
    AIRE: {
      type: String,
      default: "",
      documentation: {
        description: "Aire d'étude",
        master: false,
        label: "Aire d'étude"
      }
    },
    APPL: {
      type: String,
      default: "",
      documentation: {
        description: "Appellation et titre",
        master: false,
        label: "Appellation et titre"
      }
    },
    ATEL: {
      type: String,
      default: "",
      documentation: {
        description:
          "Nom de l’atelier, de la manufacture, de la fabrique ou de l’école ",
        master: false,
        label:
          "Nom de l’atelier, de la manufacture, de la fabrique ou de l’école"
      }
    },
    AUTP: {
      type: String,
      default: "",
      documentation: {
        description: "Auteurs phototype",
        master: false,
        label: "Auteurs phototype"
      }
    },
    AUTR: {
      type: [String],
      default: [],
      documentation: {
        description: "Auteurs de l'oeuvre",
        master: false,
        label: "Auteurs de l'oeuvre"
      }
    },
    BIBL: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    CANT: {
      type: String,
      default: "",
      documentation: { description: "Canton ", master: false, label: "Canton" }
    },
    CATE: {
      type: [String],
      default: [],
      documentation: {
        description: "Catégorie technique",
        master: false,
        label: "Catégorie technique"
      }
    },
    COM: {
      type: String,
      default: "",
      documentation: {
        description: "Commune ",
        master: false,
        label: "Commune"
      }
    },
    COM2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: {
        description: "Contact ",
        master: true,
        validation: "email",
        label: "Contact"
      }
    },
    COOR: {
      type: String,
      default: "",
      documentation: {
        description: "Coordonnées Lambert (ou autres) d'un point ",
        master: false,
        label: "Coordonnées Lambert (ou autres) d'un points"
      }
    },
    COORM: {
      type: String,
      default: "",
      documentation: {
        description: "Coordonnées Lambert (ou autres) multiples ",
        master: false,
        label: "Coordonnées Lambert (ou autres) multiples"
      }
    },
    COPY: {
      type: String,
      default: "",
      documentation: {
        description: "CopyRight",
        master: false,
        label: "CopyRight"
      }
    },
    DATE: {
      type: [String],
      default: [],
      documentation: {
        description: "Datation en années",
        master: false,
        label: "Datation en années"
      }
    },
    DBOR: {
      type: [String],
      default: [],
      documentation: {
        description: "Date de rédaction de la notice",
        master: false,
        label: "Date de rédaction de la notice"
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: {
        description: "Dénomination ",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T96",
        label: "Dénomination"
      }
    },
    DENQ: {
      type: [String],
      default: [],
      documentation: {
        description: "Date d'enquête",
        master: false,
        label: "Date d'enquête"
      }
    },
    DEPL: {
      type: String,
      default: "",
      documentation: {
        description: "Partie déplacée",
        master: false,
        label: "Partie déplacée"
      }
    },
    DESC: {
      type: String,
      default: "",
      documentation: {
        description: "Commentaire description",
        master: false,
        label: "Commentaire description "
      }
    },
    DIMS: {
      type: String,
      default: "",
      documentation: {
        description: "Dimensions ",
        master: false,
        label: "Dimensions"
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
        label: "Date de chargement dans la base "
      }
    },
    DOMN: {
      type: String,
      default: "",
      documentation: {
        description: "Domaines ",
        master: false,
        label: "Domaines "
      }
    },
    DOSADRS: {
      type: String,
      default: "",
      documentation: {
        description: "Dossier adresse",
        master: false,
        label: "Dossier adresse"
      }
    },
    DOSS: {
      type: [String],
      default: [],
      documentation: {
        description: "Dossier ",
        master: false,
        label: "Dossier"
      }
    },
    DOSURL: {
      type: String,
      default: "",
      documentation: {
        description: "Dossier URL",
        master: false,
        label: "Dossier URL"
      }
    },
    DOSURLPDF: {
      type: String,
      default: "",
      documentation: {
        description: "Dossier PDF ",
        master: true,
        label: "Dossier PDF"
      }
    },
    DPRO: {
      type: String,
      default: "",
      documentation: {
        description: "Date protection",
        master: false,
        label: "Date protection"
      }
    },
    DPT: {
      type: String,
      default: "",
      documentation: {
        description: "Département ",
        master: false,
        label: "Département"
      }
    },
    EDIF: {
      type: String,
      default: "",
      documentation: {
        description: "Edifice de conservation",
        master: false,
        label: "Edifice de conservation"
      }
    },
    EDIF2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    EMPL: {
      type: String,
      default: "",
      documentation: {
        description: "Emplacement de l’œuvre dans l’édifice",
        master: false,
        label: "Emplacement de l’œuvre dans l’édifice"
      }
    },
    EMPL2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    ETAT: {
      type: [String],
      default: [],
      documentation: {
        description: "Etat de conservation",
        master: false,
        label: "Etat de conservation"
      }
    },
    ETUD: {
      type: String,
      default: "",
      documentation: {
        description: "Cadre de l'étude ",
        master: false,
        label: "Cadre de l'étude "
      }
    },
    EXEC: {
      type: String,
      default: "",
      documentation: {
        description: "Nom actuel ou historique du lieu d’exécution ",
        master: false,
        label: "Nom actuel ou historique du lieu d’exécution"
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    HIST: {
      type: String,
      default: "",
      documentation: {
        description: "Commentaire historique",
        master: false,
        label: "Commentaire historique"
      }
    },
    IDAGR: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    IMAGE: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    IMG: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    IMPL: {
      type: String,
      default: "",
      documentation: {
        description: "Milieu d'implantation",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T12",
        label: "Milieu d'implantation"
      }
    },
    INSC: {
      type: [String],
      default: [],
      documentation: {
        description: "Inscriptions, marques, emblématique et poinçons",
        master: false,
        label: "Inscriptions, marques, emblématique et poinçons"
      }
    },
    INSEE: {
      type: String,
      default: [],
      documentation: {
        description: "Numéro INSEE de la commune",
        master: false,
        label: "Numéro INSEE de la commune"
      }
    },
    INSEE2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    INTE: {
      type: String,
      default: "",
      documentation: {
        description: "Intérêt de l'oeuvre",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T33",
        label: "Intérêt de l'oeuvre"
      }
    },
    JDAT: {
      type: [String],
      default: [],
      documentation: {
        description: "Justification de la datation",
        master: false,
        label: "Justification de la datation"
      }
    },
    LBASE2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    LIENS: {
      type: [String],
      default: [],
      documentation: {
        description: "Liens Divers",
        master: false,
        label: "Liens Divers"
      }
    },
    LIEU: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu-dit ",
        master: false,
        label: "Lieu-dit"
      }
    },
    LMDP: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: {
        description: "Localisation ",
        master: false,
        label: "Localisation"
      }
    },
    MATR: {
      type: [String],
      default: [],
      documentation: {
        description: "Matériaux ",
        master: false,
        label: "Matériaux"
      }
    },
    MFICH: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    MICR: {
      type: String,
      default: "",
      documentation: {
        description: "Numéro de microfiche",
        master: false,
        label: "Numéro de microfiche"
      }
    },
    MOSA: {
      type: String,
      default: "",
      documentation: {
        description: "Mosaïques ",
        master: false,
        label: "Mosaïques"
      }
    },
    NART: {
      type: String,
      default: "",
      documentation: {
        description: "Numérotation artificielle",
        master: false,
        label: "Numérotation artificielle"
      }
    },
    NINV: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    NOMS: {
      type: [String],
      default: [],
      documentation: {
        description: "Noms des rédacteurs de la notice et du dossier ",
        master: false,
        label: "Noms des rédacteurs de la notice et du dossier"
      }
    },
    NUMA: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    NUMP: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    OBS: {
      type: String,
      default: "",
      documentation: {
        description: "Observations ",
        master: false,
        label: "Observations"
      }
    },
    ORIG: {
      type: String,
      default: "",
      documentation: {
        description:
          "Origine de l’œuvre (lieu de provenance ou de destination)",
        master: false,
        label: "Origine de l’œuvre (lieu de provenance ou de destination)"
      }
    },
    PAPP: {
      type: String,
      default: "",
      documentation: {
        description: "Préc. appart",
        master: false,
        label: "Préc. appart"
      }
    },
    PARN: {
      type: [String],
      default: [],
      documentation: {
        description: "Parties non étud",
        master: false,
        label: "Parties non étud"
      }
    },
    PART: {
      type: [String],
      default: [],
      documentation: {
        description: "Parties constituantes",
        master: false,
        label: "Parties constituantes"
      }
    },
    PDEN: {
      type: [String],
      default: [],
      documentation: {
        description: "Précision sur la dénomination",
        master: false,
        label: "Précision sur la dénomination"
      }
    },
    PDIM: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur les dimensions",
        master: false,
        label: "Précisions sur les dimensions"
      }
    },
    PERS: {
      type: [String],
      default: [],
      documentation: {
        description: "Personnalitées ",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T6",
        label: "Personnalitées"
      }
    },
    PETA: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur l’état de conservation",
        master: false,
        label: "Précisions sur l’état de conservation"
      }
    },
    PHOTO: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    PINS: {
      type: String,
      default: "",
      documentation: {
        description:
          "Précisions sur les inscriptions, marques, emblématique et poinçons ",
        master: false,
        label:
          "Précisions sur les inscriptions, marques, emblématique et poinçons"
      }
    },
    PINT: {
      type: String,
      default: "",
      documentation: {
        description: "Intérêt oeuvre",
        master: false,
        label: "Intérêt oeuvre"
      }
    },
    PLOC: {
      type: String,
      default: "",
      documentation: {
        description: "Précision sur la localisation",
        master: false,
        label: "Précision sur la localisation"
      }
    },
    PPRO: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur la protection MH",
        master: false,
        label: "Précisions sur la protection MH"
      }
    },
    PREP: {
      type: String,
      default: "",
      documentation: {
        description: "Précision sur la représentation",
        master: false,
        label: "Précision sur la représentation"
      }
    },
    PROT: {
      type: String,
      default: "",
      documentation: {
        description: "Nature de la protection MH",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T10",
        label: "Nature de la protection MH"
      }
    },
    REFA: {
      type: [String],
      index: true,
      default: [],
      documentation: {
        description: "Référence de l'édifice de conservation",
        master: false,
        label: "Référence de l'édifice de conservation"
      }
    },
    REFE: {
      type: [String],
      default: [],
      documentation: {
        description: "Référence de l’ensemble ou de l'oeuvre",
        master: false,
        label: "Référence de l’ensemble ou de l'oeuvre"
      }
    },
    REFM: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    REFP: {
      type: [String],
      default: [],
      documentation: {
        description: "Références des parties constituantes étudiées ",
        master: false,
        label: "Références des parties constituantes étudiées"
      }
    },
    REG: {
      type: String,
      default: "",
      documentation: { description: "Région ", master: false, label: "Région" }
    },
    RENP: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    RENV: {
      type: [String],
      default: [],
      documentation: {
        description: "N° de renvoi au domaine MH ou au domaine INVENTAIRE",
        master: false,
        label: "N° de renvoi au domaine MH ou au domaine INVENTAIRE"
      }
    },
    REPR: {
      type: [String],
      default: [],
      documentation: {
        description: "Représentation ",
        master: false,
        label: "Représentation"
      }
    },
    SCLD: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    SCLE: {
      type: [String],
      default: [],
      documentation: {
        description: "Datation des campagnes principales de construction ",
        master: false,
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T17",
        label: "Datation des campagnes principales de construction"
      }
    },
    SCLX: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    SOUR: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    STAD: {
      type: [String],
      default: [],
      documentation: {
        description: "Stade de la création",
        master: false,
        label: "Stade de la création"
      }
    },
    STAT: {
      type: [String],
      default: [],
      documentation: {
        description: "Statut de la propriété",
        master: false,
        label: "",
        deprecated: true
      }
    },
    STRU: {
      type: [String],
      default: [],
      documentation: {
        description: "Structure et typologie",
        master: false,
        label: "Structure et typologie"
      }
    },
    THEM: {
      type: String,
      default: "",
      documentation: { description: "Thème ", master: false, label: "Thème" }
    },
    TICO: {
      type: String,
      default: "",
      documentation: {
        description: "Titre courant",
        master: false,
        label: "Titre courant"
      }
    },
    TITR: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    VIDEO: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    VOLS: {
      type: String,
      default: "",
      documentation: {
        description: "Objet(s) volé(s)",
        master: false,
        label: "Objet(s) volé(s)",
        deprecated: true
      }
    },
    WADRS: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    WCOM: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    WEB: {
      type: String,
      default: "",
      documentation: {
        description: "Visite guidé ",
        master: false,
        label: "Visite guidé",
        deprecated: true
      }
    },
    WRENV: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        master: false,
        label: "",
        deprecated: true
      }
    },
    ZONE: {
      type: String,
      default: "",
      documentation: {
        description: "Zone Lambert ou autre",
        master: false,
        label: "Zone Lambert ou autre"
      }
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
