const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const Schema = new mongoose.Schema(
  {
    TOKEN: {
        type: String,
        default: "",
        documentation: {
          description: "",
          label: "UID Token"
        }
    },
    DEXP: {
        type: String,
        default: "",
        documentation: {
          description: "",
          label: "la date d'expiration du token"
        }
    },
    CURSOR: {
        type: Number,
        default: "",
        documentation: {
          description: "",
          label: "numéro de la page a afficher"
        }
    },
    FROM: {
        type: String,
        default: "",
        documentation: {
          description: "Date de mise à jour (format AAAA-MM-JJ)",
          generated: true,
          label: "date pour les notices a retourner",
          opendata: true
        }
      },
    UNTIL: {
        type: String,
        default: "",
        documentation: {
          description: "Date de mise à jour (format AAAA-MM-JJ)",
          generated: true,
          label: "date pour les notices a retourner",
          opendata: true
        }
    },
    SET: {
        type: String,
        default: "",
        documentation: {
          description: "Nom de la base : Joconde, Palissy, Mnr ...",
          generated: true,
          label: "Nom de la base"
        }
    },
    META: {
        type: String,
        default: "",
        documentation: {
          description: "",
          generated: true,
          label: "metadataprefix"
        }
    },
    SIZE: {
      type: String,
      default: "",
      documentation: {
        description: "",
        generated: true,
        label: "complete list size"
      }
  }
  },
  { collection: "resumptionTokenOAI" }
)

Schema.plugin(mongoosePaginate)
Schema.method("toJSON", function() {
    var resumptionTokenOAI = this.toObject();
    return resumptionTokenOAI;
  });

module.exports = mongoose.model("resumptionTokenOAI", Schema)