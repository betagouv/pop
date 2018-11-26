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
      documentation: {
        description: "Référence unique de la notice",
        master: false
      }
    },
    PRODUCTEUR: {
      type: String,
      default: "",
      documentation: { description: "", master: false }
    },
    BASE: {
      type: String,
      default: "Patrimoine architectural (Mérimée)",
      documentation: {
        description: "Nom de la base : Patrimoine architectural (Mérimée)",
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
    MEMOIRE: [{ ref: String, url: String }],
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
          "Champ généré à chaque sauvegarde de la notice. Si notice contient des une géolocalisation, la valeur du champs sera 'oui', sinon 'non'",
        master: true
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
        description:
          "Champ qui sera utilisé pour traduire les date en format requetable",
        master: true
      }
    },
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    TOUT: {
      type: String,
      default: "",
      documentation: {
        description:
          "Champs qui devait contenir tous les champs dans mistral. Aujourd'hui est vide [DEPRECIE ?]",
        master: false
      }
    },
    ACTU: {
      type: String,
      default: "",
      documentation: {
        description: "Destinations successives et actuelle ",
        master: false
      }
    },
    ADRS: {
      type: String,
      default: "",
      documentation: { description: "Adresse", master: false }
    },
    AFFE: {
      type: String,
      default: "",
      documentation: { description: "Affectataire", master: false }
    },
    AIRE: {
      type: String,
      default: "",
      documentation: { description: "Aire d'étude", master: false }
    },
    APPL: {
      type: String,
      default: "",
      documentation: { description: "Appellation et titre", master: false }
    },
    APRO: {
      type: [String],
      default: [],
      documentation: { description: "", master: false }
    },
    ARCHEO: {
      type: String,
      default: "",
      documentation: {
        description: "Référence dans la base Patriarche",
        master: false
      }
    },
    AUTP: {
      type: [String],
      default: [],
      documentation: { description: "Auteurs phototype", master: false }
    },
    AUTR: {
      type: [String],
      default: [],
      documentation: { description: "Auteurs de l'oeuvre", master: false }
    },
    CADA: {
      type: [String],
      default: [],
      documentation: { description: "Référence cadastrale", master: false }
    },
    CANT: {
      type: String,
      default: "",
      documentation: { description: "Canton", master: false }
    },
    COLL: {
      type: [String],
      default: [],
      documentation: {
        description: "Décompte des oeuvres recensées",
        master: false
      }
    },
    COM: {
      type: String,
      default: "",
      documentation: { description: "Commune", master: false }
    },
    COOR: {
      type: String,
      default: "",
      documentation: {
        description: "Coordonnées Lambert (ou autres) d'un points",
        master: false
      }
    },
    COORM: {
      type: String,
      default: "",
      documentation: {
        description: "Coordonnées Lambert (ou autres) multiples",
        master: false
      }
    },
    COPY: {
      type: [String],
      default: [],
      documentation: { description: "CopyRight", master: false }
    },
    COUV: {
      type: [String],
      default: [],
      documentation: { description: "Type de la couverture", master: false }
    },
    DATE: {
      type: [String],
      default: [],
      documentation: { description: "Date protection", master: false }
    },
    DBOR: {
      type: String,
      default: "",
      documentation: {
        description: "Date de rédaction de la notice",
        master: false
      }
    },
    DOMN: {
      type: [String],
      default: [],
      documentation: { description: "Domaines", master: false }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: { description: "Dénomination ", master: false }
    },
    DENQ: {
      type: String,
      default: "",
      documentation: { description: "Date d'enquête", master: false }
    },
    DEPL: {
      type: String,
      default: "",
      documentation: { description: "Partie déplacée", master: false }
    },
    DESC: {
      type: String,
      default: "",
      documentation: { description: "Commentaire description", master: false }
    },
    DIMS: {
      type: String,
      default: "",
      documentation: { description: "Dimensions", master: false }
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
    DOSS: {
      type: String,
      default: "",
      documentation: { description: "Dossier", master: false }
    },
    DPRO: {
      type: String,
      default: "",
      documentation: { description: "Date protection", master: false }
    },
    DPT: {
      type: String,
      default: "",
      documentation: { description: "Département", master: false }
    },
    EDIF: {
      type: String,
      default: "",
      documentation: { description: "Edifice de conservation", master: false }
    },
    ELEV: {
      type: [String],
      default: [],
      documentation: {
        description: "Parti d’élévation extérieure",
        master: false
      }
    },
    ENER: {
      type: [String],
      default: [],
      documentation: { description: "Source de l'énergie", master: false }
    },
    ESCA: {
      type: [String],
      default: [],
      documentation: {
        description: "Emplacement, forme et structure de l’escalier ",
        master: false
      }
    },
    ETAG: {
      type: [String],
      default: [],
      documentation: { description: "Vaisseau et étage", master: false }
    },
    ETAT: {
      type: String,
      default: "",
      documentation: { description: "Etat de conservation", master: false }
    },
    ETUD: {
      type: String,
      default: "",
      documentation: { description: "Parties non étud", master: false }
    },
    GENR: {
      type: String,
      default: "",
      documentation: { description: "Destinataire", master: false }
    },
    HIST: {
      type: String,
      default: "",
      documentation: { description: "Commentaire historique", master: false }
    },
    HYDR: {
      type: String,
      default: "",
      documentation: { description: "Cours d'eau", master: false }
    },
    IMPL: {
      type: [String],
      default: [],
      documentation: { description: "Milieu d'implantation", master: false }
    },
    INSEE: {
      type: String,
      default: "",
      documentation: {
        description: "Numéro INSEE de la commune",
        master: false
      }
    },
    INTE: {
      type: [String],
      default: [],
      documentation: { description: "Intérêt de l'oeuvre", master: false }
    },
    JATT: {
      type: [String],
      default: [],
      documentation: {
        description: "Justification de l'attribution",
        master: false
      }
    },
    JDAT: {
      type: [String],
      default: [],
      documentation: {
        description: "Justification de la datation",
        master: false
      }
    },
    LBASE2: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    LIEU: {
      type: String,
      default: "",
      documentation: { description: "Lieu-dit", master: false }
    },
    LOCA: {
      type: String,
      default: "",
      documentation: { description: "Localisation ", master: false }
    },
    MFICH: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    MOSA: {
      type: String,
      default: "",
      documentation: { description: "Mosaïques", master: false }
    },
    MHPP: {
      type: String,
      default: "",
      documentation: { description: "Eléments protégés MH", master: false }
    },
    MICR: {
      type: String,
      default: "",
      documentation: { description: "Numéro de microfiche", master: false }
    },
    MURS: {
      type: [String],
      default: [],
      documentation: {
        description: "Matériau du gros-oeuvre et mise en oeuvre ",
        master: false
      }
    },
    NBOR: {
      type: String,
      default: "",
      documentation: { description: "no Bordereaus", master: false }
    },
    NOMS: {
      type: [String],
      default: [],
      documentation: {
        description: "Noms des rédacteurs de la notice et du dossier",
        master: false
      }
    },
    OBS: {
      type: String,
      default: "",
      documentation: { description: "Observations", master: false }
    },
    PAFF: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur l'affectataire ",
        master: false
      }
    },
    PART: {
      type: [String],
      default: [],
      documentation: { description: "Parties constituantes", master: false }
    },
    PARN: {
      type: [String],
      default: [],
      documentation: { description: "Parties non étud", master: false }
    },
    PDEN: {
      type: String,
      default: "",
      documentation: {
        description: "Précision sur la dénomination",
        master: false
      }
    },
    PERS: {
      type: [String],
      default: [],
      documentation: { description: "Personnalitées", master: false }
    },
    PLAN: {
      type: String,
      default: "",
      documentation: { description: "Parti de plan", master: false }
    },
    PLOC: {
      type: String,
      default: "",
      documentation: {
        description: "Précision sur la localisation",
        master: false
      }
    },
    PPRO: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur la protection MH",
        master: false
      }
    },
    PREP: {
      type: [String],
      default: [],
      documentation: {
        description: "Précision sur la représentation",
        master: false
      }
    },
    PROT: {
      type: [String],
      default: [],
      documentation: {
        description: "Nature de la protection MH",
        master: false
      }
    },
    PSTA: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur le statut de la propriété",
        master: false
      }
    },
    REFE: {
      type: [String],
      default: [],
      documentation: {
        description: "Référence de l'édifice de conservation",
        master: false
      }
    },
    REFP: {
      type: [String],
      default: [],
      documentation: {
        description: "Références des parties constituantes étudiées",
        master: false
      }
    },
    REFO: {
      type: [String],
      default: [],
      documentation: { description: "REFO", master: false }
    },
    REG: {
      type: String,
      default: "",
      documentation: { description: "Region", master: false }
    },
    REMA: {
      type: String,
      default: "",
      documentation: { description: "Eléments remarquables", master: false }
    },
    REMP: {
      type: String,
      default: "",
      documentation: { description: "Remploi", master: false }
    },
    RENV: {
      type: [String],
      default: [],
      documentation: {
        description: "N° de renvoi au domaine MH ou au domaine INVENTAIRE",
        master: false
      }
    },
    REPR: {
      type: String,
      default: "",
      documentation: { description: "Représentation ", master: false }
    },
    RFPA: {
      type: String,
      default: "",
      documentation: { description: "Identifiant Patrimoine", master: false }
    },
    SCLD: {
      type: [String],
      default: [],
      documentation: {
        description: "Datation des campagnes secondaires de construction",
        master: false
      }
    },
    SCLE: {
      type: [String],
      default: [],
      documentation: {
        description: "Datation des campagnes principales de construction",
        master: false
      }
    },
    SCLX: {
      type: [String],
      default: [],
      documentation: { description: "[PAS affiché]", master: false }
    },
    SITE: {
      type: String,
      default: "",
      documentation: {
        description: "Site, secteur ou zone de protection",
        master: false
      }
    },
    STAT: {
      type: String,
      default: "",
      documentation: { description: "Statut de la propriété", master: false }
    },
    TECH: {
      type: [String],
      default: [],
      documentation: {
        description: "Technique du décor des immeubles par nature ",
        master: false
      }
    },
    TICO: {
      type: String,
      default: "",
      documentation: { description: "Titre courant", master: false }
    },
    TOIT: {
      type: [String],
      default: [],
      documentation: {
        description: "Matériau de la couverture ",
        master: false
      }
    },
    TYPO: {
      type: String,
      default: "",
      documentation: { description: "Typologie ", master: false }
    },
    VERT: {
      type: String,
      default: "",
      documentation: {
        description: "Couvert et découvert de jardin ",
        master: false
      }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    IMG: {
      type: [String],
      default: [],
      documentation: { description: "[PAS affiché]", master: false }
    },
    VIDEO: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    DOSURL: {
      type: String,
      default: "",
      documentation: {
        description: "Dossier URL",
        master: false
      }
    },
    DOSURLPDF: {
      type: String,
      default: "",
      documentation: { description: "Dossier PDF", master: true }
    },
    DOSADRS: {
      type: String,
      default: "",
      documentation: { description: "Dossier adresse", master: false }
    },
    LIENS: {
      type: [String],
      default: [],
      documentation: { description: "Liens Divers", master: false }
    },
    IMAGE: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    VISI: {
      type: [String],
      default: [],
      documentation: { description: "Ouverture au public", master: false }
    },
    VOCA: {
      type: String,
      default: "",
      documentation: { description: "Vocable ", master: false }
    },
    VOUT: {
      type: [String],
      default: [],
      documentation: {
        description: "Type et nature du couvrement ",
        master: false
      }
    },
    WEB: {
      type: String,
      default: "",
      documentation: { description: "Visite guidé", master: false }
    },
    ZONE: {
      type: String,
      default: "",
      documentation: { description: "Zone Lambert ou autres", master: false }
    },
    THEM: {
      type: String,
      default: "",
      documentation: { description: "Thème ", master: false }
    },
    ACMH: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    ACURL: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    WADRS: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    WCOM: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    WRENV: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    REFM: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: { description: "Contact ", master: true }
    },
    IDAGR: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    LMDP: {
      type: String,
      default: "",
      documentation: { description: "[PAS affiché]", master: false }
    },
    PINT: {
      type: String,
      default: "",
      documentation: { description: "intérêt oeuvre", master: false }
    },
    DLAB: {
      type: String,
      default: "",
      documentation: { description: "Date du label", master: false }
    }
  },
  { collection: "merimee" }
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "merimee"
});

Schema.pre("save", function(next, done) {
  switch (this.REF.substring(0, 2)) {
    case "IA":
      this.DISCIPLINE = this.PRODUCTEUR = "Inventaire";
      break;
    case "PA":
      this.DISCIPLINE = this.PRODUCTEUR = "Monuments Historiques";
      break;
    case "EA":
      this.DISCIPLINE = this.PRODUCTEUR = "Architecture";
      break;
    default:
      this.DISCIPLINE = this.PRODUCTEUR = "Null";
      break;
  }

  this.CONTIENT_IMAGE = this.IMG ? "oui" : "non";
  next();
});

const object = mongoose.model("merimee", Schema);

module.exports = object;
