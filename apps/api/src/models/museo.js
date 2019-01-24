const mongoose = require("mongoose");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    REF: { type: String, default: "", documentation: { label: "Référence" } },
    TOUT: {
      type: String,
      default: "",
      documentation: { label: "Index global" }
    },
    POP_COMMENTAIRES: {
      type: [String],
      default: [],
      documentation: {
        description: "Commentaires technique",
        label: "Commentaires POP",
        generated: true
      }
    },
    ACCES: { type: String, default: "", documentation: { label: "Accès" } },
    ACTIV: {
      type: String,
      default: "",
      documentation: { label: "Activités culturelles" }
    },
    ADRESSE: {
      type: String,
      default: "",
      documentation: { label: "Adresse complète" }
    },
    ADRL1_M: { type: String, default: "", documentation: { label: "Adresse" } },
    AMIS: {
      type: String,
      default: "",
      documentation: { label: "Amis du musée" }
    },
    AN_CREAT: {
      type: String,
      default: "",
      documentation: { label: "Année de création" }
    },
    ANNEE_FE: {
      type: String,
      default: "",
      documentation: { label: "Musée fermé" }
    },
    ANNEXE: { type: String, default: "", documentation: { label: "Annexe" } },
    ANTARIF: {
      type: String,
      default: "",
      documentation: { label: "Année tarifs" }
    },
    ARTISTE: {
      type: String,
      default: "",
      documentation: { label: "Artistes" }
    },
    ATOUT: { type: String, default: "", documentation: { label: "Atouts majeurs" } },
    CEDEX_AD: {
      type: String,
      default: "",
      documentation: { label: "ADM-Cédex" }
    },
    COPY: {
      type: String,
      default: "",
      documentation: { label: "Copyright photo" }
    },
    CP_M: {
      type: String,
      default: "",
      documentation: { label: "Code postal" }
    },
    CTRLTECH: {
      type: String,
      default: "",
      documentation: { label: "Ctrl tech." }
    },
    DOMPAL: {
      type: String,
      default: "",
      documentation: { label: "Thématiques principales" }
    },
    DPT: { type: String, default: "", documentation: { label: "Département" } },
    DT_CREAT: {
      type: String,
      default: "",
      documentation: { label: "Date de création" }
    },
    DT_MODIF: {
      type: String,
      default: "",
      documentation: { label: "Date de modification" }
    },
    DT_SAISI: {
      type: String,
      default: "",
      documentation: { label: "Date d'entrée base" }
    },
    GESTION: {
      type: String,
      default: "",
      documentation: { label: "Gestion musée" }
    },
    HIST: { type: String, default: "", documentation: { label: "Historique" } },
    INTERET: {
      type: String,
      default: "",
      documentation: { label: "Intérêt arch" }
    },
    ITI2_M: {
      type: String,
      default: "",
      documentation: { label: "Plan Mappy" }
    },
    ITI_M: {
      type: String,
      default: "",
      documentation: { label: "Itinéraire Mappy" }
    },
    JOCONDE: { type: String, default: "", documentation: { label: "Base Joconde" } },
    LABEL: { type: String, default: "", documentation: { label: "Label" } },
    LEGS: { type: String, default: "", documentation: { label: "Legs" } },
    LIEU_M: {
      type: String,
      default: "",
      documentation: { label: "Adresse compl." }
    },
    MEL: { type: String, default: "", documentation: { label: "Mél" } },
    MONOPLUR: {
      type: String,
      default: "",
      documentation: { label: "Disciplines" }
    },
    NB_AMI: {
      type: String,
      default: "",
      documentation: { label: "Nombre amis" }
    },
    NOM_AMI: {
      type: String,
      default: "",
      documentation: { label: "Association" }
    },
    NOMANC: {
      type: String,
      default: "",
      documentation: { label: "Ancien nom" }
    },
    NOMOFF: {
      type: String,
      default: "",
      documentation: { label: "Nom officiel" }
    },
    NOMUSAGE: {
      type: String,
      default: "",
      documentation: { label: "Nom du musée" }
    },
    OBS_AMI: {
      type: String,
      default: "",
      documentation: { label: "Ass. Amis Obs." }
    },
    OBS_TOUR: {
      type: String,
      default: "",
      documentation: { label: "Itinéraire touristique" }
    },
    PHARE: { type: String, default: "", documentation: { label: "Phare" } },
    PROPBAT: {
      type: String,
      default: "",
      documentation: { label: "Propr. bat." }
    },
    PROPCOLL: {
      type: String,
      default: "",
      documentation: { label: "Propr. coll." }
    },
    "PROT-BAT": {
      type: String,
      default: "",
      documentation: { label: "Protect bat." }
    },
    "PROT-ESP": {
      type: String,
      default: "",
      documentation: { label: "Protect esp." }
    },
    PUBLI: {
      type: String,
      default: "",
      documentation: { label: "Publications" }
    },
    REGION: { type: String, default: "", documentation: { label: "Région" } },
    REPCOLL: {
      type: String,
      default: "",
      documentation: { label: "Distr. coll" }
    },
    SERVICES: {
      type: String,
      default: "",
      documentation: { label: "Services" }
    },
    SIGLE_M: {
      type: String,
      default: "",
      documentation: { label: "Sigle musée" }
    },
    STATUT: {
      type: String,
      default: "",
      documentation: { label: "Statut musée" }
    },
    SURFACES: {
      type: String,
      default: "",
      documentation: { label: "Surfaces" }
    },
    TEL_M: { type: String, default: "", documentation: { label: "Téléphone" } },
    THEMES: { type: String, default: "", documentation: { label: "Thèmes" } },
    URL_M2: { type: String, default: "", documentation: { label: "Site web 2" } },
    URL_M: { type: String, default: "", documentation: { label: "Site web" } },
    VIDEO: { type: String, default: "", documentation: { label: "Image" } },
    VILLE_M: { type: String, default: "", documentation: { label: "Ville" } },
    RESP: {
      type: String,
      default: "",
      documentation: { label: "Resp. scient." }
    },
    GRESP: {
      type: String,
      default: "",
      documentation: { label: "Resp. scient. HF" }
    },
    PSC: { type: String, default: "", documentation: { label: "Projet SC" } },
    "DPSC-D": {
      type: String,
      default: "",
      documentation: { label: "date PSC DRAC" }
    },
    "DPSC-S": {
      type: String,
      default: "",
      documentation: { label: "date PSC SMF" }
    },
    DMDF: {
      type: String,
      default: "",
      documentation: { label: "an appel. MDF" }
    },
    SPUB: {
      type: String,
      default: "",
      documentation: { label: "Service publics" }
    },
    "SPUB-P": {
      type: String,
      default: "",
      documentation: { label: "S. publics préc." }
    },
    INVR: {
      type: String,
      default: "",
      documentation: { label: "Inventaire regl." }
    },
    NUMER: {
      type: String,
      default: "",
      documentation: { label: "Numérisation" }
    },
    LGN: {
      type: String,
      default: "",
      documentation: { label: "Coll. en ligne" }
    },
    REST: { type: String, default: "" },
    ACQU: { type: String, default: "" },
    RECOL: { type: String, default: "" },
    location: {
      lat: { type: Number, default: 0 },
      lon: { type: Number, default: 0 }
    }
  },
  { collection: "museo" }
);

Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "museo",
  bulk: { size: 500, delay: 2000 }
});

const object = mongoose.model("museo", Schema);

module.exports = object;
