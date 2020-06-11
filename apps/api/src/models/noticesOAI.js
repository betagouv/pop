const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const Schema = new mongoose.Schema(
  {
    REF: {
        type: String,
        unique: true,
        index: true,
        trim: true,
        required: true,
        documentation: {
          description: "Référence (numéro système de la notice). Doit contenir exactement 11 caractères.",
          label: "Référence",
          opendata: true
        }
      },    
    BASE: {
        type: String,
        default: "",
        required: true,
        documentation: {
          description: "Nom de la base : Joconde, Palissy, Mnr ...",
          generated: true,
          label: "Nom de la base"
        }
    },
    DMAJ: {
        type: String,
        default: "",
        required: true,
        documentation: {
          description: "Date de mise à jour (format AAAA-MM-JJ)",
          generated: true,
          label: "Date de mise à jour",
          opendata: true
        }
    }
  },
  { collection: "noticesOAI" }
)

Schema.plugin(mongoosePaginate)
Schema.method("toJSON", function() {
    var resumptionTokenOAI = this.toObject();
    return resumptionTokenOAI;
  });

module.exports = mongoose.model("noticesOAI", Schema)