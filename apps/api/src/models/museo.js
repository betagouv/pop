const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    REF: { type: String, default: "", documentation: { label: "Référence" } },
    TOUT: { type: String, default: "" },
    ACCES: { type: String, default: "", documentation: { label: "Accès" } },
    ACTIV: {
      type: String,
      default: "",
      documentation: { label: "Activités culturelles" }
    },
    ADRESSE: { type: String, default: "", documentation: { label: "Adresse" } },
    ADRL1_M: { type: String, default: "" },
    AMIS: {
      type: String,
      default: "",
      documentation: { label: "Amis et soutiens" }
    },
    AN_CREAT: {
      type: String,
      default: "",
      documentation: { label: "Année de création" }
    },
    ANNEE_FE: { type: String, default: "" },
    ANNEXE: { type: String, default: "" },
    ANTARIF: { type: String, default: "" },
    ARTISTE: {
      type: String,
      default: "",
      documentation: { label: "Artistes" }
    },
    ATOUT: {
      type: String,
      default: "",
      documentation: { label: "Atouts majeurs" }
    },
    CEDEX_AD: { type: String, default: "" },
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
    CTRLTECH: { type: String, default: "" },
    DOMPAL: {
      type: String,
      default: "",
      documentation: { label: "Thématiques principales" }
    },
    DPT: { type: String, default: "", documentation: { label: "Département" } },
    DT_CREAT: { type: String, default: "" },
    DT_MODIF: { type: String, default: "" },
    DT_SAISI: { type: String, default: "" },
    GESTION: { type: String, default: "" },
    HIST: {
      type: String,
      default: "",
      documentation: { label: "Historique des collections" }
    },
    INTERET: {
      type: String,
      default: "",
      documentation: { label: "Intérêt architectural" }
    },
    ITI2_M: { type: String, default: "" },
    ITI_M: { type: String, default: "" },
    JOCONDE: {
      type: String,
      default: "",
      documentation: { label: "Base Joconde" }
    },
    LABEL: { type: String, default: "", documentation: { label: "Label" } },
    LEGS: { type: String, default: "" },
    LIEU_M: { type: String, default: "" },
    MEL: { type: String, default: "", documentation: { label: "Email" } },
    MONOPLUR: { type: String, default: "" },
    NB_AMI: { type: String, default: "" },
    NOM_AMI: { type: String, default: "" },
    NOMANC: {
      type: String,
      default: "",
      documentation: { label: "Nom ancien" }
    },
    NOMOFF: {
      type: String,
      default: "",
      documentation: { label: "Nom officiel" }
    },
    NOMUSAGE: {
      type: String,
      default: "",
      documentation: { label: "Nom d'usage" }
    },
    OBS_AMI: { type: String, default: "" },
    OBS_TOUR: {
      type: String,
      default: "",
      documentation: { label: "Itinéraire touristique" }
    },
    PHARE: {
      type: String,
      default: "",
      documentation: { label: "Personnages" }
    },
    PROPBAT: { type: String, default: "" },
    PROPCOLL: { type: String, default: "" },
    "PROT-BAT": {
      type: String,
      default: "",
      documentation: { label: "Protection Protection bâtiment" }
    },
    "PROT-ESP": {
      type: String,
      default: "",
      documentation: { label: "Protection espace" }
    },
    PUBLI: { type: String, default: "" },
    REGION: { type: String, default: "", documentation: { label: "Région" } },
    REPCOLL: { type: String, default: "" },
    SERVICES: {
      type: String,
      default: "",
      documentation: { label: "Services" }
    },
    SIGLE_M: { type: String, default: "" },
    STATUT: { type: String, default: "", documentation: { label: "Statut" } },
    SURFACES: { type: String, default: "" },
    TEL_M: { type: String, default: "", documentation: { label: "Téléphone" } },
    THEMES: {
      type: String,
      default: "",
      documentation: { label: "Thèmes des collections" }
    },
    URL_M2: { type: String, default: "" },
    URL_M: { type: String, default: "", documentation: { label: "Site web" } },
    VIDEO: { type: String, default: "" },
    VILLE_M: { type: String, default: "", documentation: { label: "Ville" } },
    RESP: { type: String, default: "" },
    GRESP: { type: String, default: "" },
    PSC: { type: String, default: "" },
    DPSC: { type: String, default: "" },
    DPSC: { type: String, default: "" },
    DMDF: { type: String, default: "" },
    SPUB: { type: String, default: "" },
    SPUB: { type: String, default: "" },
    INVR: { type: String, default: "" },
    NUMER: { type: String, default: "" },
    LGN: { type: String, default: "" },
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

const object = mongoose.model("museo", Schema);

module.exports = object;
