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
        description: `
        Producteur de la donnée défini selon l'algorithme suivant : 
        IA = Inventaire
        PA = Monuments Historiques
        EA = Architecture
        Autre = Null`,
        label: "Producteur",
        generated: true
      }
    },
    CONTIENT_IMAGE: {
      type: String,
      default: "",
      documentation: {
        description:
          "Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES",
        generated: true
      }
    },
    POP_COORDONNEES: {
      lat: {
        type: Number,
        default: 0,
        documentation: {
          description: "Latitude de la notice en WGS84",
          generated: true
        }
      },
      lon: {
        type: Number,
        default: 0,
        documentation: {
          description: "Longitude de la notice en WGS84",
          generated: true
        }
      }
    },
    POP_CONTIENT_GEOLOCALISATION: {
      type: String,
      enum: ["oui", "non"],
      default: "non",
      documentation: {
        description: "Champs généré pour savoir si une géolocalisation existe",
        generated: true
      }
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
        generated: true
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
        label: "",
        deprecated: true
      }
    },
    ADRS: {
      type: String,
      default: "",
      documentation: {
        description: "Adresse ",
        label: "Adresse"
      }
    },
    ADRS2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    AFIG: {
      type: [String],
      default: [],
      documentation: {
        description: "Auteur(s) de la source figurée",
        label: "Auteur(s) de la source figurée"
      }
    },
    AIRE: {
      type: String,
      default: "",
      documentation: {
        description: "Aire d'étude",
        label: "Aire d'étude"
      }
    },
    APPL: {
      type: String,
      default: "",
      documentation: {
        description: "Appellation et titre",
        label: "Appellation et titre"
      }
    },
    ATEL: {
      type: String,
      default: "",
      documentation: {
        description:
          "Nom de l’atelier, de la manufacture, de la fabrique ou de l’école ",
        label:
          "Nom de l’atelier, de la manufacture, de la fabrique ou de l’école"
      }
    },
    AUTP: {
      type: String,
      default: "",
      documentation: {
        description: "Auteurs phototype",
        label: "Auteurs phototype"
      }
    },
    AUTR: {
      type: [String],
      default: [],
      documentation: {
        description: "Auteurs de l'oeuvre",
        label: "Auteurs de l'oeuvre"
      }
    },
    BIBL: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    CANT: {
      type: String,
      default: "",
      documentation: { description: "Canton ", label: "Canton" }
    },
    CATE: {
      type: [String],
      default: [],
      documentation: {
        description: "Catégorie technique",
        label: "Catégorie technique"
      }
    },
    COM: {
      type: String,
      default: "",
      documentation: {
        description: "Commune ",
        label: "Commune"
      }
    },
    COM2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: {
        description: "Contact ",
        generated: true,
        validation: "Email",
        label: "Contact"
      }
    },
    COOR: {
      type: String,
      default: "",
      documentation: {
        description: "Coordonnées Lambert (ou autres) d'un point ",
        label: "Coordonnées Lambert (ou autres) d'un points"
      }
    },
    COORM: {
      type: String,
      default: "",
      documentation: {
        description: "Coordonnées Lambert (ou autres) multiples ",
        label: "Coordonnées Lambert (ou autres) multiples"
      }
    },
    COPY: {
      type: String,
      default: "",
      documentation: {
        description: "CopyRight",
        label: "CopyRight"
      }
    },
    DATE: {
      type: [String],
      default: [],
      documentation: {
        description: "Datation en années",
        label: "Datation en années"
      }
    },
    DBOR: {
      type: [String],
      default: [],
      documentation: {
        description: "Date de rédaction de la notice",
        label: "Date de rédaction de la notice"
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: {
        description: "Dénomination ",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T96",
        label: "Dénomination"
      }
    },
    DENQ: {
      type: [String],
      default: [],
      documentation: {
        description: "Date d'enquête",
        label: "Date d'enquête"
      }
    },
    DEPL: {
      type: String,
      default: "",
      documentation: {
        description: "Partie déplacée",
        label: "Partie déplacée"
      }
    },
    DESC: {
      type: String,
      default: "",
      documentation: {
        description: "Commentaire description",
        label: "Commentaire description "
      }
    },
    DIMS: {
      type: String,
      default: "",
      documentation: {
        description: "Dimensions ",
        label: "Dimensions"
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
        label: "Date de chargement dans la base ",
        generated: true
      }
    },
    DOMN: {
      type: String,
      default: "",
      documentation: {
        description: "Domaines ",
        label: "Domaines "
      }
    },
    DOSADRS: {
      type: String,
      default: "",
      documentation: {
        description: "Dossier adresse",
        label: "Dossier adresse"
      }
    },
    DOSS: {
      type: [String],
      default: [],
      documentation: {
        description: "Dossier ",
        label: "Dossier"
      }
    },
    DOSURL: {
      type: String,
      default: "",
      documentation: {
        description: "Dossier URL",
        label: "Dossier URL"
      }
    },
    DOSURLPDF: {
      type: String,
      default: "",
      documentation: {
        description: "Dossier PDF ",
        generated: true,
        label: "Dossier PDF"
      }
    },
    DPRO: {
      type: String,
      default: "",
      documentation: {
        description: "Date protection",
        label: "Date protection"
      }
    },
    DPT: {
      type: String,
      default: "",
      documentation: {
        description: "Département ",
        label: "Département"
      }
    },
    EDIF: {
      type: String,
      default: "",
      documentation: {
        description: "Edifice de conservation",
        label: "Edifice de conservation"
      }
    },
    EDIF2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    EMPL: {
      type: String,
      default: "",
      documentation: {
        description: "Emplacement de l’œuvre dans l’édifice",
        label: "Emplacement de l’œuvre dans l’édifice"
      }
    },
    EMPL2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    ETAT: {
      type: [String],
      default: [],
      documentation: {
        description: "Etat de conservation",
        label: "Etat de conservation"
      }
    },
    ETUD: {
      type: String,
      default: "",
      documentation: {
        description: "Cadre de l'étude ",
        label: "Cadre de l'étude "
      }
    },
    EXEC: {
      type: String,
      default: "",
      documentation: {
        description: "Nom actuel ou historique du lieu d’exécution ",
        label: "Nom actuel ou historique du lieu d’exécution"
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    HIST: {
      type: String,
      default: "",
      documentation: {
        description: "Commentaire historique",
        label: "Commentaire historique"
      }
    },
    IDAGR: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    IMAGE: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    IMG: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    IMPL: {
      type: String,
      default: "",
      documentation: {
        description: "Milieu d'implantation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T12",
        label: "Milieu d'implantation"
      }
    },
    INSC: {
      type: [String],
      default: [],
      documentation: {
        description: "Inscriptions, marques, emblématique et poinçons",
        label: "Inscriptions, marques, emblématique et poinçons"
      }
    },
    INSEE: {
      type: String,
      default: [],
      documentation: {
        description: "Numéro INSEE de la commune",
        label: "Numéro INSEE de la commune"
      }
    },
    INSEE2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    INTE: {
      type: String,
      default: "",
      documentation: {
        description: "Intérêt de l'oeuvre",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T33",
        label: "Intérêt de l'oeuvre"
      }
    },
    JDAT: {
      type: [String],
      default: [],
      documentation: {
        description: "Justification de la datation",
        label: "Justification de la datation"
      }
    },
    LBASE2: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    LIENS: {
      type: [String],
      default: [],
      documentation: {
        description: "Liens Divers",
        label: "Liens Divers"
      }
    },
    LIEU: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu-dit ",
        label: "Lieu-dit"
      }
    },
    LMDP: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
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
    MATR: {
      type: [String],
      default: [],
      documentation: {
        description: "Matériaux ",
        label: "Matériaux"
      }
    },
    MFICH: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    MICR: {
      type: String,
      default: "",
      documentation: {
        description: "Numéro de microfiche",
        label: "Numéro de microfiche"
      }
    },
    MOSA: {
      type: String,
      default: "",
      documentation: {
        description: "Mosaïques ",
        label: "Mosaïques"
      }
    },
    NART: {
      type: String,
      default: "",
      documentation: {
        description: "Numérotation artificielle",
        label: "Numérotation artificielle"
      }
    },
    NINV: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    NOMS: {
      type: [String],
      default: [],
      documentation: {
        description: "Noms des rédacteurs de la notice et du dossier ",
        label: "Noms des rédacteurs de la notice et du dossier"
      }
    },
    NUMA: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    NUMP: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    OBS: {
      type: String,
      default: "",
      documentation: {
        description: "Observations ",
        label: "Observations"
      }
    },
    ORIG: {
      type: String,
      default: "",
      documentation: {
        description:
          "Origine de l’œuvre (lieu de provenance ou de destination)",
        label: "Origine de l’œuvre (lieu de provenance ou de destination)"
      }
    },
    PAPP: {
      type: String,
      default: "",
      documentation: {
        description: "Préc. appart",
        label: "Préc. appart"
      }
    },
    PARN: {
      type: [String],
      default: [],
      documentation: {
        description: "Parties non étud",
        label: "Parties non étud"
      }
    },
    PART: {
      type: [String],
      default: [],
      documentation: {
        description: "Parties constituantes",
        label: "Parties constituantes"
      }
    },
    PDEN: {
      type: [String],
      default: [],
      documentation: {
        description: "Précision sur la dénomination",
        label: "Précision sur la dénomination"
      }
    },
    PDIM: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur les dimensions",
        label: "Précisions sur les dimensions"
      }
    },
    PERS: {
      type: [String],
      default: [],
      documentation: {
        description: "Personnalitées ",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T6",
        label: "Personnalitées"
      }
    },
    PETA: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur l’état de conservation",
        label: "Précisions sur l’état de conservation"
      }
    },
    PHOTO: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
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
        label:
          "Précisions sur les inscriptions, marques, emblématique et poinçons"
      }
    },
    PINT: {
      type: String,
      default: "",
      documentation: {
        description: "Intérêt oeuvre",
        label: "Intérêt oeuvre"
      }
    },
    PLOC: {
      type: String,
      default: "",
      documentation: {
        description: "Précision sur la localisation",
        label: "Précision sur la localisation"
      }
    },
    PPRO: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur la protection MH",
        label: "Précisions sur la protection MH"
      }
    },
    PREP: {
      type: String,
      default: "",
      documentation: {
        description: "Précision sur la représentation",
        label: "Précision sur la représentation"
      }
    },
    PROT: {
      type: String,
      default: "",
      documentation: {
        description: "Nature de la protection MH",
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
        label: "Référence de l'édifice de conservation"
      }
    },
    REFE: {
      type: [String],
      default: [],
      documentation: {
        description: "Référence de l’ensemble ou de l'oeuvre",
        label: "Référence de l’ensemble ou de l'oeuvre"
      }
    },
    REFM: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    REFP: {
      type: [String],
      default: [],
      documentation: {
        description: "Références des parties constituantes étudiées ",
        label: "Références des parties constituantes étudiées"
      }
    },
    REG: {
      type: String,
      default: "",
      documentation: { description: "Région ", label: "Région" }
    },
    RENP: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    RENV: {
      type: [String],
      default: [],
      documentation: {
        description: "N° de renvoi au domaine MH ou au domaine INVENTAIRE",
        label: "N° de renvoi au domaine MH ou au domaine INVENTAIRE"
      }
    },
    REPR: {
      type: [String],
      default: [],
      documentation: {
        description: "Représentation ",
        label: "Représentation"
      }
    },
    SCLD: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    SCLE: {
      type: [String],
      default: [],
      documentation: {
        description: "Datation des campagnes principales de construction ",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T17",
        label: "Datation des campagnes principales de construction"
      }
    },
    SCLX: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    SOUR: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    STAD: {
      type: [String],
      default: [],
      documentation: {
        description: "Stade de la création",
        label: "Stade de la création"
      }
    },
    STAT: {
      type: [String],
      default: [],
      documentation: {
        description: "Statut de la propriété",
        label: "",
        deprecated: true
      }
    },
    STRU: {
      type: [String],
      default: [],
      documentation: {
        description: "Structure et typologie",
        label: "Structure et typologie"
      }
    },
    THEM: {
      type: String,
      default: "",
      documentation: { description: "Thème ", label: "Thème" }
    },
    TICO: {
      type: String,
      default: "",
      documentation: {
        description: "Titre courant",
        label: "Titre courant"
      }
    },
    TITR: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    VIDEO: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    VOLS: {
      type: String,
      default: "",
      documentation: {
        description: "Objet(s) volé(s)",
        label: "Objet(s) volé(s)",
        deprecated: true
      }
    },
    WADRS: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    WCOM: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    WEB: {
      type: String,
      default: "",
      documentation: {
        description: "Visite guidé ",
        label: "Visite guidé",
        deprecated: true
      }
    },
    WRENV: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS AFFICHE]",
        label: "",
        deprecated: true
      }
    },
    ZONE: {
      type: String,
      default: "",
      documentation: {
        description: "Zone Lambert ou autre",
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
