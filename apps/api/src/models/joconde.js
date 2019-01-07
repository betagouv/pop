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
        generated: true,
        label: "Producteur"
      }
    },
    BASE: {
      type: String,
      default: "Collections des musées de France (Joconde)",
      documentation: {
        description:
          "Nom de la base : Collections des musées de France (Joconde)",
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
        description:
          "Champ qui permet de savoir si la geolocalisation est disponible ou non",
        generated: true,
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
        label:
          "Référence de mise à jour (marque de la modification de la notice) "
      }
    },
    ADPT: {
      type: [String],
      default: [],
      documentation: {
        description: "Ancien dépôt / changement d’affectation",
        label: "Ancien dépôt"
      }
    },
    APPL: {
      type: String,
      default: "",
      documentation: {
        description: "Appellation",
        label: "Appellation"
      }
    },
    APTN: {
      type: String,
      default: "",
      documentation: {
        description:
          "Ancienne appartenance (nom du donateur / testateur/ vendeur) ",
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
      type: String,
      default: "",
      documentation: {
        description: "Auteur / exécutant / collecteur",
        label: "Auteur /exécutant / collecteur",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T513"
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
        description: "Lien contact musée",
        generated: true,
        label: "Lien contact musée",
        validation: "Email"
      }
    },
    COOR: {
      type: String,
      default: "",
      documentation: {
        description: "Coordinateur",
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
        label: "Date d’acquisition"
      }
    },
    DATA: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]  ",
        deprecated: true
      }
    },
    DATION: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]  ",
        deprecated: true
      }
    },
    DDPT: {
      type: String,
      default: "",
      documentation: {
        description: "Date de dépôt / changement d’affectation",
        label: "Date de dépôt"
      }
    },
    DECV: {
      type: String,
      default: "",
      documentation: {
        description:
          "Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur) ",
        label:
          "Découverte / collecte / récolte (lieu de découverte / collecte / récolte) ; Type de site ; Méthode de découverte /collecte / récolte ; Date de découverte / collecte / récolte ; Découvreur / collecteur)",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T115"
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: {
        description: "Dénomination du bien",
        label: "Dénomination du bien",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T505"
      }
    },
    DEPO: {
      type: String,
      default: "",
      documentation: {
        description: "Dépôt / établissement dépositaire",
        label: "Dépot"
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
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        deprecated: true
      }
    },
    DIFFU: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        deprecated: true
      }
    },
    DIMS: {
      type: String,
      default: "",
      documentation: {
        description: "Mesures  / Dimensions",
        label: "Mesures"
      }
    },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la dernière mise à jour",
        generated: true,
        label: "Date de mise à jour"
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la création POP/Mistral",
        generated: true,
        label: "Date de création"
      }
    },
    DOMN: {
      type: [String],
      default: [],
      required: true,
      documentation: {
        description: "Domaine (catégorie du bien) ",
        label: "Domaine (catégorie du bien) ",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T51"
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
    ECOL: {
      type: [String],
      default: [],
      documentation: {
        description: "Ecole ",
        label: "Ecole",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T517"
      }
    },
    EPOQ: {
      type: [String],
      default: [],
      documentation: {
        description: "Epoque /style / mouvement ",
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
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T506"
      }
    },
    GEOHI: {
      type: [String],
      default: [],
      documentation: {
        description: "Géographie historique",
        label: "Géographie historique"
      }
    },
    HIST: {
      type: String,
      default: "",
      documentation: {
        description: "Historique – Objets associés ",
        label: "Historique – Objets associés"
      }
    },
    IMAGE: {
      type: String,
      default: "",
      documentation: {
        description: "[Je ne sais pas à quoi ce champ sert]  ",
        deprecated: true
      }
    },
    IMG: {
      type: [String],
      default: [],
      documentation: {
        description:
          "Contient les images. Le plus souvent généré grâce à REFIM",
        generated: true,
        label: "Images"
      }
    },
    INSC: {
      type: [String],
      default: [],
      documentation: {
        description: "Inscriptions ",
        label: "Inscriptions",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T520"
      }
    },
    INV: {
      type: String,
      default: "",
      required: true,
      documentation: {
        description:
          "N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt",
        label: "N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt"
      }
    },
    LABEL: {
      type: String,
      default: "Musée de France au sens de la loi n°2002-5 du 4 janvier 2002",
      documentation: {
        description:
          "Appellation musée de France : logo : Champ ayant toujours la valeur 'Musée de France au sens de la loi n°2002-5 du 4 janvier 2002'",
        generated: true,
        label: "Appellation musée de France"
      }
    },
    LABO: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        deprecated: true
      }
    },
    LARC: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        deprecated: true
      }
    },
    LIEUX: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu de création / d’exécution / d’utilisation",
        label: "Lieu de création / d’exécution / d’utilisation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T84"
      }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: {
        description: "Localisation",
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
        deprecated: true
      }
    },
    LOCA3: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        deprecated: true
      }
    },
    MILL: {
      type: [String],
      default: [],
      documentation: {
        description: "Millésime de création / exécution ",
        label: "Millésime de création / exécution"
      }
    },
    MILU: {
      type: String,
      default: "",
      documentation: {
        description: "Millésime d’utilisation ",
        label: "Millésime d’utilisation"
      }
    },
    MOSA: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        deprecated: true
      }
    },
    MSGCOM: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Surement à nettoyer. J'ai vu du code dans ce champ] Lien commande de reproduction et/ou de conditions d’utilisation ",
        label: "Lien commande de reproduction et/ou de conditions d’utilisation"
      }
    },
    MUSEO: {
      type: String,
      default: "",
      documentation: {
        description: "Lien Numéro MUSEOFILE",
        label: "Lien Numéro MUSEOFILE"
      }
    },
    NSDA: {
      type: String,
      default: "",
      documentation: {
        description: "Numéro de site",
        label: "Numéro de site"
      }
    },
    ONOM: {
      type: [String],
      default: [],
      documentation: {
        description: "Onomastique",
        label: "Onomastique"
      }
    },
    PAUT: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions /auteur / exécutant / collecteur",
        label: "Précisions /auteur / exécutant / collecteur"
      }
    },
    PDAT: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation]",
        deprecated: true
      }
    },
    PDEC: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur la découverte / collecte / récolte",
        label: "Précisions sur la découverte / collecte / récolte"
      }
    },
    PEOC: {
      type: [String],
      default: [],
      documentation: {
        description: "Période de l’original copié",
        label: "Période de l’original copié",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521"
      }
    },
    PERI: {
      type: [String],
      default: [],
      documentation: {
        description: "Période de création / exécution ",
        label: "Période de création / exécution",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521"
      }
    },
    PERU: {
      type: [String],
      default: [],
      documentation: {
        description: "Période d’utilisation",
        label: "Période d’utilisation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521"
      }
    },
    PHOT: {
      type: String,
      default: "",
      documentation: {
        description: "Crédits photographiques",
        label: "Crédits photographiques"
      }
    },
    PINS: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur les inscriptions",
        label: "Précisions sur les inscriptions"
      }
    },
    PLIEUX: {
      type: String,
      default: "",
      documentation: {
        description:
          "Précisions sur le lieu de création/ d’exécution / d’utilisation",
        label: "Précisions sur le lieu de création/ d’exécution / d’utilisation"
      }
    },
    PREP: {
      type: [String],
      default: [],
      documentation: {
        description: "Précisions sur le sujet représenté ",
        label: "Précisions sur le sujet représenté"
      }
    },
    PUTI: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur l’utilisation ",
        label: "Précisions sur l’utilisation"
      }
    },
    RANG: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : Pas affiché en production ni en consultation] ",
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
        description:
          "Référence image : lien texte/ image : C'est un code qui permet de retrouver l'url de l'image",
        label: "Référence image"
      }
    },
    REPR: {
      type: String,
      default: "",
      documentation: {
        description: "Sujet représenté ",
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
        deprecated: true
      }
    },
    SREP: {
      type: [String],
      default: [],
      documentation: {
        description: "Source de la représentation",
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
        label:
          "Statut juridique (type de propriété ; mode d’acquisition ; institution propriétaire (ville quand la commune est propriétaire) ; établissement affectataire"
      }
    },
    TECH: {
      type: [String],
      default: [],
      documentation: {
        description: "Matériaux et techniques",
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
        deprecated: true
      }
    },
    TITR: {
      type: String,
      default: "",
      documentation: {
        description: "Titre de l'oeuvre ",
        label: "Titre"
      }
    },
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description:
          "[Peut être déprécié : A vérifier. Non présent en production] ",
        deprecated: true
      }
    },
    UTIL: {
      type: [String],
      default: [],
      documentation: {
        description: "Utilisation / Destination",
        label: "Utilisation / Destination",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T86"
      }
    },
    VIDEO: {
      type: [String],
      default: [],
      documentation: {
        description: "[Peut être déprécié : A vérifier]",
        label: "Videos"
      }
    },
    WWW: {
      type: String,
      default: "",
      documentation: {
        description: "Lien site associé / site complémentaire",
        label: "Lien site associé / site complémentaire"
      }
    },
    LVID: {
      type: String,
      default: "",
      documentation: {
        description: "Lien video",
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
