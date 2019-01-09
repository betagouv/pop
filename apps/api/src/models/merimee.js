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
        description: "Référence unique de la notice",
        validation: "Alphanumeric",
        label: "Référence notice"
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
        Autre = Null
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
    MEMOIRE: [{ ref: { type: String, index: true }, url: String }],
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
        description:
          "Champ qui sera utilisé pour traduire les date en format requetable",
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
        description: "Destinations successives et actuelle ",
        label: "Destinations successives et actuelle"
      }
    },
    ADRS: {
      type: String,
      default: "",
      documentation: { description: "Adresse", label: "Adresse" }
    },
    AFFE: {
      type: String,
      default: "",
      documentation: {
        description: "Affectataire",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T97",
        label: "Affectataire"
      }
    },
    AIRE: {
      type: String,
      default: "",
      documentation: {
        description: "Aire d'étude",
        label: "Aire d'étude"
      }
    },
    APPL: {
      type: String,
      default: "",
      documentation: {
        description: "Appellation et titre",
        label: "Appellation et titre"
      }
    },
    APRO: {
      type: [String],
      default: [],
      documentation: {
        description: "Nature de l'acte de protection MH ",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T98",
        label: "Nature de l'acte de protection MH "
      }
    },
    ARCHEO: {
      type: String,
      default: "",
      documentation: {
        description: "Référence dans la base Patriarche",
        label: "Référence dans la base Patriarche"
      }
    },
    AUTP: {
      type: [String],
      default: [],
      documentation: {
        description: "Auteurs phototype",
        label: "Auteurs phototype"
      }
    },
    AUTR: {
      type: [String],
      default: [],
      documentation: {
        description: "Auteurs de l'oeuvre",
        label: "Auteurs de l'oeuvre"
      }
    },
    CADA: {
      type: [String],
      default: [],
      documentation: {
        description: "Référence cadastrale",
        label: "Référence cadastrale"
      }
    },
    CANT: {
      type: String,
      default: "",
      documentation: { description: "Canton", label: "Canton" }
    },
    COLL: {
      type: [String],
      default: [],
      documentation: {
        description: "Décompte des oeuvres recensées",
        label: "Décompte des oeuvres recensées"
      }
    },
    COM: {
      type: String,
      default: "",
      documentation: { description: "Commune", label: "Commune" }
    },
    COOR: {
      type: String,
      default: "",
      documentation: {
        description: "Coordonnées Lambert (ou autres) d'un point",
        label: "Coordonnées Lambert (ou autres) d'un point"
      }
    },
    COORM: {
      type: String,
      default: "",
      documentation: {
        description: "Coordonnées Lambert (ou autres) multiples",
        label: "Coordonnées Lambert (ou autres) multiples"
      }
    },
    COPY: {
      type: [String],
      default: [],
      documentation: {
        description: "CopyRight",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T21",
        label: "CopyRight"
      }
    },
    COUV: {
      type: [String],
      default: [],
      documentation: {
        description: "Type de la couverture",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T26",
        label: "Type de la couverture"
      }
    },
    DATE: {
      type: [String],
      default: [],
      documentation: {
        description: "Date protection",
        label: "Datation en années "
      }
    },
    DBOR: {
      type: String,
      default: "",
      documentation: {
        description: "Date de rédaction de la notice",
        label: "Date de rédaction de la notice"
      }
    },
    DOMN: {
      type: [String],
      default: [],
      documentation: {
        description: "Domaines",
        label: "Domaines"
      }
    },
    DENO: {
      type: [String],
      default: [],
      documentation: {
        description: "Dénomination ",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T96",
        label: "Dénomination"
      }
    },
    DENQ: {
      type: String,
      default: "",
      documentation: {
        description: "Date d'enquête",
        label: "Date d'enquête"
      }
    },
    DEPL: {
      type: String,
      default: "",
      documentation: {
        description: "Partie déplacée",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T14",
        label: "Partie déplacée"
      }
    },
    DESC: {
      type: String,
      default: "",
      documentation: {
        description: "Commentaire description",
        label: "Commentaire description"
      }
    },
    DIMS: {
      type: String,
      default: "",
      documentation: {
        description: "Dimensions",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T11",
        label: "Dimensions"
      }
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
        label: "Date de chargement dans la base ",
        generated: true
      }
    },
    DOSS: {
      type: String,
      default: "",
      documentation: {
        description: "Dossier",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T13",
        label: "Dossier"
      }
    },
    DPRO: {
      type: String,
      default: "",
      documentation: {
        description: "Date protection",
        label: "Date protection"
      }
    },
    DPT: {
      type: String,
      default: "",
      documentation: {
        description: "Département",
        label: "Département"
      }
    },
    EDIF: {
      type: String,
      default: "",
      documentation: {
        description: "Edifice de conservation",
        label: "Edifice de conservation"
      }
    },
    ELEV: {
      type: [String],
      default: [],
      documentation: {
        description: "Parti d’élévation extérieure",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T25",
        label: "Parti d’élévation extérieure"
      }
    },
    ENER: {
      type: [String],
      default: [],
      documentation: {
        description: "Source de l'énergie",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T27",
        label: "Source de l'énergie"
      }
    },
    ESCA: {
      type: [String],
      default: [],
      documentation: {
        description: "Emplacement, forme et structure de l’escalier ",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T29",
        label: "Emplacement, forme et structure de l’escalier"
      }
    },
    ETAG: {
      type: [String],
      default: [],
      documentation: {
        description: "Vaisseau et étage",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T23",
        label: "Vaisseau et étage"
      }
    },
    ETAT: {
      type: [String],
      default: [],
      documentation: {
        description: "Etat de conservation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T30",
        label: "ETAT"
      }
    },
    ETUD: {
      type: [String],
      default: [],
      documentation: {
        description: "Cadre de l'étude",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T68",
        label: "Cadre de l'étude"
      }
    },
    GENR: {
      type: [String],
      default: [],
      documentation: {
        description: "Destinataire",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T197",
        label: "Destinataire"
      }
    },
    HIST: {
      type: String,
      default: "",
      documentation: {
        description: "Commentaire historique",
        label: "Commentaire historique"
      }
    },
    HYDR: {
      type: String,
      default: "",
      documentation: {
        description: "Cours d'eau",
        label: "Cours d'eau"
      }
    },
    IMPL: {
      type: [String],
      default: [],
      documentation: {
        description: "Milieu d'implantation",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T12",
        label: "Milieu d'implantation"
      }
    },
    INSEE: {
      type: String,
      default: "",
      documentation: {
        description: "Numéro INSEE de la commune",
        label: "Numéro INSEE de la commune"
      }
    },
    INTE: {
      type: [String],
      default: [],
      documentation: {
        description: "Intérêt de l'oeuvre",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T33",
        label: "Intérêt de l'oeuvre"
      }
    },
    JATT: {
      type: [String],
      default: [],
      documentation: {
        description: "Justification de l'attribution",
        label: "Justification de l'attribution"
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
        description: "[PAS affiché]",
        label: "",
        deprecated: true
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
    LOCA: {
      type: String,
      default: "",
      documentation: {
        description: "Localisation ",
        label: "Localisation"
      }
    },
    MFICH: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    MOSA: {
      type: String,
      default: "",
      documentation: {
        description: "Mosaïques",
        label: "Mosaïques"
      }
    },
    MHPP: {
      type: String,
      default: "",
      documentation: {
        description: "Eléments protégés MH",
        label: "Eléments protégés MH"
      }
    },
    MICR: {
      type: String,
      default: "",
      documentation: {
        description: "Numéro de microfiche",
        label: "Numéro de microfiche"
      }
    },
    MURS: {
      type: [String],
      default: [],
      documentation: {
        description: "Matériau du gros-oeuvre et mise en oeuvre ",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T57",
        label: "Matériau du gros-oeuvre et mise en oeuvre"
      }
    },
    NBOR: {
      type: String,
      default: "",
      documentation: {
        description: "no Bordereaus",
        label: "no Bordereaus"
      }
    },
    NOMS: {
      type: [String],
      default: [],
      documentation: {
        description: "Noms des rédacteurs de la notice et du dossier",
        label: "Noms des rédacteurs de la notice et du dossier"
      }
    },
    OBS: {
      type: String,
      default: "",
      documentation: {
        description: "Observations",
        label: "Observations"
      }
    },
    PAFF: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur l'affectataire ",
        label: "Précisions sur l'affectataire "
      }
    },
    PART: {
      type: [String],
      default: [],
      documentation: {
        description: "Parties constituantes",
        label: "Parties constituantes"
      }
    },
    PARN: {
      type: [String],
      default: [],
      documentation: {
        description: "Parties non étud",
        label: "Parties non étud"
      }
    },
    PDEN: {
      type: String,
      default: "",
      documentation: {
        description: "Précision sur la dénomination",
        label: "Précision sur la dénomination"
      }
    },
    PERS: {
      type: [String],
      default: [],
      documentation: {
        description: "Personnalitées",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T6",
        label: "Personnalitées"
      }
    },
    PLAN: {
      type: String,
      default: "",
      documentation: {
        description: "Parti de plan",
        label: "Parti de plan"
      }
    },
    PLOC: {
      type: String,
      default: "",
      documentation: {
        description: "Précision sur la localisation",
        label: "Précision sur la localisation"
      }
    },
    PPRO: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur la protection MH",
        label: "Précisions sur la protection MH"
      }
    },
    PREP: {
      type: [String],
      default: [],
      documentation: {
        description: "Précision sur la représentation",
        label: "Précision sur la représentation"
      }
    },
    PROT: {
      type: [String],
      default: [],
      documentation: {
        description: "Nature de la protection MH",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T10",
        label: "Nature de la protection MH"
      }
    },
    PSTA: {
      type: String,
      default: "",
      documentation: {
        description: "Précisions sur le statut de la propriété",
        label: "Précisions sur le statut de la propriété"
      }
    },
    REFE: {
      type: [String],
      default: [],
      documentation: {
        description: "Référence de l'édifice de conservation",
        label: "Référence de l'édifice de conservation"
      }
    },
    REFP: {
      type: [String],
      default: [],
      documentation: {
        description: "Références des parties constituantes étudiées",
        label: "Références des parties constituantes étudiées"
      }
    },
    REFO: {
      type: [String],
      default: [],
      documentation: { description: "REFO", label: "REFO" }
    },
    REG: {
      type: String,
      default: "",
      documentation: { description: "Région", label: "Région" }
    },
    REMA: {
      type: String,
      default: "",
      documentation: {
        description: "Eléments remarquables",
        label: "Eléments remarquables"
      }
    },
    REMP: {
      type: String,
      default: "",
      documentation: { description: "Remploi", label: "Remploi" }
    },
    RENV: {
      type: [String],
      default: [],
      documentation: {
        description: "N° de renvoi au domaine MH ou au domaine INVENTAIRE",
        label: "N° de renvoi au domaine MH ou au domaine INVENTAIRE"
      }
    },
    REPR: {
      type: String,
      default: "",
      documentation: {
        description: "Représentation ",
        label: "Représentation"
      }
    },
    RFPA: {
      type: String,
      default: "",
      documentation: {
        description: "Identifiant Patrimoine",
        label: "Identifiant Patrimoine"
      }
    },
    SCLD: {
      type: [String],
      default: [],
      documentation: {
        description: "Datation des campagnes secondaires de construction",
        label: "Datation des campagnes secondaires de construction"
      }
    },
    SCLE: {
      type: [String],
      default: [],
      documentation: {
        description: "Datation des campagnes principales de construction",
        thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T17",
        label: "Datation des campagnes principales de construction"
      }
    },
    SCLX: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    SITE: {
      type: String,
      default: "",
      documentation: {
        description: "Site, secteur ou zone de protection",
        label: "Site, secteur ou zone de protection "
      }
    },
    STAT: {
      type: String,
      default: "",
      documentation: {
        description: "Statut de la propriété",
        label: "Statut de la propriété"
      }
    },
    TECH: {
      type: [String],
      default: [],
      documentation: {
        description: "Technique du décor des immeubles par nature ",
        label: "Technique du décor des immeubles par nature"
      }
    },
    TICO: {
      type: String,
      default: "",
      documentation: {
        description: "Titre courant",
        label: "Titre courant"
      }
    },
    TOIT: {
      type: [String],
      default: [],
      documentation: {
        description: "Matériau de la couverture ",
        label: "Matériau de la couverture"
      }
    },
    TYPO: {
      type: String,
      default: "",
      documentation: {
        description: "Typologie ",
        label: "Typologie"
      }
    },
    VERT: {
      type: String,
      default: "",
      documentation: {
        description: "Couvert et découvert de jardin ",
        label: "Couvert et découvert de jardin"
      }
    },
    REFIM: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    IMG: {
      type: [String],
      default: [],
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    VIDEO: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    DOSURL: {
      type: String,
      default: "",
      documentation: {
        description: "Dossier URL",
        label: "Dossier URL"
      }
    },
    DOSURLPDF: {
      type: String,
      default: "",
      documentation: {
        description: "Dossier PDF. Le champ est maintenant fermé. Il n'est plus éditable, seulement disponible en lecture",
        label: "Dossier PDF"
      }
    },
    DOSADRS: {
      type: String,
      default: "",
      documentation: {
        description: "Dossier adresse",
        label: "Dossier adresse"
      }
    },
    LIENS: {
      type: [String],
      default: [],
      documentation: {
        description: "Liens Divers",
        label: "Liens Divers"
      }
    },
    IMAGE: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    VISI: {
      type: [String],
      default: [],
      documentation: {
        description: "Ouverture au public",
        label: "Ouverture au public"
      }
    },
    VOCA: {
      type: String,
      default: "",
      documentation: {
        description: "Vocable ",
        label: "Vocable"
      }
    },
    VOUT: {
      type: [String],
      default: [],
      documentation: {
        description: "Type et nature du couvrement ",
        label: "Type et nature du couvrement"
      }
    },
    WEB: {
      type: String,
      default: "",
      documentation: {
        description: "Visite guidé",
        label: "Visite guidé"
      }
    },
    ZONE: {
      type: String,
      default: "",
      documentation: {
        description: "Zone Lambert ou autres",
        label: "Zone Lambert ou autres"
      }
    },
    THEM: {
      type: String,
      default: "",
      documentation: { description: "Thème ", label: "Thème" }
    },
    ACMH: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    ACURL: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    WADRS: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    WCOM: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    WRENV: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    REFM: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    CONTACT: {
      type: String,
      default: "",
      documentation: {
        description: "Contact ",
        generated: true,
        validation: "Email",
        label: "Contact"
      }
    },
    IDAGR: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
        deprecated: true
      }
    },
    LMDP: {
      type: String,
      default: "",
      documentation: {
        description: "[PAS affiché]",
        label: "",
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
        description: "Date du label",
        label: "Date du label"
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
