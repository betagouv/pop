const mongoose = require("mongoose");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    REF: {
      type: String,
      default: "",
      unique: true,
      index: true,
      trim: true,
      required: true,
      documentation: {
        label: "Identifiant du musée",
        description: "",
        generated: true
      }
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
    ACCES: {
      type: String,
      default: "",
      documentation: { label: "Signalement de la fermeture du musée" }
    },
    ADRL1_M: { type: String, default: "", documentation: { label: "Adresse" } },
    ARTISTE: {
      type: String,
      default: "",
      documentation: { label: "Artistes" }
    },
    ATOUT: { type: String, default: "", documentation: { label: "Atouts majeurs" } },
    CATEG: {
      type: String,
      default: "",
      documentation: {
        label: "Catégorie de musée",
        description: `
            Ecomusée
            Musée de plein air
            Musée de site
            Maison d'artiste
            Musée littéraire
            Musée d'art sacré    `
      }
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
    DOMPAL: {
      type: String,
      default: "",
      documentation: {
        label: "Thématiques principales",
        description: `
        Archéologie
      Art moderne et contemporain
      Arts décoratifs
      Beaux  arts
      Civilisations extra-européennes
      Ethnologie
      Histoire
      Photographie (collections photographiques  non documentaires)
      Sciences de la nature
      Sciences fondamentales
      Technique et industrie
      `
      }
    },
    DPT: { type: String, default: "", documentation: { label: "Département" } },
    DT_MODIF: {
      type: String,
      default: "",
      documentation: { label: "Date de modification" }
    },
    HIST: { type: String, default: "", documentation: { label: "Historique" } },
    INTERET: {
      type: String,
      default: "",
      documentation: { label: "Intérêt architectural" }
    },
    LABEL: { type: String, default: "", documentation: { label: "Label" } },
    LIEU_M: {
      type: String,
      default: "",
      documentation: { label: "Adresse complementaire" }
    },
    MEL: { type: String, default: "", documentation: { label: "Courriel" } },
    NOMANC: {
      type: String,
      default: "",
      documentation: { label: "Ancien nom" }
    },
    NOMOFF: {
      type: String,
      default: "",
      documentation: { label: "Dénomination officielle du musée" }
    },
    NOMUSAGE: {
      type: String,
      default: "",
      documentation: { label: "Nom usuel" }
    },
    PHARE: { type: String, default: "", documentation: { label: "Personnages phares" } },
    "PROT-BAT": {
      type: String,
      default: "",
      documentation: {
        label: "Protection bâtiment",
        description: `
        Classé au titre des Monuments Historiques
        Inscrit à l'Inventaire Supplémentaire des Monuments Historiques
      `
      }
    },
    "PROT-ESP": {
      type: String,
      default: "",
      documentation: {
        label: "Protection espace",
        description: `
      Aux abords d'un monument historique
      Dans un site patrimonial remarquable (ex AVAP, ZPPAUP)
      Dans un site classé
      Dans un site inscrit
      Dans un parc naturel (régional/national)
`
      }
    },
    REGION: { type: String, default: "", documentation: { label: "Région" } },
    TEL_M: { type: String, default: "", documentation: { label: "Téléphone" } },
    THEMES: { type: String, default: "", documentation: { label: "Thèmes" } },
    URL_M: { type: String, default: "", documentation: { label: "Site web" } },
    VILLE_M: { type: String, default: "", documentation: { label: "Ville" } },
    PHOTO: { type: String, default: "", documentation: { label: "Image" } },

    /*deprecated bellow*/

    TOUT: {
      type: String,
      default: "",
      documentation: { label: "Index global", deprecated: true }
    },

    ACTIV: {
      type: String,
      default: "",
      documentation: { label: "Activités culturelles", deprecated: true }
    },
    ADRESSE: {
      type: String,
      default: "",
      documentation: { label: "Adresse complète", deprecated: true }
    },
    AMIS: {
      type: String,
      default: "",
      documentation: { label: "Amis du musée", deprecated: true }
    },
    AN_CREAT: {
      type: String,
      default: "",
      documentation: { label: "Année de création", deprecated: true }
    },
    ANNEE_FE: {
      type: String,
      default: "",
      documentation: { label: "Musée fermé", deprecated: true }
    },
    ANNEXE: { type: String, default: "", documentation: { label: "Annexe", deprecated: true } },
    ANTARIF: {
      type: String,
      default: "",
      documentation: { label: "Année tarifs", deprecated: true }
    },

    CEDEX_AD: {
      type: String,
      default: "",
      documentation: { label: "ADM-Cédex", deprecated: true }
    },

    CTRLTECH: {
      type: String,
      default: "",
      documentation: { label: "Ctrl tech.", deprecated: true }
    },

    DT_CREAT: {
      type: String,
      default: "",
      documentation: { label: "Date de création", deprecated: true }
    },

    DT_SAISI: {
      type: String,
      default: "",
      documentation: { label: "Date d'entrée base", deprecated: true }
    },
    GESTION: {
      type: String,
      default: "",
      documentation: { label: "Gestion musée", deprecated: true }
    },

    ITI2_M: {
      type: String,
      default: "",
      documentation: { label: "Plan Mappy", deprecated: true }
    },
    ITI_M: {
      type: String,
      default: "",
      documentation: { label: "Itinéraire Mappy", deprecated: true }
    },
    JOCONDE: {
      type: String,
      default: "",
      documentation: { label: "Base Joconde", deprecated: true }
    },

    LEGS: { type: String, default: "", documentation: { label: "Legs", deprecated: true } },

    MONOPLUR: {
      type: String,
      default: "",
      documentation: { label: "Disciplines", deprecated: true }
    },
    NB_AMI: {
      type: String,
      default: "",
      documentation: { label: "Nombre amis", deprecated: true }
    },
    NOM_AMI: {
      type: String,
      default: "",
      documentation: { label: "Association", deprecated: true }
    },

    OBS_AMI: {
      type: String,
      default: "",
      documentation: { label: "Ass. Amis Obs.", deprecated: true }
    },
    OBS_TOUR: {
      type: String,
      default: "",
      documentation: { label: "Itinéraire touristique", deprecated: true }
    },

    PROPBAT: {
      type: String,
      default: "",
      documentation: { label: "Propr. bat.", deprecated: true }
    },
    PROPCOLL: {
      type: String,
      default: "",
      documentation: { label: "Propr. coll.", deprecated: true }
    },

    PUBLI: {
      type: String,
      default: "",
      documentation: { label: "Publications", deprecated: true }
    },

    REPCOLL: {
      type: String,
      default: "",
      documentation: { label: "Distr. coll", deprecated: true }
    },
    SERVICES: {
      type: String,
      default: "",
      documentation: { label: "Services", deprecated: true }
    },
    SIGLE_M: {
      type: String,
      default: "",
      documentation: { label: "Sigle musée", deprecated: true }
    },
    STATUT: {
      type: String,
      default: "",
      documentation: { label: "Statut musée", deprecated: true }
    },
    SURFACES: {
      type: String,
      default: "",
      documentation: { label: "Surfaces", deprecated: true }
    },

    URL_M2: { type: String, default: "", documentation: { label: "Site web 2", deprecated: true } },
    VIDEO: { type: String, default: "", documentation: { label: "Image", deprecated: true } },
    RESP: {
      type: String,
      default: "",
      documentation: { label: "Resp. scient.", deprecated: true }
    },
    GRESP: {
      type: String,
      default: "",
      documentation: { label: "Resp. scient. HF", deprecated: true }
    },
    PSC: { type: String, default: "", documentation: { label: "Projet SC", deprecated: true } },
    "DPSC-D": {
      type: String,
      default: "",
      documentation: { label: "date PSC DRAC", deprecated: true }
    },
    "DPSC-S": {
      type: String,
      default: "",
      documentation: { label: "date PSC SMF", deprecated: true }
    },
    DMDF: {
      type: String,
      default: "",
      documentation: { label: "an appel. MDF", deprecated: true }
    },
    SPUB: {
      type: String,
      default: "",
      documentation: { label: "Service publics", deprecated: true }
    },
    "SPUB-P": {
      type: String,
      default: "",
      documentation: { label: "S. publics préc.", deprecated: true }
    },
    INVR: {
      type: String,
      default: "",
      documentation: { label: "Inventaire regl.", deprecated: true }
    },
    NUMER: {
      type: String,
      default: "",
      documentation: { label: "Numérisation", deprecated: true }
    },
    LGN: {
      type: String,
      default: "",
      documentation: { label: "Coll. en ligne", deprecated: true }
    },
    REST: { type: String, default: "", deprecated: true },
    ACQU: { type: String, default: "", deprecated: true },
    RECOL: { type: String, default: "", deprecated: true },
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
