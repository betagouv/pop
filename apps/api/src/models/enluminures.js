const mongoose = require("mongoose");
var mongoosastic = require("../mongoosastic.js");
var mongoosePaginate = require("mongoose-paginate");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
	{
		PRODUCTEUR: {
			type: String,
			default: "Enluminures",
			documentation: {
				description: "Producteur de la donnée : Enluminures",
				generated: true,
				label: "Producteur",
			},
		},
		REF: {
			type: String,
			unique: true,
			index: true,
			trim: true,
			required: true,
			documentation: { label: "Référence" },
		},
		BASE: {
			type: String,
			default: "Enluminures (Enluminures)",
			documentation: {
				description: "Nom de la base : Enluminures (Enluminures)",
				generated: true,
				label: "Nom de la base",
			},
		},
		CONTIENT_IMAGE: {
			type: String,
			default: "",
			documentation: {
				description:
					"Champ généré à chaque sauvegarde de la notice. Si notice contient des images, la valeur du champ sera 'oui', sinon 'non'. Ce champ est utilisé pour l'affichage de la phototèque mais pourrait être supprimé et remplacer par une fonction exist dans ES",
				generated: true,
				label: "Contient une image",
			},
		},
		ATTRIB: {
			type: String,
			default: "",
			documentation: {
				label: "Artiste",
				label_inid: "Artiste",
				label_inicm: "",
			},
		},
		APPL: { type: String, default: "", documentation: { label: "" } },
		AUTR: {
			type: String,
			default: "",
			documentation: {
				label: "Auteur de l'oeuvre",
				label_inid: "",
				label_inicm: "Auteur de l'oeuvre",
			},
		},
		AUTS: {
			type: String,
			default: "",
			documentation: {
				label: "Éditeur de l'oeuvre",
				label_inid: "",
				label_inicm: "Editeur de l'incunable",
			},
		},
		CONSERV: { type: String, default: "", documentation: { label: "" } },
		CONTXT: {
			type: String,
			default: "",
			documentation: {
				label: "Contexte",
				label_inid: "Contexte du décor",
				label_inicm: "",
			},
		},
		COTE: { type: String, default: "", documentation: { label: "" } },
		DATE: {
			type: String,
			default: "",
			documentation: {
				label: "Datation",
				label_inid: "Datation",
				label_inicm: "Datation",
			},
		},
		DATDEB: { type: String, default: "", documentation: { label: "" } },
		DATFIN: { type: String, default: "", documentation: { label: "" } },
		DIMS: {
			type: String,
			default: "",
			documentation: {
				label: "Dimensions du codex",
				label_inid: "Dimensions du codex",
				label_inicm: "Dimensions du codex",
			},
		},
		ETAB: {
			type: String,
			default: "",
			documentation: {
				label: "Établissement de conservation",
				label_inid: "Etablissement de conservation",
				label_inicm: "Etablissement de conservation",
			},
		},
		FOPG: { type: String, default: "", documentation: { label: "" } },
		FOLIOS: {
			type: String,
			default: "",
			documentation: {
				label: "Folios",
				label_inid: "Numéro de feuillet",
				label_inicm: "Foliotation du manuscrit",
			},
		},
		LANGOUV: {
			type: String,
			default: "",
			documentation: {
				label: "",
				label_inid: "",
				label_inicm: "Langue(s)",
			},
		},
		NFICH: { type: String, default: "", documentation: { label: "" } },
		NVUE: { type: String, default: "", documentation: { label: "" } },
		NOMENC: {
			type: [String],
			default: [],
			documentation: {
				label: "Domaine",
				label_inid: "",
				label_inicm: "Thème(s)",
			},
		},
		NOTES: {
			type: String,
			default: "",
			documentation: {
				label: "Notes manuscrit",
				label_inid: "Notes",
				label_inicm: "Notes",
			},
		},
		NOTDEC: {
			type: String,
			default: "",
			documentation: {
				label: "Remarques sur le décors",
				label_inid: "Notes sur l’enluminure",
				label_inicm: "",
			},
		},
		OPHOT: { type: String, default: "", documentation: { label: "" } },
		ORIGG: {
			type: String,
			default: "",
			documentation: {
				label: "Origine géographique",
				label_inid: "",
				label_inicm: "Origine géographique",
			},
		},
		ORIGH: {
			type: String,
			default: "",
			documentation: { label: "Origine historique" },
		},
		ORIGP: { type: String, default: "", documentation: { label: "" } },
		DOMN: { type: String, default: "", documentation: { label: "" } },
		TYPE: {
			type: String,
			default: "",
			documentation: {
				label: "",
				label_inid: "Type codicologique",
				label_inicm: "",
			},
		},
		POSS: {
			type: [String],
			default: [],
			documentation: {
				label: "Possesseur",
				label_inid: "",
				label_inicm: "Ancien(s) possesseur(s)",
			},
		},
		REFD: {
			type: String,
			default: "",
			documentation: {
				label: "Cote",
				label_inid: "Cote",
				label_inicm: "Cote",
			},
		},
		REFIM: { type: String, default: "", documentation: { label: "" } },
		ENRGFP: { type: String, default: "", documentation: { label: "" } },
		ENRGMS: { type: String, default: "", documentation: { label: "" } },
		DROIT: {
			type: String,
			default: "",
			documentation: { label: "Crédits photographiques" },
		},
		COPY: {
			type: String,
			default: "",
			documentation: { label: "Copyright notice" },
		},
		SUJET: {
			type: String,
			default: "",
			documentation: {
				label: "Titre de l'enluminure / Sujet",
				label_inid: "Titre ou sujet de l'enluminure",
				label_inicm: "",
			},
		},
		SUPP: { type: String, default: "", documentation: { label: "" } },
		TITR: {
			type: String,
			default: "",
			documentation: {
				label: "Titre de l'ouvrage",
				label_inid: "Titre de l'oeuvre",
				label_inicm: "Titre de l'oeuvre",
			},
		},
		TYPDEC: {
			type: String,
			default: "",
			documentation: {
				label: "Typologie du décors",
				label_inid: "",
				label_inicm: "Typologie(s) des décors",
			},
		},
		TYPCOD: {
			type: String,
			default: "",
			documentation: {
				label: "Type codicologique",
				label_inid: "",
				label_inicm: "Type codicologique",
			},
		},
		LOCA: { type: String, default: "", documentation: { label: "Ville" } },
		LOCA2: { type: String, default: "", documentation: { label: "" } },
		VISITE: { type: String, default: "", documentation: { label: "" } },
		VIDEO: { type: [String], default: [], documentation: { label: "" } },
		TOUT: { type: String, default: "", documentation: { label: "" } },
		POP_IMPORT: [{ type: mongoose.Schema.ObjectId, ref: "import" }],
		POP_FLAGS: {
			type: [String],
			default: [],
			documentation: {
				description: "Informations et avertissements techniques",
				label: "Alertes POP",
				generated: true,
			},
		},
		RENV: {
			type: [String],
			index: true,
			default: [],
			documentation: {
				description:
					"Numéro de renvoi vers un autre domaine. Doit être une référence valide vers une notice Enluminures.",
				label: "Numéro de renvoi vers un autre domaine",
				label_inid: "Notices liées",
				label_inicm: "Notices liées",
			},
		},
		REFC: {
			type: [String],
			index: true,
			default: [],
			documentation: {
				description:
					"Numéro de renvoi vers une référence du contenu matériel. Doit être une référence valide vers une notice Enluminures.",
				label: "Numéro de renvoi vers une référence du contenu matériel",
			},
		},
		REFDE: {
			type: [String],
			index: true,
			default: [],
			documentation: {
				description:
					"Numéro de renvoi vers une référence du décor. Doit être une référence valide vers une notice Enluminures.",
				label: "Numéro de renvoi vers une référence du décor",
			},
		},
		LIENS: {
			type: [String],
			default: [],
			documentation: {
				description: "",
				label: "Base Initiale",
			},
		},
		POP_COORDONNEES: {
			lat: {
				type: Number,
				default: 0,
			},
			lon: {
				type: Number,
				default: 0,
			},
		},
		POP_CONTIENT_GEOLOCALISATION: {
			type: String,
			enum: ["oui", "non"],
			default: "non",
			documentation: {
				description:
					"Champ qui permet de savoir si la geolocalisation est disponible ou non",
				generated: true,
				label: "Contient une position",
			},
		},
		DMAJ: {
			type: String,
			default: "",
			documentation: {
				description: "Date de mise à jour (format AAAA-MM-JJ)",
				generated: true,
				label: "Date de mise à jour",
			},
		},
		DMIS: {
			type: String,
			default: "",
			documentation: {
				description: "Date de la création (format AAAA-MM-JJ)",
				generated: true,
				label: "Date de création",
			},
		},
		HISTORIQUE: [
			{
				nom: String,
				prenom: String,
				email: String,
				date: String,
				updateMode: String,
			},
		],
	},
	{ collection: "enluminures" },
);

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
	esClient: getElasticInstance(),
	index: "enluminures",
	bulk: { size: 500, delay: 2000 },
});

const object = mongoose.model("enluminures", Schema);

module.exports = object;
