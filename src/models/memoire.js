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
        description:
          "\
      Producteur de la donnée déterminé grâce à la référence : \
      IV=INV\
      OA=CAOA\
      MH=CRMH\
      AR=ARCH\
      AP=SDAP\
      Autre=SAP",
        master: true
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
      documentation: {
        description: "Référence unique de la notice",
        master: false
      }
    },
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description: "Index global [Peut etre déprécié]",
        master: false
      }
    },
    ADRESSE: {
      type: String,
      default: "",
      documentation: { description: "Adresse ", master: false }
    },
    AUTOEU: {
      type: String,
      default: "",
      documentation: { description: "Auteur oeuvre représentée", master: false }
    },
    AUTG: {
      type: String,
      default: "",
      documentation: { description: "Auteur gravure", master: false }
    },
    AUTP: {
      type: String,
      default: "",
      documentation: { description: "Notice biblio", master: false }
    },
    AUTOR: {
      type: String,
      default: "",
      documentation: { description: "Auteur original", master: false }
    },
    AUTTI: {
      type: String,
      default: "",
      documentation: { description: "Auteur tirage", master: false }
    },
    COM: {
      type: String,
      default: "",
      documentation: { description: "Commune", master: false }
    },
    DOM: {
      type: String,
      default: "",
      documentation: {
        description: "Domaine",
        master: false
      }
    },
    EDIF: {
      type: String,
      default: "",
      documentation: { description: "Nom édifice", master: false }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: {
        description: "Référence d’exposition de l’image ",
        master: false
      }
    },
    JDATPV: {
      type: String,
      default: "",
      documentation: { description: "Justif date pv", master: false }
    },
    LIEUCOR: {
      type: String,
      default: "",
      documentation: { description: "Lieu cons orig.", master: false }
    },
    COTECOR: {
      type: String,
      default: "",
      documentation: { description: "Cote cons orig. ", master: false }
    },
    LIEUCTI: {
      type: String,
      default: "",
      documentation: { description: "Lieu cons tir. ", master: false }
    },
    COTECTI: {
      type: String,
      default: "",
      documentation: {
        description: "Cote conservation du tirage ",
        master: false
      }
    },
    LIEUCP: {
      type: String,
      default: "",
      documentation: { description: "Lieu cons pho.", master: false }
    },
    COTECP: {
      type: String,
      default: "",
      documentation: {
        description: "Cote conservation du phototype",
        master: false
      }
    },
    LEG: {
      type: String,
      default: "",
      documentation: { description: "Légende ", master: false }
    },
    OBJT: {
      type: String,
      default: "",
      documentation: { description: "Nom objet", master: false }
    },
    OBS: {
      type: String,
      default: "",
      documentation: { description: "Obs phototype", master: false }
    },
    OBSOR: {
      type: String,
      default: "",
      documentation: { description: "Obs original", master: false }
    },
    OBSTI: {
      type: String,
      default: "",
      documentation: { description: "Obs tirage", master: false }
    },
    PAYS: {
      type: String,
      default: "",
      documentation: { description: "Pays   ", master: false }
    },
    PUBLI: {
      type: String,
      default: "",
      documentation: { description: "Publication ", master: false }
    },
    TIREDE: {
      type: String,
      default: "",
      documentation: { description: "Pub. photograph.", master: false }
    },
    ROLE: {
      type: String,
      default: "",
      documentation: {
        documentation: { description: "Rôle joué ", master: false }
      }
    },
    PRECOR: {
      type: String,
      default: "",
      documentation: { description: "Préc original", master: false }
    },
    SERIE: {
      type: String,
      default: "",
      documentation: { description: "Titre série", master: false }
    },
    THEATRE: {
      type: String,
      default: "",
      documentation: { description: "", master: false }
    },
    TITRE: {
      type: String,
      default: "",
      documentation: { description: "", master: false }
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
    IDPROD: {
      type: String,
      default: "",
      documentation: { description: "Emetteur (nom) ", master: false }
    },
    NUMCD: {
      type: String,
      default: "",
      documentation: { description: "Numéro CD", master: false }
    },
    NUMF: {
      type: String,
      default: "",
      documentation: { description: "No de fond", master: false }
    },
    INSEE: {
      type: String,
      default: "",
      documentation: { description: "Code INSEE", master: false }
    },
    NVD: {
      type: String,
      default: " ",
      documentation: { description: "vidéodisque", master: false }
    },
    MARQ: {
      type: String,
      default: "",
      documentation: { description: "Ordre images", master: false }
    },
    ACC: {
      type: String,
      default: "",
      documentation: { description: "Accessoire pose", master: false }
    },
    ACQU: {
      type: String,
      default: " ",
      documentation: { description: "Acquisition", master: false }
    },
    ADPHOT: {
      type: String,
      default: "",
      documentation: { description: "Adresse personne ", master: false }
    },
    AIRE: {
      type: String,
      default: "",
      documentation: { description: "Aire d'étude", master: false }
    },
    ANUMP: {
      type: String,
      default: "",
      documentation: {
        description: "Ancien numéro (ancienne cote du phototype)",
        master: false
      }
    },
    COPY: {
      type: String,
      default: "",
      documentation: { description: "Crédit photo ", master: false }
    },
    COULEUR: {
      type: String,
      default: "",
      documentation: {
        description:
          "Couleur [Devrait contenir oui ou non mais contient bcp plus . donnée à nettoyer]",
        master: false
      }
    },
    COSTUME: {
      type: String,
      default: "",
      documentation: {
        description: "Costume de la personne représentée",
        master: false
      }
    },
    DATIMM: {
      type: String,
      default: "",
      documentation: { description: "Date immatricul", master: false }
    },
    DATOEU: {
      type: String,
      default: "",
      documentation: { description: "Date oeuv année", master: false }
    },
    DATPV: {
      type: String,
      default: "",
      documentation: { description: "Date prise vue ", master: false }
    },
    DATOR: {
      type: String,
      default: "",
      documentation: { description: "Date original", master: false }
    },
    DATTI: {
      type: String,
      default: "",
      documentation: { description: "Date tirage", master: false }
    },
    DATG: {
      type: String,
      default: "",
      documentation: { description: "Date gravure", master: false }
    },
    DATD: {
      type: String,
      default: "",
      documentation: { description: "Date dessin", master: false }
    },
    DIFF: {
      type: String,
      default: "",
      documentation: { description: "Droits diffusion", master: false }
    },
    DPT: {
      type: String,
      default: "",
      documentation: { description: "Département ", master: false }
    },
    EDIARCH: {
      type: String,
      default: "",
      documentation: { description: "Interprétation", master: false }
    },
    ECH: {
      type: String,
      default: "",
      documentation: { description: "Echelle ", master: false }
    },
    FORMAT: {
      type: String,
      default: "",
      documentation: { description: "Format phototype", master: false }
    },
    FORMATOR: {
      type: String,
      default: "",
      documentation: { description: "Format original", master: false }
    },
    FORMATTI: {
      type: String,
      default: "",
      documentation: { description: "Format tirage", master: false }
    },
    LBASE: {
      type: [String],
      default: [],
      index: true,
      documentation: {
        description:
          "LBASE contient la référence vers la notice Palissy ou Mérimée contenant l'image",
        master: false
      }
    },
    WEB: {
      type: String,
      default: "",
      documentation: { description: "Accès Mémoire", master: false }
    },
    LIB: {
      type: String,
      default: "",
      documentation: { description: "Mots candidats", master: false }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: { description: "Localisation ", master: false }
    },
    LIEUORIG: {
      type: String,
      default: "",
      documentation: { description: "Lieu de dépôt", master: false }
    },
    MCGEO: {
      type: String,
      default: "",
      documentation: { description: "Nom géographique", master: false }
    },
    MCL: {
      type: String,
      default: "",
      documentation: { description: "Mots clés", master: false }
    },
    MENTIONS: {
      type: String,
      default: "",
      documentation: { description: "Mentions photo", master: false }
    },
    MENTOR: {
      type: String,
      default: "",
      documentation: { description: "Mentions orig", master: false }
    },
    MENTTI: {
      type: String,
      default: "",
      documentation: { description: "Mentions tirage", master: false }
    },
    MCPER: {
      type: String,
      default: "",
      documentation: { description: "Nom personne", master: false }
    },
    VUECD: {
      type: String,
      default: "",
      documentation: { description: "No vue CD", master: false }
    },
    NUMAUTP: {
      type: String,
      default: "",
      documentation: { description: "Cote photographe", master: false }
    },
    NUMCAF: {
      type: String,
      default: "",
      documentation: { description: "No carte fenêtre", master: false }
    },
    ANUMOR: {
      type: String,
      default: "",
      documentation: { description: "No original(anc)", master: false }
    },
    NUMOR: {
      type: String,
      default: "",
      documentation: { description: "No original", master: false }
    },
    NUMP: {
      type: String,
      default: "",
      documentation: { description: "No phototype ", master: false }
    },
    ANUMTI: {
      type: String,
      default: "",
      documentation: { description: "Ancien numéro du tirage", master: false }
    },
    NUMTI: {
      type: String,
      default: "",
      documentation: { description: "No tirage", master: false }
    },
    RENV: {
      type: String,
      default: "",
      documentation: { description: "Renvoi ", master: false }
    },
    REG: {
      type: String,
      default: "",
      documentation: { description: "Région ", master: false }
    },
    SENS: {
      type: String,
      default: "",
      documentation: {
        description: "Sens [Qu'est ce que c'est ?] ",
        master: false
      }
    },
    SCLE: {
      type: String,
      default: "",
      documentation: { description: "Date oeuv siècle", master: false }
    },
    SUP: {
      type: String,
      default: "",
      documentation: { description: "Support ", master: false }
    },
    TECH: {
      type: String,
      default: "",
      documentation: { description: "Technique photo", master: false }
    },
    TECHOR: {
      type: String,
      default: "",
      documentation: { description: "Technique orig", master: false }
    },
    TECHTI: {
      type: String,
      default: "",
      documentation: { description: "Technique tirage", master: false }
    },
    TOILE: {
      type: String,
      default: "",
      documentation: { description: "Toile de fond", master: false }
    },
    TYP: {
      type: String,
      default: "",
      documentation: {
        description: "Type  [Qu'est ce que c'est ?]",
        master: false
      }
    },
    TYPDOC: {
      type: String,
      default: "",
      documentation: { description: "phototype argentique", master: false }
    },
    TYPEIMG: {
      type: String,
      default: "",
      documentation: { description: "Type image num", master: false }
    },
    TYPSUPP: {
      type: String,
      default: "",
      documentation: { description: "Type support num ", master: false }
    },
    VIDEO: {
      type: String,
      default: "",
      documentation: {
        description: "Vidéo [Semble être doublon avec IMG]",
        master: false
      }
    },
    LBASE2: {
      type: String,
      default: "",
      documentation: {
        description: "Liens base  [Quelle différence avec LBASE?]",
        master: false
      }
    },
    LEG2: {
      type: String,
      default: "",
      documentation: { description: "Légende thes. ", master: false }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: { description: "Ref Image", master: false }
    },
    REFIMG: {
      type: String,
      default: "",
      documentation: { description: "Nom Image", master: false }
    },
    MOSA: {
      type: String,
      default: "",
      documentation: { description: "Mosaïques ", master: false }
    },
    SITE: {
      type: String,
      default: "",
      documentation: { description: "SITE", master: false }
    },
    NUMSITE: {
      type: String,
      default: "",
      documentation: { description: "N° du site ", master: false }
    },
    NUMOP: {
      type: String,
      default: "",
      documentation: { description: "N° d'opération", master: false }
    },
    CHRONO: {
      type: String,
      default: "",
      documentation: { description: "Chronologie ", master: false }
    },
    STRUCT: {
      type: String,
      default: "",
      documentation: { description: "Structure ", master: false }
    },
    SUJET: {
      type: String,
      default: "",
      documentation: { description: "Sujet ", master: false }
    },
    TICO: {
      type: String,
      default: "",
      documentation: { description: "Titre du dossier", master: false }
    },
    NUMI: {
      type: String,
      default: "",
      documentation: { description: "Ident. support", master: false }
    },
    LIEU: {
      type: String,
      default: "",
      documentation: { description: "Lieu-dit ", master: false }
    },
    ADRS: {
      type: String,
      default: "",
      documentation: { description: "Adresse saisie", master: false }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: { description: "Contact ", master: true }
    },
    EMET: {
      type: String,
      default: "",
      documentation: { description: "Emetteur (nom) ", master: false }
    },
    NUM: {
      type: String,
      default: "",
      documentation: { description: "N° support ", master: false }
    },
    IMG: {
      type: String,
      default: "",
      documentation: { description: "Lien vers l'image", master: false }
    },
    WCOM: {
      type: String,
      default: "",
      documentation: {
        description: "Ville [Quelle difference avec COM ?]",
        master: false
      }
    },
    LIENS: {
      type: String,
      default: "",
      documentation: { description: "Liens divers", master: false }
    },
    LAUTP: {
      type: String,
      default: "",
      documentation: { description: "Notice biblio", master: false }
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
