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
        description: `Producteur de la donnée déterminé grâce à la référence : \n
      IV=INV\n
      OA=CAOA\n
      MH=CRMH\n
      AR=ARCH\n
      AP=SDAP\n
      Autre=SAP`,
        master: true,
        label: "Producteur"
      }
    },
    BASE: {
      type: String,
      default: "Photographies (Mémoire)",
      documentation: {
        description: "Nom de la base : Photographies (Mémoire)",
        master: true
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
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
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
        label: "Référence"
      }
    },
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description: "Index global [Peut etre déprécié]",
        master: false,
        label: "Index global"
      }
    },
    ADRESSE: {
      type: String,
      default: "",
      documentation: {
        description: "Adresse",
        master: false,
        label: "Adresse"
      }
    },
    AUTOEU: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur oeuvre représentée",
        master: false,
        label: "Auteur oeuvre représentée"
      }
    },
    AUTG: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur gravure",
        master: false,
        label: "Auteur gravure"
      }
    },
    AUTP: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur photo",
        master: false,
        label: "Auteur photo"
      }
    },
    AUTOR: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur original",
        master: false,
        label: "Auteur original"
      }
    },
    AUTTI: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur tirage",
        master: false,
        label: "Auteur tirage"
      }
    },
    COM: {
      type: String,
      default: "",
      documentation: { description: "Commune", master: false, label: "Commune" }
    },
    DOM: {
      type: String,
      default: "",
      documentation: {
        description: "Domaine",
        master: false,
        label: "Domaine"
      }
    },
    EDIF: {
      type: String,
      default: "",
      documentation: {
        description: "Nom édifice",
        master: false,
        label: "Nom édifice"
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: {
        description: "Référence d’exposition de l’image ",
        master: false,
        deprecated: true
      }
    },
    JDATPV: {
      type: String,
      default: "",
      documentation: {
        description: "Justif date pv",
        master: false,
        label: "Justif date pv"
      }
    },
    LIEUCOR: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu cons orig.",
        master: false,
        label: "Lieu cons orig."
      }
    },
    COTECOR: {
      type: String,
      default: "",
      documentation: {
        description: "Cote cons orig. ",
        master: false,
        label: "Cote cons orig."
      }
    },
    LIEUCTI: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu cons tir. ",
        master: false,
        label: "Lieu cons tir."
      }
    },
    COTECTI: {
      type: String,
      default: "",
      documentation: {
        description: "Cote conservation du tirage ",
        master: false,
        label: "Cote conservation du tirage"
      }
    },
    LIEUCP: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu cons pho.",
        master: false,
        label: "Lieu cons pho."
      }
    },
    COTECP: {
      type: String,
      default: "",
      documentation: {
        description: "Cote conservation du phototype",
        master: false,
        label: "COTECP"
      }
    },
    LEG: {
      type: String,
      default: "",
      documentation: {
        description: "Légende ",
        master: false,
        label: "Légende"
      }
    },
    OBJT: {
      type: String,
      default: "",
      documentation: {
        description: "Nom objet",
        master: false,
        label: "Nom objet"
      }
    },
    OBS: {
      type: String,
      default: "",
      documentation: {
        description: "Obs phototype",
        master: false,
        label: "Obs phototype"
      }
    },
    OBSOR: {
      type: String,
      default: "",
      documentation: {
        description: "Obs original",
        master: false,
        label: "Obs original"
      }
    },
    OBSTI: {
      type: String,
      default: "",
      documentation: {
        description: "Obs tirage",
        master: false,
        label: "Obs tirage"
      }
    },
    PAYS: {
      type: String,
      default: "",
      documentation: { description: "Pays", master: false, label: "Pays" }
    },
    PUBLI: {
      type: String,
      default: "",
      documentation: {
        description: "Publication ",
        master: false,
        label: "Publication"
      }
    },
    TIREDE: {
      type: String,
      default: "",
      documentation: {
        description: "Pub. photograph.",
        master: false,
        label: "Pub. photograph."
      }
    },
    ROLE: {
      type: String,
      default: "",
      documentation: {
        documentation: {
          description: "Rôle joué ",
          master: false,
          label: "Rôle joué"
        }
      }
    },
    PRECOR: {
      type: String,
      default: "",
      documentation: {
        description: "Préc original",
        master: false,
        label: "Préc original"
      }
    },
    SERIE: {
      type: String,
      default: "",
      documentation: {
        description: "Titre série",
        master: false,
        label: "Titre série"
      }
    },
    THEATRE: {
      type: String,
      default: "",
      documentation: {
        description: "Nom de théâtre",
        master: false,
        label: "Nom de théâtre"
      }
    },
    TITRE: {
      type: String,
      default: "",
      documentation: { description: "Titre", master: false, label: "Titre" }
    },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la dernière mise à jour",
        master: true,
        label: "Date mise à jour "
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la création POP/Mistral",
        master: true,
        label: "Date Mistral"
      }
    },
    IDPROD: {
      type: String,
      default: "",
      documentation: {
        description: "Emetteur (nom) ",
        master: false,
        label: "Emetteur (nom)"
      }
    },
    NUMCD: {
      type: String,
      default: "",
      documentation: {
        description: "Numéro CD",
        master: false,
        label: "Numéro CD"
      }
    },
    NUMF: {
      type: String,
      default: "",
      documentation: {
        description: "No de fond",
        master: false,
        label: "No de fond"
      }
    },
    INSEE: {
      type: String,
      default: "",
      documentation: {
        description: "Code INSEE",
        master: false,
        label: "Code INSEE"
      }
    },
    NVD: {
      type: String,
      default: " ",
      documentation: {
        description: "vidéodisque",
        master: false,
        label: "vidéodisque"
      }
    },
    MARQ: {
      type: String,
      default: "",
      documentation: {
        description: "Ordre images",
        master: false,
        label: "Ordre images"
      }
    },
    ACC: {
      type: String,
      default: "",
      documentation: {
        description: "Accessoire pose",
        master: false,
        label: "Accessoire pose"
      }
    },
    ACQU: {
      type: String,
      default: " ",
      documentation: {
        description: "Acquisition",
        master: false,
        label: "Acquisition"
      }
    },
    ADPHOT: {
      type: String,
      default: "",
      documentation: {
        description: "Adresse personne ",
        master: false,
        label: "Adresse personne"
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
    ANUMP: {
      type: String,
      default: "",
      documentation: {
        description: "Ancien numéro (ancienne cote du phototype)",
        master: false,
        label: "Ancien numéro (ancienne cote du phototype)"
      }
    },
    COPY: {
      type: String,
      default: "",
      documentation: {
        description: "Crédit photo ",
        master: false,
        label: "Crédit photo"
      }
    },
    COULEUR: {
      type: String,
      default: "",
      documentation: {
        description:
          "Couleur [Devrait contenir oui ou non mais contient bcp plus . donnée à nettoyer]",
        master: false,
        label: "Couleur"
      }
    },
    COSTUME: {
      type: String,
      default: "",
      documentation: {
        description: "Costume de la personne représentée",
        master: false,
        label: "Costume de la personne représentée"
      }
    },
    DATIMM: {
      type: String,
      default: "",
      documentation: {
        description: "Date immatricul",
        master: false,
        label: "Date immatricul"
      }
    },
    DATOEU: {
      type: String,
      default: "",
      documentation: {
        description: "Date oeuv année",
        master: false,
        label: "Date oeuv année"
      }
    },
    DATPV: {
      type: String,
      default: "",
      documentation: {
        description: "Date prise vue ",
        master: false,
        label: "Date prise vue"
      }
    },
    DATOR: {
      type: String,
      default: "",
      documentation: {
        description: "Date original",
        master: false,
        label: "Date original"
      }
    },
    DATTI: {
      type: String,
      default: "",
      documentation: {
        description: "Date tirage",
        master: false,
        label: "Date tirage "
      }
    },
    DATG: {
      type: String,
      default: "",
      documentation: {
        description: "Date gravure",
        master: false,
        label: "Date gravure"
      }
    },
    DATD: {
      type: String,
      default: "",
      documentation: {
        description: "Date dessin",
        master: false,
        label: "Date dessin"
      }
    },
    DIFF: {
      type: String,
      default: "",
      documentation: {
        description: "Droits diffusion",
        master: false,
        label: "Droits diffusion"
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
    EDIARCH: {
      type: String,
      default: "",
      documentation: {
        description: "Interprétation",
        master: false,
        label: "Interprétation"
      }
    },
    ECH: {
      type: String,
      default: "",
      documentation: {
        description: "Echelle ",
        master: false,
        label: "Echelle"
      }
    },
    FORMAT: {
      type: String,
      default: "",
      documentation: {
        description: "Format phototype",
        master: false,
        label: "Format phototype"
      }
    },
    FORMATOR: {
      type: String,
      default: "",
      documentation: {
        description: "Format original",
        master: false,
        label: "Format original"
      }
    },
    FORMATTI: {
      type: String,
      default: "",
      documentation: {
        description: "Format tirage",
        master: false,
        label: "Format tirage"
      }
    },
    LBASE: {
      type: [String],
      default: [],
      index: true,
      documentation: {
        description:
          "LBASE contient la référence vers la notice Palissy ou Mérimée contenant l'image",
        master: false,
        label: "LBASE"
      }
    },
    WEB: {
      type: String,
      default: "",
      documentation: {
        description: "Accès Mémoire",
        master: false,
        label: "Accès Mémoire"
      }
    },
    LIB: {
      type: String,
      default: "",
      documentation: {
        description: "Mots candidats",
        master: false,
        label: "Mots candidats"
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
    LIEUORIG: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu de dépôt",
        master: false,
        label: "Lieu de dépôt"
      }
    },
    MCGEO: {
      type: String,
      default: "",
      documentation: {
        description: "Nom géographique",
        master: false,
        label: "Nom géographique"
      }
    },
    MCL: {
      type: String,
      default: "",
      documentation: {
        description: "Mots clés",
        master: false,
        label: "Mots clés"
      }
    },
    MENTIONS: {
      type: String,
      default: "",
      documentation: {
        description: "Mentions photo",
        master: false,
        label: "Mentions photo"
      }
    },
    MENTOR: {
      type: String,
      default: "",
      documentation: {
        description: "Mentions orig",
        master: false,
        label: "Mentions orig"
      }
    },
    MENTTI: {
      type: String,
      default: "",
      documentation: {
        description: "Mentions tirage",
        master: false,
        label: "Mentions tirage"
      }
    },
    MCPER: {
      type: String,
      default: "",
      documentation: {
        description: "Nom personne",
        master: false,
        label: "Nom personne"
      }
    },
    VUECD: {
      type: String,
      default: "",
      documentation: {
        description: "No vue CD",
        master: false,
        label: "No vue CD"
      }
    },
    NUMAUTP: {
      type: String,
      default: "",
      documentation: {
        description: "Cote photographe",
        master: false,
        label: "Cote photographe"
      }
    },
    NUMCAF: {
      type: String,
      default: "",
      documentation: {
        description: "No carte fenêtre",
        master: false,
        label: "No carte fenêtre"
      }
    },
    ANUMOR: {
      type: String,
      default: "",
      documentation: {
        description: "No original(anc)",
        master: false,
        label: "No original(anc)"
      }
    },
    NUMOR: {
      type: String,
      default: "",
      documentation: {
        description: "No original",
        master: false,
        label: "No original"
      }
    },
    NUMP: {
      type: String,
      default: "",
      documentation: {
        description: "No phototype",
        master: false,
        validation: "Alphanumeric",
        label: "No phototype"
      }
    },
    ANUMTI: {
      type: String,
      default: "",
      documentation: {
        description: "Ancien numéro du tirage",
        master: false,
        label: "Ancien numéro du tirage"
      }
    },
    NUMTI: {
      type: String,
      default: "",
      documentation: {
        description: "No tirage",
        master: false,
        validation: "Alphanumeric",
        label: "No tirage"
      }
    },
    RENV: {
      type: String,
      default: "",
      documentation: { description: "Renvoi ", master: false, label: "Renvoi" }
    },
    REG: {
      type: String,
      default: "",
      documentation: { description: "Région", master: false, label: "Région" }
    },
    SENS: {
      type: String,
      default: "",
      documentation: {
        description: "Sens ",
        master: false,
        label: "Sens"
      }
    },
    SCLE: {
      type: String,
      default: "",
      documentation: {
        description: "Date oeuv siècle",
        master: false,
        label: "Date oeuv siècle"
      }
    },
    SUP: {
      type: String,
      default: "",
      documentation: {
        description: "Support ",
        master: false,
        label: "Support"
      }
    },
    TECH: {
      type: String,
      default: "",
      documentation: {
        description: "Technique photo",
        master: false,
        label: "Technique photo"
      }
    },
    TECHOR: {
      type: String,
      default: "",
      documentation: {
        description: "Technique orig",
        master: false,
        label: "Technique orig"
      }
    },
    TECHTI: {
      type: String,
      default: "",
      documentation: {
        description: "Technique tirage",
        master: false,
        label: "Technique tirage"
      }
    },
    TOILE: {
      type: String,
      default: "",
      documentation: {
        description: "Toile de fond ",
        master: false,
        label: "Toile de fond",
        deprecated: true
      }
    },
    TYP: {
      type: String,
      default: "",
      documentation: {
        description: "Type  [Qu'est ce que c'est ?]",
        master: false,
        label: "Type"
      }
    },
    TYPDOC: {
      type: String,
      default: "",
      documentation: {
        description: "Catégorie de phototype",
        master: false,
        label: "Catégorie de phototype"
      }
    },
    TYPEIMG: {
      type: String,
      default: "",
      documentation: {
        description: "Type image num",
        master: false,
        label: "Type image num"
      }
    },
    TYPSUPP: {
      type: String,
      default: "",
      documentation: {
        description: "Type support num ",
        master: false,
        label: "Type support num "
      }
    },
    VIDEO: {
      type: String,
      default: "",
      documentation: {
        description: "Vidéo [Semble être doublon avec IMG]",
        master: false,
        label: "VIDEO"
      }
    },
    LBASE2: {
      type: String,
      default: "",
      documentation: {
        description: "Liens base  [Quelle différence avec LBASE?]",
        master: false,
        label: "Liens base ",
        deprecated: true
      }
    },
    LEG2: {
      type: String,
      default: "",
      documentation: {
        description: "Légende thes. ",
        master: false,
        label: "Légende thes."
      }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: {
        description: "Ref Image",
        master: false,
        label: "Ref Image"
      }
    },
    REFIMG: {
      type: String,
      default: "",
      documentation: {
        description: "Nom Image",
        master: false,
        label: "Nom Image"
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
    SITE: {
      type: String,
      default: "",
      documentation: { description: "SITE", master: false, label: "SITE" }
    },
    NUMSITE: {
      type: String,
      default: "",
      documentation: {
        description: "N° du site ",
        master: false,
        label: "N° du site"
      }
    },
    NUMOP: {
      type: String,
      default: "",
      documentation: {
        description: "N° d'opération",
        master: false,
        label: "N° d'opération"
      }
    },
    CHRONO: {
      type: String,
      default: "",
      documentation: {
        description: "Chronologie ",
        master: false,
        label: "Chronologie"
      }
    },
    STRUCT: {
      type: String,
      default: "",
      documentation: {
        description: "Structure ",
        master: false,
        label: "Structure"
      }
    },
    SUJET: {
      type: String,
      default: "",
      documentation: { description: "Sujet ", master: false, label: "Sujet" }
    },
    TICO: {
      type: String,
      default: "",
      documentation: {
        description: "Titre du dossier",
        master: false,
        label: "Titre du dossier"
      }
    },
    NUMI: {
      type: String,
      default: "",
      documentation: {
        description: "Ident. support",
        master: false,
        label: "Ident. support"
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
    ADRS: {
      type: String,
      default: "",
      documentation: {
        description: "Adresse saisie",
        master: false,
        label: "Adresse saisie"
      }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: {
        description: "Contact",
        master: true,
        validation: "email",
        label: "CONTACT"
      }
    },
    EMET: {
      type: String,
      default: "",
      documentation: {
        description: "Emetteur (code) ",
        master: false,
        label: "Emetteur (code)"
      }
    },
    NUM: {
      type: String,
      default: "",
      documentation: {
        description: "N° support ",
        master: false,
        label: "N° support"
      }
    },
    IMG: {
      type: String,
      default: "",
      documentation: {
        description: "Images",
        master: false,
        label: "Images"
      }
    },
    WCOM: {
      type: String,
      default: "",
      documentation: {
        description: "Ville [Quelle difference avec COM ?]",
        master: false,
        label: "Ville"
      }
    },
    LIENS: {
      type: String,
      default: "",
      documentation: {
        description: "Liens divers",
        master: false,
        label: "Liens divers"
      }
    },
    LAUTP: {
      type: String,
      default: "",
      documentation: {
        description: "Notice biblio",
        master: false,
        label: "Notice biblio"
      }
    }
  },
  { collection: "memoire" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "memoire",
  bulk: { size: 500, delay: 2000 }
});

const object = mongoose.model("memoire", Schema);

module.exports = object;
