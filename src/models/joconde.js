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
        master: true
      }
    },
    BASE: {
      type: String,
      default: "Collections des musées de France (Joconde)",
      documentation: {
        description:
          "Nom de la base : Collections des musées de France (Joconde)",
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
        master: true
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
        master: false
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    REFMIS: {
      type: String,
      default: "",
      documentation: {
        description:
          "Référence de mise à jour (marque de la modification de la notice)",
        master: false
      }
    },
    ADPT: {
      type: [String],
      default: [],
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation] Ancien dépôt / changement d’affectation",
        master: false
      }
    },
    APPL: {
      type: String,
      default: "",
      documentation: { description: "Appellation", master: false }
    },
    APTN: {
      type: String,
      default: "",
      documentation: {
        description:
          "Ancienne appartenance (nom du donateur / testateur/ vendeur) ",
        master: false
      }
    },
    ATTR: {
      type: String,
      default: "",
      documentation: { description: "Anciennes attributions", master: false }
    },
    AUTR: {
      type: String,
      default: "",
      documentation: {
        description: "Auteur /exécutant / collecteur",
        master: false
      }
    },
    BIBL: {
      type: String,
      default: "",
      documentation: { description: "Bibliographie", master: false }
    },
    COMM: {
      type: String,
      default: "",
      documentation: { description: "Commentaires", master: false }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: { description: "Lien contact musée", master: true }
    },
    COOR: {
      type: String,
      default: "",
      documentation: { description: "Coordinateur", master: false }
    },
    COPY: {
      type: String,
      default: "",
      documentation: { description: "Copyright notice", master: false }
    },
    DACQ: {
      type: String,
      default: "",
      documentation: { description: "Date d’acquisition", master: false }
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
        master: false
      }
    },
    DECV: {
      type: String,
      default: "",
      documentation: {
        description:
          "Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur) ",
        master: false
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: { description: "Dénomination du bien", master: false }
    },
    DEPO: {
      type: String,
      default: "",
      documentation: {
        description: "Dépôt / établissement dépositaire",
        master: false
      }
    },
    DESC: {
      type: String,
      default: "",
      documentation: { description: "Description ", master: false }
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
      documentation: { description: "Mesures  / Dimensions", master: false }
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
      type: [String],
      default: [],
      documentation: {
        description: "Domaine (catégorie du bien) ",
        master: false
      }
    },
    DREP: {
      type: String,
      default: "",
      documentation: { description: "Date de la représentation", master: false }
    },
    ECOL: {
      type: [String],
      default: [],
      documentation: { description: "Ecole ", master: false }
    },
    EPOQ: {
      type: [String],
      default: [],
      documentation: {
        description: "Epoque /style / mouvement ",
        master: false
      }
    },
    ETAT: {
      type: [String],
      default: [],
      documentation: {
        description:
          "[surement à nettoyer] Etat du bien. C'est une liste finie de valeurs possibles",
        master: false
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: { description: "Exposition ", master: false }
    },
    GENE: {
      type: [String],
      default: [],
      documentation: { description: "Genèse ", master: false }
    },
    GEOHI: {
      type: [String],
      default: [],
      documentation: { description: "Géographie historique", master: false }
    },
    HIST: {
      type: String,
      default: "",
      documentation: {
        description: "Historique – Objets associés ",
        master: false
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
        master: true
      }
    },
    INSC: {
      type: [String],
      default: [],
      documentation: { description: "Inscriptions ", master: false }
    },
    INV: {
      type: String,
      default: "",
      documentation: {
        description:
          "N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt",
        master: false
      }
    },
    LABEL: {
      type: String,
      default: "Musée de France au sens de la loi n°2002-5 du 4 janvier 2002",
      documentation: {
        description:
          "Appellation musée de France : logo : Champs ayant toujours la valeur 'Musée de France au sens de la loi n°2002-5 du 4 janvier 2002'",
        master: true
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
        master: false
      }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: { description: "Localisation", master: false }
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
        master: false
      }
    },
    MILU: {
      type: String,
      default: "",
      documentation: { description: "Millésime d’utilisation ", master: false }
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
        master: false
      }
    },
    MUSEO: {
      type: String,
      default: "",
      documentation: { description: "Lien Numéro MUSEOFILE", master: false }
    },
    NSDA: {
      type: String,
      default: "",
      documentation: { description: "Numéro de site", master: false }
    },
    ONOM: {
      type: [String],
      default: [],
      documentation: { description: "Onomastique", master: false }
    },
    PAUT: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions /auteur / exécutant / collecteur",
        master: false
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
        master: false
      }
    },
    PEOC: {
      type: [String],
      default: [],
      documentation: {
        description: "Période de l’original copié",
        master: false
      }
    },
    PERI: {
      type: [String],
      default: [],
      documentation: {
        description: "Période de création / exécution ",
        master: false
      }
    },
    PERU: {
      type: [String],
      default: [],
      documentation: { description: "Période d’utilisation", master: false }
    },
    PHOT: {
      type: String,
      default: "",
      documentation: { description: "Crédits photographiques", master: false }
    },
    PINS: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur les inscriptions",
        master: false
      }
    },
    PLIEUX: {
      type: String,
      default: "",
      documentation: {
        description:
          "Précisions sur le lieu de création/ d’exécution / d’utilisation",
        master: false
      }
    },
    PREP: {
      type: [String],
      default: [],
      documentation: {
        description: "Précisions sur le sujet représenté ",
        master: false
      }
    },
    PUTI: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur l’utilisation ",
        master: false
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
      documentation: { description: "Rédacteur ", master: false }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: {
        description:
          "Référence image : lien texte/ image : C'est un code qui permet de retrouver l'url de l'image",
        master: false
      }
    },
    REPR: {
      type: String,
      default: "",
      documentation: { description: "Sujet représenté ", master: false }
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
        master: false
      }
    },
    STAT: {
      type: [String],
      default: [],
      required: true,
      documentation: {
        description:
          "Statut juridique (type de propriété ; mode d’acquisition ; institution propriétaire (ville quand la commune est propriétaire) ; établissement affectataire",
        master: false
      }
    },
    TECH: {
      type: [String],
      default: [],
      documentation: { description: "Matériaux et techniques", master: false }
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
      documentation: { description: "Titre de l'oeuvre ", master: false }
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
      documentation: { description: "Utilisation / Destination", master: false }
    },
    VIDEO: {
      type: [String],
      default: [],
      documentation: {
        description: "[Peut être déprécié : A vérifier]",
        master: false
      }
    },
    WWW: {
      type: String,
      default: "",
      documentation: {
        description: "Lien site associé / site complémentaire",
        master: false
      }
    },
    LVID: {
      type: String,
      default: "",
      documentation: { description: "Lien video", master: false }
    }
  },
  { collection: "joconde" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "joconde"
});

Schema.pre("save", function(next, done) {
  this.CONTIENT_IMAGE = this.IMG ? "oui" : "non";
  if (this.MUSEO) {
    Museo.findOne({ REF: this.MUSEO }, (err, museo) => {
      if (!err && museo && museo.location && museo.location.lat) {
        this.POP_COORDONNEES = museo.location;
      }
      next();
    });
  } else {
    next();
  }
});

const object = mongoose.model("joconde", Schema);

module.exports = object;
