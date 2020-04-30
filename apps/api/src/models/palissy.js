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
        IM = Inventaire
        PM = Monuments Historiques
        EM = ETAT
        Autre = Autre`,
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
    POP_FLAGS: {
      type: [String],
      default: [],
      documentation: {
        description: "Informations et avertissements techniques",
        label: "Alertes POP",
        generated: true
      }
    },
    POP_COORDONNEES: {
      lat: {
        type: Number,
        default: 0,
        documentation: {
          description:
            "Latitude de la notice en WGS84. Il faut vider le champ COOR et ZONE pour pouvoir éditer ce champ"
        }
      },
      lon: {
        type: Number,
        default: 0,
        documentation: {
          description:
            "Longitude de la notice en WGS84. Il faut vider le champ COOR et ZONE pour pouvoir éditer ce champ"
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
        generated: true,
        label: "Nom de la base"
      }
    },
    MEMOIRE: [{ ref: { type: String, index: true }, url: String, name: String, copy: String }],
    REF: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      documentation: {
        description: "Référence de la notice. Obligatoire, doit être alphanumérique.",
        label: "Référence de la notice"
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    ACQU: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Contexte d'acquisition"
      }
    },
    ADRS: {
      type: String,
      default: "",
      documentation: {
        description: "Adresse de l'édifice. Ne peut pas être vide si WADRS est renseigné.",
        label: "Adresse de l'édifice"
      }
    },
    ADRS2: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Adresse de l'édifice contenant masqué"
      }
    },
    AFIG: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Auteur du projet"
      }
    },
    AIRE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Aire d'étude pour le domaine Inventaire"
      }
    },
    APPL: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Appelation d'usage"
      }
    },
    ATEL: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Personne morale créatrice de l'objet"
      }
    },
    AUTP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Auteur de la photographie (Mémoire)"
      }
    },
    AUTR: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Auteur de l'œuvre ou créateur de l'objet"
      }
    },
    BIBL: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Référence(s) de publication(s)"
      }
    },
    CANT: {
      type: String,
      default: "",
      documentation: { description: "", label: "Canton" }
    },
    CATE: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Catégorie technique"
      }
    },
    COM: {
      type: String,
      default: "",
      documentation: {
        description: "Commune. Ne peut pas être vide si WCOM est renseigné.",
        label: "Commune"
      }
    },
    COM2: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Commune masquée"
      }
    },
    PRECISION_JURIDIQUE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Précision juridique"
      }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: {
        description: "Doit contenir une adresse email valide. Affiche un avertissement si vide.",
        label: "Adresse courriel de contact"
      }
    },
    COOR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Coordonnées géographiques d'un point"
      }
    },
    COORM: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Coordonnées géographiques multiples"
      }
    },
    COPY: {
      type: String,
      default: "",
      documentation: {
        description: "Copyright de la notice. Affiche un avertissement si vide.",
        label: "Copyright de la notice "
      }
    },
    DATE: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Année de création"
      }
    },
    DBOR: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Date de rédaction de la notice"
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T69",
        label: "Dénomination de l'objet"
      }
    },
    DENQ: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Date de l'enquête ou du dernier récolement"
      }
    },
    DEPL: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Lieu de déplacement de l'objet"
      }
    },
    DESC: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Description matérielle"
      }
    },
    DIMS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Dimensions normalisées"
      }
    },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Date de la dernière modification de la notice",
        generated: true
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Date de versement de la notice",
        generated: true
      }
    },
    DOMN: {
      type: String,
      default: "",
      documentation: {
        description: "Domaine",
        label: "Domaine",
        deprecated: true
      }
    },
    DOSADRS: {
      type: String,
      default: "",
      documentation: {
        description: "Adresse du dossier Inventaire",
        label: "Adresse du dossier Inventaire"
      }
    },
    DOSS: {
      type: [String],
      default: [],
      documentation: {
        description: "Dénomination du dossier. Affiche un avertissement si vide.",
        label: "Dénomination du dossier"
      }
    },
    POP_DOSSIER_VERT: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "PDF Inventaire (dossier verts)"
      }
    },
    POP_ARRETE_PROTECTION: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Arrêté de protection MH"
      }
    },
    POP_DOSSIER_PROTECTION: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Dossier de protection MH"
      }
    },
    DOSURL: {
      type: String,
      default: "",
      documentation: {
        description: "URL du dossier Inventaire. Doit être une URL valide.",
        label: "URL du dossier Inventaire"
      }
    },
    DOSURLPDF: {
      type: String,
      default: "",
      documentation: {
        description: "Lien vers le dossier PDF. Doit être une URL valide.",
        label: "Précisions sur l'URL du dossier Inventaire"
      }
    },
    DPRO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Date et typologie de la protection"
      }
    },
    DPT: {
      type: String,
      default: "",
      documentation: {
        description: "Département. Doit contenir 2 caractères ou plus et commencer comme DPT.",
        label: "Département"
      }
    },
    DPT_LETTRE: {
      type: String,
      default: "",
      documentation: {
        description: "Département en lettre",
        label: "Département en lettre"
      }
    },
    EDIF: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Nom de l'édifice"
      }
    },
    EDIF2: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Edifice contenant masqué"
      }
    },
    EMPL: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Emplacement de l’œuvre dans l’édifice"
      }
    },
    EMPL2: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Emplacement dans l'édifice masqué"
      }
    },
    ETAT: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "État de conservation (normalisé)"
      }
    },
    ETUD: {
      type: String,
      default: "",
      documentation: {
        description: "Cadre de l'étude. Affiche un avertissement si vide.",
        label: "Cadre de l'étude "
      }
    },
    EXEC: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Lieu de création"
      }
    },
    EXPO: {
      type: String,
      default: "",
      documentation: {
        description: "Référence(s) d'exposition(s)",
        label: "Référence(s) d'exposition(s)"
      }
    },
    HIST: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Description historique"
      }
    },
    IDAGR: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Référence informatique SIMH"
      }
    },
    IMAGE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Emplacement de l'image sur le serveur",
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
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T12",
        label: "Milieu d'implantation pour le domaine Inventaire"
      }
    },
    INSC: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Inscription"
      }
    },
    INSEE: {
      type: String,
      default: "",
      documentation: {
        description:
          "Numéro INSEE de la commune. Doit contenir 5 caractères ou plus et commencer comme DPT.",
        label: "Numéro INSEE de la commune"
      }
    },
    INSEE2: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Code INSEE masqué"
      }
    },
    INTE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T33",
        label: "Intérêt de l'objet"
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
        description: "",
        label: "Référence de la notice cible Palissy pour Mémoire"
      }
    },
    LIENS: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Liens externes éventuels"
      }
    },
    LIEU: {
      type: String,
      default: "",
      documentation: {
        description: "Lieu-dit",
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
        description: "",
        label: "Localisation complète"
      }
    },
    MANQUANT: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Statut juridique de l'objet"
      }
    },
    MATR: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Matériaux et techniques d'interventions"
      }
    },
    MFICH: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Accès microfiche ",
        deprecated: true
      }
    },
    MICR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Numéro de microfiche",
        deprecated: true
      }
    },
    MOSA: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Edition d'une mosaïque d'image",
        deprecated: true
      }
    },
    NART: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Numéro artificiel de différenciation de l'objet"
      }
    },
    NINV: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Numéro d'inventaire affecté à l'objet"
      }
    },
    NOMS: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Nom du rédacteur"
      }
    },
    NUMA: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Numéro de l'arrêté de protection",
        deprecated: true
      }
    },
    NUMP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Cote de la photographie (Mémoire)"
      }
    },
    OBS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Observations"
      }
    },
    ORIG: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Lieu de provenance"
      }
    },
    PAPP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Intitulé de l'ensemble"
      }
    },
    PARN: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Partie constituante non étudiée"
      }
    },
    PART: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Partie constituante"
      }
    },
    PDEN: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Précision sur la typologie de l'objet - hors lexique"
      }
    },
    PDIM: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Précisions sur les dimensions",
        deprecated: true
      }
    },
    PERS: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T6",
        label: "Personnalités liées à l'histoire de l'objet"
      }
    },
    PETA: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Précisions sur l'état de conservation"
      }
    },
    PHOTO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Photographies liées au dossier de protection"
      }
    },
    PINS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Précisions sur l'inscription"
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
        description: "",
        label: "Précision sur la localisation"
      }
    },
    PPRO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Précisions sur la protection"
      }
    },
    PREP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Description littéraire de l'iconographie"
      }
    },
    PROT: {
      type: String,
      default: "",
      documentation: {
        description: "Typologie de la protection. Ne peut pas être vide si DPRO est renseigné.",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T10",
        label: "Typologie de la protection"
      }
    },
    REFA: {
      type: [String],
      index: true,
      default: [],
      documentation: {
        description:
          "REFA contient une ou plusieurs références de notice Mérimée. C'est une référence d'architecture/monument historique qui contient les objets, présents dans la notice palissy associée",
        label: "Référence Mérimée de l'édifice"
      }
    },
    REFE: {
      type: [String],
      default: [],
      documentation: {
        description:
          "Références de l'ensemble. Doit être une référence valide vers une notice Mérimée.",
        label: "Référence des l'ensemble"
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
        description:
          "Références des parties constituantes étudiées. Doit être une référence valide vers une notice Mérimée.",
        label: "Références des parties constituantes étudiées"
      }
    },
    REFJOC: {
      type: [String],
      default: [],
      documentation: {
        description: "Références des notices Joconde liées ",
        label: "Notices Joconde liées"
      }
    },
    REG: {
      type: String,
      default: "",
      documentation: {
        description:
          "Région. Doit être une des valeurs suivantes : " +
          require("../controllers/utils/regions").join(", "),
        label: "Région"
      }
    },
    RENP: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Renvoi vers dossier 'peinture'"
      }
    },
    RENV: {
      type: [String],
      default: [],
      documentation: {
        description:
          "Numéro de renvoi vers un autre domaine. Doit être une référence valide vers une notice Mérimée.",
        label: "Numéro de renvoi vers un autre domaine"
      }
    },
    REPR: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Indexation iconographique normalisée"
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
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T17",
        label: "Siècle de création"
      }
    },
    SCLX: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "",
        deprecated: true
      }
    },
    SOUR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Sources d'archives et bases de données de référence"
      }
    },
    STAD: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Etape de création"
      }
    },
    STAT: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Statut juridique du propriétaire"
      }
    },
    STRU: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Structure et typologie"
      }
    },
    THEM: {
      type: String,
      default: "",
      documentation: { description: "", label: "Thème de l'étude" }
    },
    TICO: {
      type: String,
      default: "",
      documentation: {
        description: "Titre courant. Affiche un avertissement si vide.",
        label: "Titre courant"
      }
    },
    TITR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Titre iconographique"
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
        description: "",
        label: "Url de liaison avec Mémoire"
      }
    },
    VOLS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Informations relatives aux vols"
      }
    },
    WADRS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Adresse pour l'affichage"
      }
    },
    WCOM: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Commune pour l'affichage"
      }
    },
    WEB: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Accès Mémoire"
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
        description: "",
        label: "Typologie de la coordonnée géographique de l'édifice"
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
