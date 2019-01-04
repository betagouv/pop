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
        generated: true,
        label: "Producteur"
      }
    },
    BASE: {
      type: String,
      default: "Photographies (Mémoire)",
      documentation: {
        description: "Nom de la base : Photographies (Mémoire)",
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
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    REF: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      documentation: {
        description: "Référence unique de la notice",
        label: "Référence",
        generated: true
      }
    },
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description: "Index global [Peut etre déprécié]",
        label: "Index global"
      }
    },
    ADRESSE: {
      type: String,
      default: "",
      documentation: {
        description: "Adresse",
        label: "Adresse"
      }
    },
    AUTOEU: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur oeuvre représentée",
        label: "Auteur oeuvre représentée"
      }
    },
    AUTG: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur gravure",
        label: "Auteur gravure"
      }
    },
    AUTP: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur photo",
        label: "Auteur photo"
      }
    },
    AUTOR: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur original",
        label: "Auteur original"
      }
    },
    AUTTI: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur tirage",
        label: "Auteur tirage"
      }
    },
    COM: {
      type: String,
      default: "",
      documentation: { description: "Commune", label: "Commune" }
    },
    DOM: {
      type: String,
      default: "",
      documentation: {
        description: "Domaine",
        label: "Domaine"
      }
    },
    EDIF: {
      type: String,
      default: "",
      documentation: {
        description: "Nom édifice",
        label: "Nom édifice"
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: {
        description: "Référence d’exposition de l’image ",
        deprecated: true
      }
    },
    JDATPV: {
      type: String,
      default: "",
      documentation: {
        description: "Justif date pv",
        label: "Justif date pv"
      }
    },
    LIEUCOR: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu cons orig.",
        label: "Lieu cons orig."
      }
    },
    COTECOR: {
      type: String,
      default: "",
      documentation: {
        description: "Cote cons orig. ",
        label: "Cote cons orig."
      }
    },
    LIEUCTI: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu cons tir. ",
        label: "Lieu cons tir."
      }
    },
    COTECTI: {
      type: String,
      default: "",
      documentation: {
        description: "Cote conservation du tirage ",
        label: "Cote conservation du tirage"
      }
    },
    LIEUCP: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu cons pho.",
        label: "Lieu cons pho."
      }
    },
    COTECP: {
      type: String,
      default: "",
      documentation: {
        description: "Cote conservation du phototype",
        label: "COTECP"
      }
    },
    LEG: {
      type: String,
      default: "",
      documentation: {
        description: "Légende ",
        label: "Légende"
      }
    },
    OBJT: {
      type: String,
      default: "",
      documentation: {
        description: "Nom objet",
        label: "Nom objet"
      }
    },
    OBS: {
      type: String,
      default: "",
      documentation: {
        description: "Obs phototype",
        label: "Obs phototype"
      }
    },
    OBSOR: {
      type: String,
      default: "",
      documentation: {
        description: "Obs original",
        label: "Obs original"
      }
    },
    OBSTI: {
      type: String,
      default: "",
      documentation: {
        description: "Obs tirage",
        label: "Obs tirage"
      }
    },
    PAYS: {
      type: String,
      default: "",
      documentation: { description: "Pays", label: "Pays" }
    },
    PUBLI: {
      type: String,
      default: "",
      documentation: {
        description: "Publication ",
        label: "Publication"
      }
    },
    TIREDE: {
      type: String,
      default: "",
      documentation: {
        description: "Pub. photograph.",
        label: "Pub. photograph."
      }
    },
    ROLE: {
      type: String,
      default: "",
      documentation: {
        documentation: {
          description: "Rôle joué ",
          label: "Rôle joué"
        }
      }
    },
    PRECOR: {
      type: String,
      default: "",
      documentation: {
        description: "Préc original",
        label: "Préc original"
      }
    },
    SERIE: {
      type: String,
      default: "",
      documentation: {
        description: "Titre série",
        label: "Titre série"
      }
    },
    THEATRE: {
      type: String,
      default: "",
      documentation: {
        description: "Nom de théâtre",
        label: "Nom de théâtre"
      }
    },
    TITRE: {
      type: String,
      default: "",
      documentation: { description: "Titre", label: "Titre" }
    },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la dernière mise à jour",
        generated: true,
        label: "Date mise à jour "
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la création POP/Mistral",
        generated: true,
        label: "Date Mistral"
      }
    },
    IDPROD: {
      type: String,
      default: "",
      documentation: {
        description: "Emetteur (nom) ",
        label: "Emetteur (nom)"
      }
    },
    NUMCD: {
      type: String,
      default: "",
      documentation: {
        description: "Numéro CD",
        label: "Numéro CD"
      }
    },
    NUMF: {
      type: String,
      default: "",
      documentation: {
        description: "No de fond",
        label: "No de fond"
      }
    },
    INSEE: {
      type: String,
      default: "",
      documentation: {
        description: "Code INSEE",
        label: "Code INSEE"
      }
    },
    NVD: {
      type: String,
      default: " ",
      documentation: {
        description: "vidéodisque",
        label: "vidéodisque"
      }
    },
    MARQ: {
      type: String,
      default: "",
      documentation: {
        description: "Ordre images",
        label: "Ordre images"
      }
    },
    ACC: {
      type: String,
      default: "",
      documentation: {
        description: "Accessoire pose",
        label: "Accessoire pose"
      }
    },
    ACQU: {
      type: String,
      default: " ",
      documentation: {
        description: "Acquisition",
        label: "Acquisition"
      }
    },
    ADPHOT: {
      type: String,
      default: "",
      documentation: {
        description: "Adresse personne ",
        label: "Adresse personne"
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
    ANUMP: {
      type: String,
      default: "",
      documentation: {
        description: "Ancien numéro (ancienne cote du phototype)",
        label: "Ancien numéro (ancienne cote du phototype)"
      }
    },
    COPY: {
      type: String,
      default: "",
      documentation: {
        description: "Crédit photo ",
        label: "Crédit photo"
      }
    },
    COULEUR: {
      type: String,
      default: "",
      documentation: {
        description:
          "Couleur [Devrait contenir oui ou non mais contient bcp plus . donnée à nettoyer]",
        label: "Couleur"
      }
    },
    COSTUME: {
      type: String,
      default: "",
      documentation: {
        description: "Costume de la personne représentée",
        label: "Costume de la personne représentée"
      }
    },
    DATIMM: {
      type: String,
      default: "",
      documentation: {
        description: "Date immatricul",
        label: "Date immatricul"
      }
    },
    DATOEU: {
      type: String,
      default: "",
      documentation: {
        description: "Date oeuv année",
        label: "Date oeuv année"
      }
    },
    DATPV: {
      type: String,
      default: "",
      documentation: {
        description: "Date prise vue ",
        label: "Date prise vue"
      }
    },
    DATOR: {
      type: String,
      default: "",
      documentation: {
        description: "Date original",
        label: "Date original"
      }
    },
    DATTI: {
      type: String,
      default: "",
      documentation: {
        description: "Date tirage",
        label: "Date tirage "
      }
    },
    DATG: {
      type: String,
      default: "",
      documentation: {
        description: "Date gravure",
        label: "Date gravure"
      }
    },
    DATD: {
      type: String,
      default: "",
      documentation: {
        description: "Date dessin",
        label: "Date dessin"
      }
    },
    DIFF: {
      type: String,
      default: "",
      documentation: {
        description: "Droits diffusion",
        label: "Droits diffusion"
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
    EDIARCH: {
      type: String,
      default: "",
      documentation: {
        description: "Interprétation",
        label: "Interprétation"
      }
    },
    ECH: {
      type: String,
      default: "",
      documentation: {
        description: "Echelle ",
        label: "Echelle"
      }
    },
    FORMAT: {
      type: String,
      default: "",
      documentation: {
        description: "Format phototype",
        label: "Format phototype"
      }
    },
    FORMATOR: {
      type: String,
      default: "",
      documentation: {
        description: "Format original",
        label: "Format original"
      }
    },
    FORMATTI: {
      type: String,
      default: "",
      documentation: {
        description: "Format tirage",
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
        label: "LBASE"
      }
    },
    WEB: {
      type: String,
      default: "",
      documentation: {
        description: "Accès Mémoire",
        label: "Accès Mémoire"
      }
    },
    LIB: {
      type: String,
      default: "",
      documentation: {
        description: "Mots candidats",
        label: "Mots candidats"
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
    LIEUORIG: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu de dépôt",
        label: "Lieu de dépôt"
      }
    },
    MCGEO: {
      type: String,
      default: "",
      documentation: {
        description: "Nom géographique",
        label: "Nom géographique"
      }
    },
    MCL: {
      type: String,
      default: "",
      documentation: {
        description: "Mots clés",
        label: "Mots clés"
      }
    },
    MENTIONS: {
      type: String,
      default: "",
      documentation: {
        description: "Mentions photo",
        label: "Mentions photo"
      }
    },
    MENTOR: {
      type: String,
      default: "",
      documentation: {
        description: "Mentions orig",
        label: "Mentions orig"
      }
    },
    MENTTI: {
      type: String,
      default: "",
      documentation: {
        description: "Mentions tirage",
        label: "Mentions tirage"
      }
    },
    MCPER: {
      type: String,
      default: "",
      documentation: {
        description: "Nom personne",
        label: "Nom personne"
      }
    },
    VUECD: {
      type: String,
      default: "",
      documentation: {
        description: "No vue CD",
        label: "No vue CD"
      }
    },
    NUMAUTP: {
      type: String,
      default: "",
      documentation: {
        description: "Cote photographe",
        label: "Cote photographe"
      }
    },
    NUMCAF: {
      type: String,
      default: "",
      documentation: {
        description: "No carte fenêtre",
        label: "No carte fenêtre"
      }
    },
    ANUMOR: {
      type: String,
      default: "",
      documentation: {
        description: "No original(anc)",
        label: "No original(anc)"
      }
    },
    NUMOR: {
      type: String,
      default: "",
      documentation: {
        description: "No original",
        label: "No original"
      }
    },
    NUMP: {
      type: String,
      default: "",
      documentation: {
        description: "No phototype",
        validation: "Alphanumeric",
        label: "No phototype"
      }
    },
    ANUMTI: {
      type: String,
      default: "",
      documentation: {
        description: "Ancien numéro du tirage",
        label: "Ancien numéro du tirage"
      }
    },
    NUMTI: {
      type: String,
      default: "",
      documentation: {
        description: "No tirage",
        validation: "Alphanumeric",
        label: "No tirage"
      }
    },
    RENV: {
      type: String,
      default: "",
      documentation: { description: "Renvoi ", label: "Renvoi" }
    },
    REG: {
      type: String,
      default: "",
      documentation: { description: "Région", label: "Région" }
    },
    SENS: {
      type: String,
      default: "",
      documentation: {
        description: "Sens ",
        label: "Sens"
      }
    },
    SCLE: {
      type: String,
      default: "",
      documentation: {
        description: "Date oeuv siècle",
        label: "Date oeuv siècle"
      }
    },
    SUP: {
      type: String,
      default: "",
      documentation: {
        description: "Support ",
        label: "Support"
      }
    },
    TECH: {
      type: String,
      default: "",
      documentation: {
        description: "Technique photo",
        label: "Technique photo"
      }
    },
    TECHOR: {
      type: String,
      default: "",
      documentation: {
        description: "Technique orig",
        label: "Technique orig"
      }
    },
    TECHTI: {
      type: String,
      default: "",
      documentation: {
        description: "Technique tirage",
        label: "Technique tirage"
      }
    },
    TOILE: {
      type: String,
      default: "",
      documentation: {
        description: "Toile de fond ",
        label: "Toile de fond",
        deprecated: true
      }
    },
    TYP: {
      type: String,
      default: "",
      documentation: {
        description: "Type  [Qu'est ce que c'est ?]",
        label: "Type"
      }
    },
    TYPDOC: {
      type: String,
      default: "",
      documentation: {
        description: "Catégorie de phototype",
        label: "Catégorie de phototype"
      }
    },
    TYPEIMG: {
      type: String,
      default: "",
      documentation: {
        description: "Type image num",
        label: "Type image num"
      }
    },
    TYPSUPP: {
      type: String,
      default: "",
      documentation: {
        description: "Type support num ",
        label: "Type support num "
      }
    },
    VIDEO: {
      type: String,
      default: "",
      documentation: {
        description: "Vidéo [Semble être doublon avec IMG]",
        label: "VIDEO"
      }
    },
    LBASE2: {
      type: String,
      default: "",
      documentation: {
        description: "Liens base  [Quelle différence avec LBASE?]",
        label: "Liens base ",
        deprecated: true
      }
    },
    LEG2: {
      type: String,
      default: "",
      documentation: {
        description: "Légende thes. ",
        label: "Légende thes."
      }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: {
        description: "Ref Image",
        label: "Ref Image"
      }
    },
    REFIMG: {
      type: String,
      default: "",
      documentation: {
        description: "Nom Image",
        label: "Nom Image"
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
    SITE: {
      type: String,
      default: "",
      documentation: { description: "SITE", label: "SITE" }
    },
    NUMSITE: {
      type: String,
      default: "",
      documentation: {
        description: "N° du site ",
        label: "N° du site"
      }
    },
    NUMOP: {
      type: String,
      default: "",
      documentation: {
        description: "N° d'opération",
        label: "N° d'opération"
      }
    },
    CHRONO: {
      type: String,
      default: "",
      documentation: {
        description: "Chronologie ",
        label: "Chronologie"
      }
    },
    REPRO: {
      type: String,
      default: "",
      documentation: {
        description: "Contient le numéro du fichier numérique",
        label: "Cote de reproduction"
      }
    },
    STRUCT: {
      type: String,
      default: "",
      documentation: {
        description: "Structure ",
        label: "Structure"
      }
    },
    SUJET: {
      type: String,
      default: "",
      documentation: { description: "Sujet ", label: "Sujet" }
    },
    TICO: {
      type: String,
      default: "",
      documentation: {
        description: "Titre du dossier",
        label: "Titre du dossier"
      }
    },
    NUMI: {
      type: String,
      default: "",
      documentation: {
        description: "Ident. support",
        label: "Ident. support"
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
    ADRS: {
      type: String,
      default: "",
      documentation: {
        description: "Adresse saisie",
        label: "Adresse saisie"
      }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: {
        description: "Contact",
        generated: true,
        validation: "Email",
        label: "CONTACT"
      }
    },
    EMET: {
      type: String,
      default: "",
      documentation: {
        description: "Emetteur (code) ",
        label: "Emetteur (code)"
      }
    },
    NUM: {
      type: String,
      default: "",
      documentation: {
        description: "N° support ",
        label: "N° support"
      }
    },
    IMG: {
      type: String,
      default: "",
      documentation: {
        description: "Images",
        label: "Images"
      }
    },
    WCOM: {
      type: String,
      default: "",
      documentation: {
        description: "Ville [Quelle difference avec COM ?]",
        label: "Ville"
      }
    },
    LIENS: {
      type: String,
      default: "",
      documentation: {
        description: "Liens divers",
        label: "Liens divers"
      }
    },
    LAUTP: {
      type: String,
      default: "",
      documentation: {
        description: "Notice biblio",
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
