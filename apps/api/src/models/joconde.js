var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    PRODUCTEUR: {
      type: String,
      default: "MUSEE",
      documentation: {
        description: "Producteur de la donnée : MUSEE",
        generated: true,
        label: "Producteur"
      }
    },
    BASE: {
      type: String,
      default: "Collections des musées de France (Joconde)",
      documentation: {
        description: "Nom de la base : Collections des musées de France (Joconde)",
        generated: true,
        label: "Nom de la base"
      }
    },
    CONTIENT_IMAGE: {
      type: String,
      default: "",
      documentation: {
        description:
          "Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champ sera oui', sinon 'non'. Ce champ est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES",
        generated: true,
        label: "Contient une image"
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
        description: "Champ qui permet de savoir si la geolocalisation est disponible ou non",
        generated: true,
        label: "Contient une position"
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
        description: "Référence (numéro système de la notice) doit être supérieure ou égale à 11 caractères.",
        label: "Référence",
        opendata: true
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    REFMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Référence de mise à jour",
        label: "Référence MAJ"
      }
    },
    MANQUANT: {
      type: [String],
      default: [],
      documentation: {
        description:
          "Un bien manquant est un bien inscrit à l’inventaire d’un musée de France qui, à l’issue du récolement décennal et de recherches répétées et infructueuses, n’a pas pu être retrouvé. Depuis 2016, le signalement des biens constatés manquants et volés est une obligation pour permettre d’élargir les recherches.",
        label: "Situation particulière"
      }
    },
    MANQUANT_COM: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Situation particulière"
      }
    },
    ADPT: {
      type: String,
      default: "",
      documentation: {
        description: "Ancien dépôt / changement d’affectation",
        label: "Ancien dépôt",
        opendata: true
      }
    },
    APPL: {
      type: String,
      default: "",
      documentation: {
        description: "Appellation",
        label: "Appellation",
        opendata: true
      }
    },
    APTN: {
      type: String,
      default: "",
      documentation: {
        description: "Ancienne appartenance ",
        label: "Ancienne appartenance"
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
    AUTR: {
      type: [String],
      default: [],
      documentation: {
        description: "Auteur",
        label: "Auteur",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T513",
        listeAutorite: "Entités auteurs",
        idthesaurus: "th305",
        opendata: true
      }
    },
    BIBL: {
      type: String,
      default: "",
      documentation: {
        description: "Bibliographie",
        label: "Bibliographie"
      }
    },
    COMM: {
      type: String,
      default: "",
      documentation: {
        description: "Commentaires",
        label: "Commentaires"
      }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: {
        description: "Lien contact musée. Cette information vient de la notice MUSEO et doit être un email valide.",
        generated: true,
        label: "Contact musée",
      }
    },
    COOR: {
      type: String,
      default: "",
      documentation: {
        description: "Coordinateur",
        deprecated: true,
        label: "Coordinateur"
      }
    },
    COPY: {
      type: String,
      default: "",
      documentation: {
        description: "Copyright notice",
        label: "Copyright notice"
      }
    },
    DACQ: {
      type: String,
      default: "",
      documentation: {
        description: "Date d’acquisition",
        label: "Date acquisition",
        opendata: true
      }
    },
    DATA: {
      type: String,
      default: "",
      documentation: {
        label: "Artiste sous droits",
        deprecated: true,
        description: "[Peut être déprécié : Pas affiché en production ni en diffusion]  "
      }
    },
    DATION: {
      type: String,
      default: "",
      documentation: {
        description: "[Peut être déprécié : Pas affiché en production ni en diffusion]  ",
        deprecated: true
      }
    },
    DDPT: {
      type: String,
      default: "",
      documentation: {
        description: "Date de dépôt / changement d’affectation",
        label: "Date de dépôt",
        opendata: true
      }
    },
    DECV: {
      type: String,
      default: "",
      documentation: {
        description: "Découverte / collecte",
        label: "Découverte / collecte",
        opendata: true
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: {
        description: "Dénomination",
        label: "Dénomination",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T505",
        listeAutorite: "Liste d'autorités Dénomination - Joconde",
        idthesaurus: "th290",
        opendata: true
      }
    },
    DEPO: {
      type: [String],
      default: [],
      documentation: {
        description: "Dépôt / établissement dépositaire",
        label: "Lieu de dépot",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T515",
        listeAutorite: "Liste d'autorités Localisation Joconde",
        idthesaurus: "th306",
        opendata: true
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
    DESY: {
      type: String,
      default: "",
      documentation: {
        description: "Date création avant 1995 ",
        label: "Date création avant 1995 "
      }
    },
    DIFFU: {
      type: String,
      default: "",
      documentation: {
        description: "Champ déprécié",
        deprecated: true
      }
    },
    DIMS: {
      type: String,
      default: "",
      documentation: {
        description: "Mesures / Dimensions",
        label: "Mesures",
        opendata: true
      }
    },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "Date de mise à jour (format AAAA-MM-JJ)",
        generated: true,
        label: "Date de mise à jour",
        opendata: true
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la création (format AAAA-MM-JJ)",
        generated: true,
        label: "Date de création",
        opendata: true
      }
    },
    DOMN: {
      type: [String],
      default: [],
      required: true,
      documentation: {
        description: "Domaine",
        label: "Domaine",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T51",
        listeAutorite: "Liste d'autorités Domaines - Joconde",
        idthesaurus: "th294",
        opendata: true
      }
    },
    DREP: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la représentation",
        label: "Date sujet représenté"
      }
    },
    ECOL: {
      type: [String],
      default: [],
      documentation: {
        description: "Ecole ",
        label: "Ecole-pays",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T517",
        listeAutorite: "Liste d'autorités Écoles - Joconde",
        idthesaurus: "th295",
        opendata: true
      }
    },
    EPOQ: {
      type: [String],
      default: [],
      documentation: {
        description: "Epoque /style / mouvement ",
        label: "Epoque",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T93",
        listeAutorite: "Liste d'autorités Époques - Joconde",
        idthesaurus: "th289",
        opendata: true
      }
    },
    ETAT: {
      type: String,
      default: "",
      documentation: {
        description: "Etat du bien",
        label: "Etat du bien"
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
    GENE: {
      type: [String],
      default: [],
      documentation: {
        description: "Genèse ",
        label: "Genèse",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T506",
        listeAutorite: "Liste d'autorités Genèse",
        idthesaurus: "th298"
      }
    },
    GEOHI: {
      type: [String],
      default: [],
      documentation: {
        description: "Géographie historique",
        label: "Lieu historique",
        opendata: true
      }
    },
    HIST: {
      type: String,
      default: "",
      documentation: {
        description: "Historique",
        label: "Historique"
      }
    },
    IMAGE: {
      type: String,
      default: "",
      documentation: {
        description: "Champ déprécié  ",
        deprecated: true
      }
    },
    IMG: {
      type: [String],
      default: [],
      documentation: {
        description: "IMAGE",
        label: "Adresse image"
      }
    },
    INSC: {
      type: [String],
      default: [],
      documentation: {
        description: "Inscriptions ",
        label: "Inscriptions"
      }
    },
    INV: {
      type: String,
      default: "",
      required: true,
      documentation: {
        description: "N°Inventaire, autres numéros",
        label: "N°Inventaire",
        opendata: true
      }
    },
    LABEL: {
      type: String,
      default: "Musée de France au sens de la loi n°2002-5 du 4 janvier 2002",
      documentation: {
        description: "Appellation musée de France",
        generated: true,
        label: "Appellation musée de France",
        opendata: true
      }
    },
    LABO: {
      type: String,
      default: "",
      documentation: {
        description: "Champ déprécié",
        deprecated: true
      }
    },
    LARC: {
      type: String,
      default: "",
      documentation: {
        description: "Lien base Arcade",
        label: "Lien base Arcade"
      }
    },
    LIEUX: {
      type: [String],
      default: [],
      documentation: {
        description: "Lieu de création / d’exécution / d’utilisation",
        label: "Lieu de création/utilisation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T84",
        listeAutorite: "Liste autorités Lieux",
        idthesaurus: "th284",
        opendata: true
      }
    },
    REGION: {
      type: String,
      default: "",
      documentation: {
        description: "Région syncronisée sur la valeur de REGION de la fiche MUSEO",
        label: "Région",
        generated: true
      }
    },
    DPT: {
      type: String,
      default: "",
      documentation: {
        description: "Département syncronisée sur la valeur de DPT de la fiche MUSEO",
        label: "Département",
        generated: true
      }
    },
    VILLE_M: {
      type: String,
      default: "",
      documentation: {
        description: "VILLE syncronisée sur la valeur de VILLE_M de la fiche MUSEO",
        label: "Ville",
        generated: true
      }
    },
    NOMOFF: {
      type: String,
      default: "",
      documentation: {
        description: "NOMOFF syncronisée sur la valeur de NOMOFF de la fiche MUSEO",
        label: "Nom du musée",
        generated: true
      }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: {
        description: "Localisation",
        label: "Localisation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T515",
        listeAutorite: "Liste d'autorités Localisation - Joconde",
        idthesaurus: "th306",
        opendata: true
      }
    },
    LOCA2: {
      type: String,
      default: "",
      documentation: {
        description: "Pays-region-ville",
        deprecated: true,
        label: "Pays-region-ville"
      }
    },
    LOCA3: {
      type: String,
      default: "",
      documentation: {
        label: "Date d'entrée dans le domaine public",
        deprecated: true,
        description: "Champ déprécié"
      }
    },
    MILL: {
      type: [String],
      default: [],
      documentation: {
        description: "Millésime de création / exécution ",
        label: "Millésime de création",
        opendata: true
      }
    },
    MILU: {
      type: String,
      default: "",
      documentation: {
        description: "Millésime d’utilisation / destination",
        label: "Millésime d’utilisation",
        opendata: true
      }
    },
    MOSA: {
      type: String,
      default: "",
      documentation: {
        description: "Champ déprécié",
        deprecated: true
      }
    },
    MSGCOM: {
      type: String,
      default: "",
      documentation: {
        description: "Lien commande de reproduction et/ou de conditions d’utilisation ",
        label: "Lien commande photo"
      }
    },
    MUSEO: {
      type: String,
      default: "",
      required: true,
      index: true,
      documentation: {
        description: "Lien MUSEOFILE",
        label: "Lien MUSEOFILE",
        opendata: true
      }
    },
    NSDA: {
      type: String,
      default: "",
      documentation: {
        description: "Genre",
        label: "Genre",
        deprecated: true
      }
    },
    ONOM: {
      type: [String],
      default: [],
      documentation: {
        description: "Onomastique",
        label: "Onomastique",
        opendata: true
      }
    },
    PAUT: {
      type: String,
      default: "",
      documentation: {
        description: "Précision auteur",
        label: "Précision auteur",
        opendata: true
      }
    },
    PDAT: {
      type: String,
      default: "",
      documentation: {
        description: "[Peut être déprécié : Pas affiché en production ni en diffusion]",
        deprecated: true,
        label: "Précision datation"
      }
    },
    PDEC: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur la découverte / collecte",
        label: "Précisions découverte"
      }
    },
    PEOC: {
      type: [String],
      default: [],
      documentation: {
        description: "Période de l’original copié",
        label: "Période de l’original copié",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521",
        listeAutorite: "Liste d'autorités Périodes - Joconde",
        idthesaurus: "th287",
        opendata: true
      }
    },
    PERI: {
      type: [String],
      default: [],
      documentation: {
        description: "Période de création / exécution ",
        label: "Période de création",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521",
        listeAutorite: "Liste d'autorités Périodes - Joconde",
        idthesaurus: "th287",
        opendata: true
      }
    },
    PERU: {
      type: [String],
      default: [],
      documentation: {
        description: "Période d’utilisation / destination",
        label: "Période d’utilisation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521",
        listeAutorite: "Liste d'autorités Périodes - Joconde",
        idthesaurus: "th287",
        opendata: true
      }
    },
    PHOT: {
      type: String,
      default: "",
      documentation: {
        description: "Crédits photographiques",
        label: "Crédits photos"
      }
    },
    PINS: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur les inscriptions",
        label: "Précisions inscriptions"
      }
    },
    PLIEUX: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur le lieu de création/ d’exécution / d’utilisation",
        label: "Précisions lieu création"
      }
    },
    PREP: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur le sujet représenté ",
        label: "Précisions sujet représenté"
      }
    },
    PUTI: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur l’utilisation ",
        label: "Précisions utilisation"
      }
    },
    RANG: {
      type: String,
      default: "",
      documentation: {
        description: "Champ déprécié ",
        deprecated: true
      }
    },
    REDA: {
      type: [String],
      default: [],
      documentation: {
        description: "Rédacteur ",
        label: "Rédacteur"
      }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: {
        description: "Référence image",
        label: "Référence image"
      }
    },
    REFMEM: {
      type: [String],
      index: true,
      default: [],
      documentation: {
        description: "Références des notices Mémoire liées à la notice Joconde",
        label: "Références Mémoire liées"
      }
    },
    REFMER: {
      type: [String],
      index: true,
      default: [],
      documentation: {
        description: "Références des notices Mérimée liées à la notice Joconde",
        label: "Références Mérimée liées"
      }
    },
    REFPAL: {
      type: [String],
      index: true,
      default: [],
      documentation: {
        description: "Références des notices Palissy liées à la notice Joconde",
        label: "Références Palissy liées"
      }
    },
    REPR: {
      type: [String],
      default: [],
      documentation: {
        description: "Sujet représenté ",
        label: "Sujet représenté",
        opendata: true
      }
    },
    RETIF: {
      type: String,
      default: "",
      documentation: {
        description: "Lien INHA",
        label: "Lien INHA"
      }
    },
    SREP: {
      type: [String],
      default: [],
      documentation: {
        description: "Source de la représentation",
        label: "Source représentation",
        opendata: true
      }
    },
    STAT: {
      type: [String],
      default: [],
      required: true,
      documentation: {
        description: "Statut juridique",
        label: "Statut juridique",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T515",
        listeAutorite: "Liste d'autorités Localisation Joconde",
        idthesaurus: "th306",
        opendata: true
      }
    },
    TECH: {
      type: [String],
      default: [],
      documentation: {
        description: "Matériaux et techniques",
        label: "Matériaux - techniques",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T516",
        listeAutorite: "Liste d'autorités Technique",
        idthesaurus: "th291",
        opendata: true
      }
    },
    TICO: {
      type: String,
      default: "",
      documentation: {
        description: "Champ déprécié ",
        deprecated: true
      }
    },
    TITR: {
      type: String,
      default: "",
      documentation: {
        description: "Titre",
        label: "Titre",
        opendata: true
      }
    },
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description: "[Peut être déprécié : A vérifier. Non présent en production] ",
        deprecated: true,
        label: "Recherche sur tout"
      }
    },
    UTIL: {
      type: [String],
      default: [],
      documentation: {
        description: "Utilisation / Destination",
        label: "Utilisation / Destination",
        listeAutorite: "Liste d'autorités Utilisation - Joconde",
        idthesaurus: "th304",
        opendata: true
      }
    },
    VIDEO: {
      type: [String],
      default: [],
      documentation: {
        description: "Affichage image",
        label: "Affichage image",
        deprecated: true
      }
    },
    WWW: {
      type: [String],
      default: [],
      documentation: {
        description: "Lien site associé. Doit être une URL valide.",
        label: "Lien site associé"
      }
    },
    LVID: {
      type: String,
      default: "",
      documentation: {
        description: "Lien vidéo. Doit être une URL valide.",
        label: "Lien Vidéo"
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
    ]
  },
  { collection: "joconde" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "joconde",
  bulk: { size: 500, delay: 2000 }
});

const object = mongoose.model("joconde", Schema);

module.exports = object;
