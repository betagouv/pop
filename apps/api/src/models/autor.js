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
      documentation: { label: "Référence de la notice" }
    },
    ISNI: { type: String, default: "", documentation: { label: "Référence ISNI à consulter" } },
    ISNI_VERIFIEE: {
      type: String,
      default: "non",
      documentation: { label: "Référence ISNI confirmée" }
    },
    ALIAS: { type: [String], default: [], documentation: { label: "Autre forme du nom" } },
    BIBLIO: { type: String, default: "", documentation: { label: "Bibliographie" } },
    BIO: { type: String, default: "", documentation: { label: "Biographie" } },
    CONTACT: { type: String, default: "", documentation: { label: "Contact" } },
    COPY: { type: String, default: "", documentation: { label: "Copyright de la notice" } },
    DMORT: { type: String, default: "", documentation: { label: "Date de décès" } },
    DNAISS: { type: String, default: "", documentation: { label: "Date de naissance" } },
    EXPO: { type: String, default: "", documentation: { label: "Expositions" } },
    FONC: { type: [String], default: [], documentation: { label: "Profession (Ex. : Maître-verrier, Orfèvre, Architecte en chef des MH)" } },
    VIDEO: { type: String, default: "", documentation: { label: "VIDEO" } },
    LIENS: { type: String, default: "", documentation: { label: "Liens externes" } },
    LMDP: { type: String, default: "", documentation: { label: "Liens vers Médiathek" } },
    LMORT: { type: String, default: "", documentation: { label: "Lieux de décès" } },
    LNAISS: { type: String, default: "", documentation: { label: "Lieu de naissance" } },
    LOCA: { type: String, default: "", documentation: { label: "Localisation" } },
    NATIO: { type: String, default: "", documentation: { label: "Nationnalités" } },
    NOM: { type: String, default: "", documentation: { label: "Nom" } },
    PREN: { type: String, default: "", documentation: { label: "Prénom" } },
    PNOM: { type: String, default: "", documentation: { label: "Précision sur le nom" } },
    TYPAPE: { type: String, default: "", documentation: { label: "Type d'appellation" } },
    REJET: { type: [String], default: [], documentation: { label: "Forme rejetée" } },
    OEUVR: { type: String, default: "", documentation: { label: "Oeuvre réalisée" } },
    PUBLI: { type: String, default: "", documentation: { label: "Publications" } },
    ALAMAP: { type: [String], default: [], documentation: { label: "Fonds en référence à la MAP" } },
    PRODUCTEUR: { type: String, default: "", documentation: { label: "Producteur" } },
    REDAC: { type: String, default: "", documentation: { label: "Nom du rédacteur" } },
    LRELA: { type: String, default: "", documentation: { label: "Personnes associées" } },
    SOCSAV: { type: [String], default: [], documentation: { label: "SOCSAV ?" } },
    SOURCES: { type: String, default: "", documentation: { label: "Sources" } },
    TITR: { type: [String], default: [], documentation: { label: "Titres" } },
    TYPID: { type: [String], default: [], documentation: { label: "Personne physique ou morale" } },
    ARK: { type: String, default: "", documentation: { label: "Liens ARK" } },
    OBS: { type: String, default: "", documentation: { label: "Observations" } },
    BASE: { type: String, default: "", documentation: { label: "Nom de la base" } },
    INI: { type: String, default: "", documentation: { label: "Initiales" } },
    ADRS: { type: String, default: "", documentation: { label: "Adresse" } },
    SCLE: { type: [String],  default: [], documentation: { thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T17", label: "Siècle d'activité" } },
    DATES: { type: [String], default: [], documentation: { label: "Dates d'activité" } },
    FORM: { type: String, default: "", documentation: { label: "Formateur" } },
    SYMB: { type: String, default: "", documentation: { label: "Symbole" } },
    INS: { type: String, default: "", documentation: { label: "Date d'insculpation" } },
    GAR: { type: String, default: "", documentation: { label: "Numéro du registre de la garantie" } },
    PREF: { type: String, default: "", documentation: { label: "Numéro du registre de la préfecture" } },
    BIF: { type: String, default: "", documentation: { label: "Date de biffage" } },
    LOCACT: { type: String, default: "", documentation: { label: "Lieu d'activités" } },
    LBASE: { type: String, default: "", documentation: { label: "Liens autres bases" } },
    MEMOIRE: [{ ref: { type: String, index: true }, url: String, name: String, copy: String }],




    DMAJ: {
      type: String,
      default: "",
      documentation: {
        label: "Date de dernière modification",
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
    DMIS: {
      type: String,
      default: "",
      documentation: {
        label: "Date de création de la notice",
        generated: true
      }
    }
  },
  { collection: "autor" }
);

Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "autor",
  bulk: { size: 500, delay: 2000 }
});

const object = mongoose.model("autor", Schema);

module.exports = object;
