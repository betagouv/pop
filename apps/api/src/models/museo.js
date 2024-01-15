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
        description: "N° de référence dans la base Muséofile"
      }
    },
    PRODUCTEUR: {
      type: String,
      default: "MUSEE",
      documentation: {
        description: "Producteur de la donnée : MUSEE",
        generated: true,
        label: "Producteur"
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
    POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
    BASE: {
      type: String,
      default: "Répertoire des Musées de France (Muséofile)",
      documentation: {
        description: "Nom de la base : Répertoire des Musées de France (Muséofile)",
        generated: true,
        label: "Nom de la base"
      }
    },
    ACCES: {
      type: String,
      default: "",
      documentation: {
        label: "Musée ouvert (Oui/Non)",
        description: `Indiquer "Non" en cas de fermeture au public.`
      }
    },
    ADRL1_M: {
      type: String,
      default: "",
      documentation: { label: "Adresse", description: "Adresse (n°, voie)" }
    },
    ARTISTE: {
      type: String,
      default: "",
      documentation: { label: "Artistes phares", description: "Artistes de la collection" }
    },
    ATOUT: {
      type: String,
      default: "",
      documentation: {
        label: "Atouts majeurs",
        description: "Principaux atouts des collections (3500 caractères maximum)"
      }
    },
    CATEG: {
      type: String,
      default: "",
      documentation: {
        label: "Catégorie de musée",
        description: `
        Catégorie particulière de musée :

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
      documentation: { label: "Copyright photo", description: "Copyright de la photo du musée" }
    },
    CP_M: {
      type: String,
      default: "",
      documentation: { label: "Code postal", description: "Code postal" }
    },
    DOMPAL: {
      type: [String],
      default: "",
      documentation: {
        label: "Thématiques principales",
        description: `

        Principaux domaines thématiques couverts par les collections

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
    DPT: {
      type: String,
      default: "",
      documentation: { label: "Département", description: "Département en toutes lettres" }
    },
    DT_MODIF: {
      type: String,
      default: "",
      documentation: { label: "Date de modification" }
    },
    HIST: {
      type: String,
      default: "",
      documentation: {
        label: "Historique",
        description: "Historique des collections du musée (7000 caractères maximum)"
      }
    },
    INTERET: {
      type: String,
      default: "",
      documentation: {
        label: "Intérêt architectural",
        description: "Caractéristique architecturale du bâtiment (3500 caractères maximum)"
      }
    },
    LABEL: {
      type: String,
      default: "",
      documentation: {
        label: "Appellation musée de France",
        description: "Musée de France, au sens de la loi n°2002-5 du 4 janvier 2002"
      }
    },
    LIEU_M: {
      type: String,
      default: "",
      documentation: {
        label: "Adresse complementaire",
        description: "Précision(s) sur le lieu"
      }
    },
    AUTNOM: {
      type: String,
      default: "",
      documentation: {
        label: "Autres noms",
        description: "Autres noms"
      }
    },
    NOMOFF: {
      type: String,
      default: "",
      documentation: {
        label: "Dénomination officielle du musée",
        description: "Dénomination officielle du musée selon l’arrêté publié au JO"
      }
    },
    NOMUSAGE: {
      type: String,
      default: "",
      documentation: {
        label: "Nom usuel",
        description: "Nom d'usage du musée"
      }
    },
    PHARE: {
      type: String,
      default: "",
      documentation: {
        label: "Personnages phares",
        description: "Personnages phares de la collection (3500 caractères maximum)"
      }
    },
    "PROT-BAT": {
      type: String,
      default: "",
      documentation: {
        label: "Protection bâtiment",
        description: `
        Type de protection bâtiment :

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
        Type de protection espace : 


      Aux abords d'un monument historique
      Dans un site patrimonial remarquable (ex AVAP, ZPPAUP)
      Dans un site classé
      Dans un site inscrit
      Dans un parc naturel (régional/national)
`
      }
    },
    REFMEM: {
      type: [String],
      index: true,
      default: [],
      documentation: {
        description: "Références des notices Mémoire liées à la notice Muséofile",
        label: "Références Mémoire liées"
      }
    },
    REFMER: {
      type: [String],
      index: true,
      default: [],
      documentation: {
        description: "Références des notices Mérimée liées à la notice Muséofile",
        label: "Références Mérimée liées"
      }
    },
    REFPAL: {
      type: [String],
      index: true,
      default: [],
      documentation: {
        description: "Références des notices Palissy liées à la notice Muséofile",
        label: "Références Palissy liées"
      }
    },
    REGION: {
      type: String,
      default: "",
      documentation: { label: "Région", description: "Région en toutes lettres" }
    },
    TEL_M: {
      type: String,
      default: "",
      documentation: { label: "Téléphone", description: "Téléphone principal du musée" }
    },
    CONTACT_GENERIQUE: {
      type: String,
      default: "",
      documentation: {
        label: "Contact générique du musée",
        description: "Adresse courriel générique du musée"
      }
    },
    CONTACT_MUSEO: {
      type: String,
      default: "",
      documentation: {
        label: "Contact coordinateur museo",
        description:
          "Adresse courriel de la personne qui coordonne la collecte d'informations dans le musée"
      }
    },
    THEMES: {
      type: [String],
      default: [],
      documentation: {
        label: "Thèmes des collections (détail)",
        description: "Domaines thématiques de la collection"
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
    URL_M: {
      type: String,
      default: "",
      documentation: {
        label: "Site web",
        description: "Adresse du site ou de la page du site internet du musée"
      }
    },
    VILLE_M: {
      type: String,
      default: "",
      documentation: { label: "Ville", description: "Nom de la commune, agglomération…" }
    },
    PHOTO: { type: String, default: "", documentation: { label: "Image" } },

    /*deprecated bellow*/

    TOUT: {
      type: String,
      default: "",
      documentation: { label: "Index global" }
    },

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
    AMIS: {
      type: String,
      default: "",
      documentation: { label: "Amis du musée", }
    },
    AN_CREAT: {
      type: String,
      default: "",
      documentation: { label: "Année de création du musée", description: "Format AAAA" }
    },
    ANNEE_FE: {
      type: String,
      default: "",
      documentation: { label: "Musée fermé", }
    },
    ANNEXE: { type: String, default: "", documentation: { label: "Annexe", } },
    ANTARIF: {
      type: String,
      default: "",
      documentation: { label: "Année tarifs", }
    },

    CEDEX_AD: {
      type: String,
      default: "",
      documentation: { label: "ADM-Cédex", }
    },

    CTRLTECH: {
      type: String,
      default: "",
      documentation: { label: "Ctrl tech.", }
    },

    DT_CREAT: {
      type: String,
      default: "",
      documentation: { label: "Date de création", }
    },

    DT_SAISI: {
      type: String,
      default: "",
      documentation: { label: "Date de création", description: "Date de création de la notice" }
    },
    GESTION: {
      type: String,
      default: "",
      documentation: { label: "Gestion musée", }
    },

    ITI2_M: {
      type: String,
      default: "",
      documentation: { label: "Plan Mappy", }
    },
    ITI_M: {
      type: String,
      default: "",
      documentation: { label: "Itinéraire Mappy", }
    },
    JOCONDE: {
      type: String,
      default: "",
      documentation: { label: "Base Joconde", }
    },

    LEGS: { type: String, default: "", documentation: { label: "Legs", } },

    MONOPLUR: {
      type: String,
      default: "",
      documentation: { label: "Disciplines", }
    },
    NB_AMI: {
      type: String,
      default: "",
      documentation: { label: "Nombre amis", }
    },
    NOM_AMI: {
      type: String,
      default: "",
      documentation: { label: "Association", }
    },
    DMAJ: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la dernière mise à jour",
        label: "Date de la dernière mise à jour",
        generated: true
      }
    },
    DMIS: {
      type: String,
      default: "",
      documentation: {
        description: "Date de la création POP/Mistral",
        label: "Date de la création POP/Mistral",
        generated: true
      }
    },
    OBS_AMI: {
      type: String,
      default: "",
      documentation: { label: "Ass. Amis Obs.", }
    },
    OBS_TOUR: {
      type: String,
      default: "",
      documentation: { label: "Itinéraire touristique", }
    },

    PROPBAT: {
      type: String,
      default: "",
      documentation: { label: "Propr. bat.", }
    },
    PROPCOLL: {
      type: String,
      default: "",
      documentation: { label: "Propr. coll.", }
    },

    PUBLI: {
      type: String,
      default: "",
      documentation: { label: "Publications", }
    },

    REPCOLL: {
      type: String,
      default: "",
      documentation: { label: "Distr. coll", }
    },
    SERVICES: {
      type: String,
      default: "",
      documentation: { label: "Services", }
    },
    SIGLE_M: {
      type: String,
      default: "",
      documentation: { label: "Sigle musée", }
    },
    STATUT: {
      type: String,
      default: "",
      documentation: { label: "Statut musée", }
    },
    SURFACES: {
      type: String,
      default: "",
      documentation: { label: "Surfaces", }
    },

    URL_M2: { type: String, default: "", documentation: { label: "Site web 2", } },
    VIDEO: { type: String, default: "", documentation: { label: "Image", } },
    RESP: {
      type: String,
      default: "",
      documentation: { label: "Resp. scient.", }
    },
    GRESP: {
      type: String,
      default: "",
      documentation: { label: "Resp. scient. HF", }
    },
    PSC: { type: String, default: "", documentation: { label: "Projet SC", } },
    "DPSC-D": {
      type: String,
      default: "",
      documentation: { label: "date PSC DRAC", }
    },
    "DPSC-S": {
      type: String,
      default: "",
      documentation: { label: "date PSC SMF", }
    },
    DMDF: {
      type: String,
      default: "",
      documentation: { label: "an appel. MDF", }
    },
    SPUB: {
      type: String,
      default: "",
      documentation: { label: "Service publics", }
    },
    "SPUB-P": {
      type: String,
      default: "",
      documentation: { label: "S. publics préc.", }
    },
    INVR: {
      type: String,
      default: "",
      documentation: { label: "Inventaire regl.", }
    },
    NUMER: {
      type: String,
      default: "",
      documentation: { label: "Numérisation", }
    },
    LGN: {
      type: String,
      default: "",
      documentation: { label: "Coll. en ligne", }
    },
    REST: { type: String, default: "", },
    ACQU: { type: String, default: "", },
    RECOL: { type: String, default: "", },
    POP_COORDONNEES: {
      lat: { type: Number, default: 0 },
      lon: { type: Number, default: 0 }
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
  { collection: "museo" }
);

Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "museo",
  bulk: { size: 500, delay: 2000 }
});

const object = mongoose.model("museo", Schema);

module.exports = object;
