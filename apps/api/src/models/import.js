const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImportSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    documentation: {
      description: "Identifiant de l'utilisateur à l'origine de l'import",
      master: true
    }
  },
  importedAt: {
    type: Date,
    default: Date.now(),
    documentation: {
      description: "Date de l'import ",
      master: true
    }
  },
  institution: {
    type: String,
    documentation: {
      description: "Institution à l'origine de l'import",
      master: true
    }
  },
  created: {
    type: Number,
    documentation: {
      description: "Nombre de notices créées lors de l'import",
      master: true
    }
  },
  updated: {
    type: Number,
    documentation: {
      description: "Nombre de notices mises à jour lors de l'import",
      master: true
    }
  },
  rejected: {
    type: Number,
    documentation: {
      description: "Nombre de notices rejetées lors de l'import",
      master: true
    }
  },
  unChanged: {
    type: Number,
    documentation: {
      description: "Nombre de notices non mises à jour lors de l'import",
      master: true
    }
  }
});

module.exports = mongoose.model("Import", ImportSchema);
