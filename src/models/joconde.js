var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");
const Museo = require("./museo");

const Schema = new mongoose.Schema(
  {
    PRODUCTEUR: {
      type: String,
      default: "MUSEE",
      documentation: {
        description: "Producteur de la donnée : MUSEE",
        master: true,
        label: "Producteur"
      }
    },
    BASE: {
      type: String,
      default: "Collections des musées de France (Joconde)",
      documentation: {
        description:
          "Nom de la base : Collections des musées de France (Joconde)",
        master: true,
        label: "Nom de la base"
      }
    },
    CONTIENT_IMAGE: {
      type: String,
      default: "",
      documentation: {
        description:
          "Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champs sera oui', sinon 'non'. Ce champs est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES",
        master: true,
        label: "Contient une image"
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
      default: "non",
      documentation: {
        description:
          "Champ qui permet de savoir si la geolocalisation est disponible ou non",
        master: true,
        label: "Contient une position"
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
        master: false,
        label: "Référence",
        validation: "Alphanumeric"
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    REFMIS: {
      type: String,
      default: "",
      documentation: {
        description:
          "Référence de mise à jour (marque de la modification de la notice)",
        master: false,
        label: "Référence de mise à jour"
      }
    },
    ADPT: {
      type: [String],
      default: [],
      documentation: {
        description: "Ancien dépôt / changement d’affectation",
        master: false,
        label: "Ancien dépôt"
      }
    },
    APPL: {
      type: String,
      default: "",
      documentation: {
        description: "Appellation",
        master: false,
        label: "Appellation"
      }
    },
    APTN: {
      type: String,
      default: "",
      documentation: {
        description:
          "Ancienne appartenance (nom du donateur / testateur/ vendeur) ",
        master: false,
        label: "Ancienne appartenance"
      }
    },
    ATTR: {
      type: String,
      default: "",
      documentation: {
        description: "Anciennes attributions",
        master: false,
        label: "Anciennes attributions"
      }
    },
    AUTR: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur /exécutant / collecteur",
        master: false,
        label: "Auteur /exécutant / collecteur",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T513"
      }
    },
    BIBL: {
      type: String,
      default: "",
      documentation: {
        description: "Bibliographie",
        master: false,
        label: "Bibliographie"
      }
    },
    COMM: {
      type: String,
      default: "",
      documentation: {
        description: "Commentaires",
        master: false,
        label: "Commentaires"
      }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: {
        description: "Lien contact musée",
        master: true,
        label: "Lien contact musée",
        validation: "email"
      }
    },
    COOR: {
      type: String,
      default: "",
      documentation: {
        description: "Coordinateur",
        master: false,
        label: "Coordinateur"
      }
    },
    COPY: {
      type: String,
      default: "",
      documentation: {
        description: "Copyright notice",
        master: false,
        label: "Copyright notice"
      }
    },
    DACQ: {
      type: String,
      default: "",
      documentation: {
        description: "Date d’acquisition",
        master: false,
        label: "Date d’acquisition"
      }
    },
    DATA: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]  ",
        master: false
      }
    },
    DATION: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]  ",
        master: false
      }
    },
    DDPT: {
      type: String,
      default: "",
      documentation: {
        description: "Date de dépôt / changement d’affectation",
        master: false,
        label: "Date de dépôt"
      }
    },
    DECV: {
      type: String,
      default: "",
      documentation: {
        description:
          "Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur) ",
        master: false,
        label: "Découvertes",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T115"
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: {
        description: "Dénomination du bien",
        master: false,
        label: "Dénomination du bien",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T505"
      }
    },
    DEPO: {
      type: String,
      default: "",
      documentation: {
        description: "Dépôt / établissement dépositaire",
        master: false,
        label: "dépot"
      }
    },
    DESC: {
      type: String,
      default: "",
      documentation: {
        description: "Description ",
        master: false,
        label: "Description"
      }
    },
    DESY: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        master: false
      }
    },
    DIFFU: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        master: false
      }
    },
    DIMS: {
      type: String,
      default: "",
      documentation: {
        description: "Mesures  / Dimensions",
        master: false,
        label: "Mesures"
      }
    },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la dernière mise à jour",
        master: true,
        label: "Date de mise à jour"
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la création POP/Mistral",
        master: true,
        label: "Date de création"
      }
    },
    DOMN: {
      type: [String],
      default: [],
      documentation: {
        description: "Domaine (catégorie du bien) ",
        master: false,
        label: "Domaine (catégorie du bien) ",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T51"
      }
    },
    DREP: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la représentation",
        master: false,
        label: "Date de la représentation"
      }
    },
    ECOL: {
      type: [String],
      default: [],
      documentation: {
        description: "Ecole ",
        master: false,
        label: "Ecole",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T517"
      }
    },
    EPOQ: {
      type: [String],
      default: [],
      documentation: {
        description: "Epoque /style / mouvement ",
        master: false,
        label: "Epoque /style / mouvement",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T93"
      }
    },
    ETAT: {
      type: [String],
      default: [],
      documentation: {
        description:
          "[surement à nettoyer] Etat du bien. C'est une liste finie de valeurs possibles",
        master: false,
        label: "Etat du bien"
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: {
        description: "Exposition ",
        master: false,
        label: "Exposition"
      }
    },
    GENE: {
      type: [String],
      default: [],
      documentation: {
        description: "Genèse ",
        master: false,
        label: "Genèse",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T506"
      }
    },
    GEOHI: {
      type: [String],
      default: [],
      documentation: {
        description: "Géographie historique",
        master: false,
        label: "Géographie historique"
      }
    },
    HIST: {
      type: String,
      default: "",
      documentation: {
        description: "Historique – Objets associés ",
        master: false,
        label: "Historique – Objets associés"
      }
    },
    IMAGE: {
      type: String,
      default: "",
      documentation: {
        description: "[Je ne sais pas à quoi ce champ sert]  ",
        master: false
      }
    },
    IMG: {
      type: [String],
      default: [],
      documentation: {
        description:
          "Contient les images. Le plus souvent généré grâce à REFIM",
        master: true,
        label: "Images"
      }
    },
    INSC: {
      type: [String],
      default: [],
      documentation: {
        description: "Inscriptions ",
        master: false,
        label: "Inscriptions",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T520"
      }
    },
    INV: {
      type: String,
      default: "",
      documentation: {
        description:
          "N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt",
        master: false,
        label: "N°Inventaire"
      }
    },
    LABEL: {
      type: String,
      default: "Musée de France au sens de la loi n°2002-5 du 4 janvier 2002",
      documentation: {
        description:
          "Appellation musée de France : logo : Champs ayant toujours la valeur 'Musée de France au sens de la loi n°2002-5 du 4 janvier 2002'",
        master: true,
        label: "Appellation musée de France"
      }
    },
    LABO: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        master: false
      }
    },
    LARC: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        master: false
      }
    },
    LIEUX: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu de création / d’exécution / d’utilisation",
        master: false,
        label: "Lieu de création / d’exécution / d’utilisation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T84"
      }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: {
        description: "Localisation",
        master: false,
        label: "Localisation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T515"
      }
    },
    LOCA2: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        master: false
      }
    },
    LOCA3: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        master: false
      }
    },
    MILL: {
      type: [String],
      default: [],
      documentation: {
        description: "Millésime de création / exécution ",
        master: false,
        label: "Millésime de création / exécution"
      }
    },
    MILU: {
      type: String,
      default: "",
      documentation: {
        description: "Millésime d’utilisation ",
        master: false,
        label: "Millésime d’utilisation"
      }
    },
    MOSA: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        master: false
      }
    },
    MSGCOM: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Surement à nettoyer. J'ai vu du code dans ce champ] Lien commande de reproduction et/ou de conditions d’utilisation ",
        master: false,
        label: "Lien commande"
      }
    },
    MUSEO: {
      type: String,
      default: "",
      documentation: {
        description: "Lien Numéro MUSEOFILE",
        master: false,
        label: "Lien Numéro MUSEOFILE"
      }
    },
    NSDA: {
      type: String,
      default: "",
      documentation: {
        description: "Numéro de site",
        master: false,
        label: "Numéro de site"
      }
    },
    ONOM: {
      type: [String],
      default: [],
      documentation: {
        description: "Onomastique",
        master: false,
        label: "Onomastique"
      }
    },
    PAUT: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions /auteur / exécutant / collecteur",
        master: false,
        label: "Précisions /auteur / exécutant / collecteur"
      }
    },
    PDAT: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        master: false
      }
    },
    PDEC: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur la découverte / collecte / récolte",
        master: false,
        label: "Précisions sur la découverte / collecte / récolte"
      }
    },
    PEOC: {
      type: [String],
      default: [],
      documentation: {
        description: "Période de l’original copié",
        master: false,
        label: "Période de l’original copié",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521"
      }
    },
    PERI: {
      type: [String],
      default: [],
      documentation: {
        description: "Période de création / exécution ",
        master: false,
        label: "Période de création / exécution",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521"
      }
    },
    PERU: {
      type: [String],
      default: [],
      documentation: {
        description: "Période d’utilisation",
        master: false,
        label: "Période d’utilisation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521"
      }
    },
    PHOT: {
      type: String,
      default: "",
      documentation: {
        description: "Crédits photographiques",
        master: false,
        label: "Crédits photographiques"
      }
    },
    PINS: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur les inscriptions",
        master: false,
        label: "Précisions sur les inscriptions"
      }
    },
    PLIEUX: {
      type: String,
      default: "",
      documentation: {
        description:
          "Précisions sur le lieu de création/ d’exécution / d’utilisation",
        master: false,
        label: "Précisions sur le lieu"
      }
    },
    PREP: {
      type: [String],
      default: [],
      documentation: {
        description: "Précisions sur le sujet représenté ",
        master: false,
        label: "Précisions sur le sujet représenté"
      }
    },
    PUTI: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur l’utilisation ",
        master: false,
        label: "Précisions sur l’utilisation"
      }
    },
    RANG: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation] ",
        master: false
      }
    },
    REDA: {
      type: [String],
      default: [],
      documentation: {
        description: "Rédacteur ",
        master: false,
        label: "Rédacteur"
      }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: {
        description:
          "Référence image : lien texte/ image : C'est un code qui permet de retrouver l'url de l'image",
        master: false,
        label: "Référence image"
      }
    },
    REPR: {
      type: String,
      default: "",
      documentation: {
        description: "Sujet représenté ",
        master: false,
        label: "Sujet représenté",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T523"
      }
    },
    RETIF: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation] ",
        master: false
      }
    },
    SREP: {
      type: [String],
      default: [],
      documentation: {
        description: "Source de la représentation",
        master: false,
        label: "Source de la représentation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T523"
      }
    },
    STAT: {
      type: [String],
      default: [],
      required: true,
      documentation: {
        description:
          "Statut juridique (type de propriété ; mode d’acquisition ; institution propriétaire (ville quand la commune est propriétaire) ; établissement affectataire",
        master: false,
        label: "Statut juridique"
      }
    },
    TECH: {
      type: [String],
      default: [],
      documentation: {
        description: "Matériaux et techniques",
        master: false,
        label: "Matériaux et techniques",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T516"
      }
    },
    TICO: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : A vérifier. Non présent en production] ",
        master: false
      }
    },
    TITR: {
      type: String,
      default: "",
      documentation: {
        description: "Titre de l'oeuvre ",
        master: false,
        label: "Titre"
      }
    },
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : A vérifier. Non présent en production] ",
        master: false
      }
    },
    UTIL: {
      type: [String],
      default: [],
      documentation: {
        description: "Utilisation / Destination",
        master: false,
        label: "Utilisation / Destination",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T86"
      }
    },
    VIDEO: {
      type: [String],
      default: [],
      documentation: {
        description: "[Peut être déprécié : A vérifier]",
        master: false,
        label: "Videos"
      }
    },
    WWW: {
      type: String,
      default: "",
      documentation: {
        description: "Lien site associé / site complémentaire",
        master: false,
        label: "Lien site associé / site complémentaire"
      }
    },
    LVID: {
      type: String,
      default: "",
      documentation: {
        description: "Lien video",
        master: false,
        label: "Lien Vidéo"
      }
    }
  },
  { collection: "joconde" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "joconde"
});

const object = mongoose.model("joconde", Schema);

module.exports = object;
