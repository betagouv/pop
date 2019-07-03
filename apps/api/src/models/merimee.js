var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    REF: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      documentation: {
        description: "",
        validation: "Alphanumeric",
        label: "Référence de la notice"
      }
    },
    PRODUCTEUR: {
      type: String,
      default: "",
      documentation: {
        description: `
        Producteur de la donnée défini selon l'algorithme suivant : 
        IA = Inventaire
        PA = Monuments Historiques
        EA = Architecture
        Autre = Autre
        `,
        label: "PRODUCTEUR",
        generated: true
      }
    },
    BASE: {
      type: String,
      default: "Patrimoine architectural (Mérimée)",
      documentation: {
        description: "Nom de la base : Patrimoine architectural (Mérimée)",
        generated: true,
        label: "Nom de la base"
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
    MEMOIRE: [{ ref: { type: String, index: true }, url: String, name: String, copy: String }],
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
    POP_FLAGS: {
      type: [String],
      default: [],
      documentation: {
        description: "Informations et avertissements techniques",
        label: "Alertes POP",
        generated: true
      }
    },
    POP_CONTIENT_GEOLOCALISATION: {
      type: String,
      enum: ["oui", "non"],
      default: "non",
      documentation: {
        description:
          "Champ généré à chaque sauvegarde de la notice. Si notice contient des une géolocalisation, la valeur du champs sera 'oui', sinon 'non'",
        generated: true
      }
    },
    POP_COORDINATES_POLYGON: {
      type: { type: String, enum: ["Polygon"], default: "Polygon" },
      coordinates: [[{ type: [Number] }]]
    },
    POP_DATE: {
      type: [Number],
      default: [],
      documentation: {
        description: "Champ qui sera utilisé pour traduire les date en format requetable",
        generated: true
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description:
          "Champs qui devait contenir tous les champs dans mistral. Aujourd'hui est vide [DEPRECIE ?]"
      }
    },
    ACTU: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Destination actuelle de l'édifice"
      }
    },
    ADRS: {
      type: String,
      default: "",
      documentation: { description: "", label: "Adresse de l'édifice" }
    },
    AFFE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T97",
        label: "Affectataire de l'édifice"
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
    APRO: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T98",
        label: "Nature de l'acte de protection"
      }
    },
    ARCHEO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Référence dans la base Patriarche",
        deprecated: true
      }
    },
    AUTP: {
      type: [String],
      default: [],
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
        label: "Auteur de l'édifice"
      }
    },
    CADA: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Références cadastrales"
      }
    },
    CANT: {
      type: String,
      default: "",
      documentation: { description: "", label: "Canton" }
    },
    COLL: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Nombre d'édifices concernés par l'étude"
      }
    },
    COM: {
      type: String,
      default: "",
      documentation: { description: "", label: "Commune normalisée" }
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
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T21",
        label: "Copyright de la notice"
      }
    },
    COUV: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T26",
        label: "Typologie de couverture"
      }
    },
    DATE: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Année(s) de(s) campagne(s) de construction"
      }
    },
    DBOR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Date de rédaction de la notice"
      }
    },
    DOMN: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Domaine",
        deprecated: true
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T96",
        label: "Dénomination de l'édifice"
      }
    },
    DENQ: {
      type: String,
      default: "",
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
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T14",
        label: "Lieu de conservation d'un élément architectural déplacé"
      }
    },
    DESC: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Commentaire descriptif de l'édifice"
      }
    },
    DIMS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T11",
        label: "Dimensions normalisées des édicules uniquement"
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
    DOSS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T13",
        label: "Typologie du dossier"
      }
    },
    DPRO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Date et niveau de protection de l'édifice"
      }
    },
    DPT: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Département"
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
    ELEV: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T25",
        label: "Partie d'élévation extérieure"
      }
    },
    ENER: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T27",
        label: "Source de l'énergie utilisée par l'édifice"
      }
    },
    ESCA: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T29",
        label: "Emplacement, forme et structure de l'escalier"
      }
    },
    ETAG: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T23",
        label: "Description de l'élévation intérieure"
      }
    },
    ETAT: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T30",
        label: "État de conservation (normalisé)"
      }
    },
    ETUD: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T68",
        label: "Cadre de l'étude"
      }
    },
    GENR: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T197",
        label: "Genre du destinataire"
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
    HYDR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Nom du cours d'eau traversant ou bordant l'édifice"
      }
    },
    IMPL: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T12",
        label: "Milieu d'implantation pour le domaine Inventaire"
      }
    },
    INSEE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Numéro INSEE de la commune"
      }
    },
    INTE: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T33",
        label: "Intérêt de l'édifice"
      }
    },
    JATT: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Commentaires concernant l'attribution de l'édifice"
      }
    },
    JDAT: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Commentaires concernant la datation"
      }
    },
    LBASE2: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Référence de la notice cible Mérimée pour Mémoire",
        deprecated: true
      }
    },
    LIEU: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Lieu-dit"
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
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Manquant"
      }
    },
    MFICH: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Accès microfiche",
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
    MHPP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Précisions sur les éléments protégés"
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
    MURS: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T57",
        label: "Matériaux du gros-œuvre"
      }
    },
    NBOR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "",
        deprecated: true
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
    OBS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Observations concernant la protection de l'édifice"
      }
    },
    PAFF: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Précisions concernant l'affectataire de l'édifice"
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
    PARN: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Partie constituante non étudiée"
      }
    },
    PDEN: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Précision sur la dénomination de l'édifice - hors lexique"
      }
    },
    PERS: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T6",
        label: "Personnalités liées à l'histoire de l'édifice"
      }
    },
    PLAN: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Typologie de plan"
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
        label: "Précision sur la protection de l'édifice"
      }
    },
    PREP: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Description littéraire de l'iconographie"
      }
    },
    PROT: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T10",
        label: "Nature de la protection de l'édifice"
      }
    },
    PSTA: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Précisions sur le statut juridique du propriétaire"
      }
    },
    REFE: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Référence de l'édifice de conservation"
      }
    },
    REFP: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Références des parties constituantes étudiées"
      }
    },
    REFO: {
      type: [String],
      default: [],
      documentation: {
        description:
          "REFO contient une ou plusieurs références de notice Palissy. C'est une référence d'objet contenu dans le monument historique, dans la notice mérimée associée",
        label: "Référence aux objets conservés",
        generated: true
      }
    },
    REG: {
      type: String,
      default: "",
      documentation: { description: "", label: "Région" }
    },
    REMA: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Eléments remarquables dans l'édifice"
      }
    },
    REMP: {
      type: String,
      default: "",
      documentation: { description: "", label: "Remploi" }
    },
    RENV: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Numéro de renvoi vers un autre domaine"
      }
    },
    REPR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Indexation iconographique normalisée"
      }
    },
    RFPA: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Identifiant de la base TrouveTout"
      }
    },
    SCLD: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Siècle de campagne secondaire de consctruction"
      }
    },
    SCLE: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T17",
        label: "Siècle de la campagne principale de construction"
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
    SITE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Typologie de la zone de protection"
      }
    },
    STAT: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Statut juridique du propriétaire"
      }
    },
    TECH: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Technique du décor porté de l'édifice"
      }
    },
    TICO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Titre courant"
      }
    },
    TOIT: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Matériaux de la couverture "
      }
    },
    TYPO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Commentaires d'usage régional"
      }
    },
    VERT: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Couverts ou découverts du jardin de l'édifice"
      }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "",
        deprecated: true
      }
    },
    IMG: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Autre forme de l'emplacement de l'image sur le serveur",
        deprecated: true
      }
    },
    VIDEO: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Url de liaison avec Mémoire",
        deprecated: true
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
      default: "",
      documentation: {
        description: "",
        label: "Arrêté de protection MH"
      }
    },
    POP_DOSSIER_PROTECTION: {
      type: [String],
      default: "",
      documentation: {
        description: "",
        label: "Dossier de protection MH"
      }
    },
    DOSURL: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "URL du dossier Inventaire",
        validation: "url"
      }
    },
    DOSURLPDF: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Lien vers le dossier PDF",
        validation: "url"
      }
    },
    DOSADRS: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Adresse du dossier Inventaire"
      }
    },
    LIENS: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Liens externes éventuels",
        validation: "url"
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
    VISI: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Conditions d'ouverture au public"
      }
    },
    VOCA: {
      type: String,
      default: "",
      documentation: {
        description: " ",
        label: "Vocable - pour les édifices cultuels"
      }
    },
    VOUT: {
      type: [String],
      default: [],
      documentation: {
        description: "",
        label: "Typologie du couvrement"
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
    ZONE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Typologie de la coordonnée géographique de l'édifice"
      }
    },
    THEM: {
      type: String,
      default: "",
      documentation: { description: " ", label: "Thème de l'étude", deprecated: true }
    },
    ACMH: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "",
        deprecated: true
      }
    },
    ACURL: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "",
        deprecated: true
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
    WRENV: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Autre forme du renvoi (éditorial)",
        deprecated: true
      }
    },
    REFM: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "",
        deprecated: true
      }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: {
        description: " ",
        validation: "Email",
        label: "Adresse courriel de contact"
      }
    },
    IDAGR: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Référence informatique SIMH"
      }
    },
    LMDP: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Référence vers la base Médiathèque",
        deprecated: true
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
    DLAB: {
      type: String,
      default: "",
      documentation: {
        description: "",
        label: "Date de label"
      }
    }
  },
  { collection: "merimee" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "merimee"
});

const object = mongoose.model("merimee", Schema);

module.exports = object;
