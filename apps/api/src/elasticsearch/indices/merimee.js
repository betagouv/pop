const { ovh } = require("../../config.js");

const settings = {
	analysis: {
		filter: {
			french_elision: {
				type: "elision",
				articles_case: true,
				articles: [
					"l",
					"m",
					"t",
					"qu",
					"n",
					"s",
					"j",
					"d",
					"c",
					"jusqu",
					"quoiqu",
					"lorsqu",
					"puisqu",
				],
			},
			french_stemmer: {
				type: "stemmer",
				language: "light_french",
			},
		},
		char_filter: {
			replace_and: {
				type: "mapping",
				mappings: ["&=> and"],
			},
		},
		analyzer: {
			french_fuzzy: {
				tokenizer: "icu_tokenizer",
				filter: ["french_elision", "icu_folding", "french_stemmer"],
				char_filter: ["replace_and"],
			},
			french_strict: {
				tokenizer: "icu_tokenizer",
				filter: ["french_elision", "icu_folding"],
			},
		},
		normalizer: {
			sort_normalizer: {
				type: "custom",
				filter: ["trim", "lowercase", "asciifolding"],
			},
		},
	},
};

const mappings = {
	properties: {
		ACMH: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		ACTU: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		ACURL: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		ADRS: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		AFFE: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		AIRE: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		APPL: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		APRO: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		ARCHEO: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		AUTP: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		AUTR: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		BASE: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		CADA: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		CANT: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		COM: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		CONTACT: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		CONTIENT_IMAGE: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		COOR: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		COORM: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		COPY: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DATE: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DBOR: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DENO: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DENQ: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DEPL: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DESC: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 8000,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DIMS: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DLAB: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DMAJ: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DMIS: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DOMN: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DOSADRS: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DOSS: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DOSURL: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DOSURLPDF: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DPRO: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		DPT: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		EDIF: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		ENER: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		ETAT: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		ETUD: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		GENR: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		HIST: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		HYDR: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		IDAGR: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		IMAGE: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		IMG: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		INSEE: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		INTE: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		LINHA: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		LREG: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		LBASE2: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		LIENS: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		LIEU: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		LMDP: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		LOCA: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		MEMOIRE: {
			properties: {
				ref: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 256,
						},
					},
				},
				url: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 256,
						},
					},
				},
			},
		},
		MFICH: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		MHPP: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		MICR: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		MOSA: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		NBOR: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		OBS: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		PAFF: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		PDEN: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		PERS: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		PINT: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		PLAN: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		PLOC: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		POP_CONTIENT_GEOLOCALISATION: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		POP_COORDONNEES: {
			type: "geo_point",
		},
		POP_DATE: {
			type: "long",
		},
		PPRO: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 8000,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		PRODUCTEUR: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		PROT: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		PSTA: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		REF: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		REFIM: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		REFM: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		REFO: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		REFJOC: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		REFMUS: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		REG: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		REMA: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		REMP: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		RENV: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		REPR: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		RFPA: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		SCLE: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		SCLX: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		SITE: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		STAT: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		TECH: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		THEM: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		TICO: {
			type: "text",
			analyzer: "french_fuzzy",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 512,
				},
				strict: {
					type: "text",
					analyzer: "french_strict",
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		TOUT: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		TYPO: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		VERT: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		VIDEO: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		VISI: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		VOCA: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		WADRS: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		WCOM: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		WEB: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		WRENV: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		ZONE: {
			type: "text",
			fields: {
				keyword: {
					type: "keyword",
					ignore_above: 256,
				},
				sort: {
					type: "keyword",
					normalizer: "sort_normalizer",
					ignore_above: 256,
				},
			},
		},
		HISTORIQUE: {
			properties: {
				_id: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 256,
						},
						sort: {
							type: "keyword",
							normalizer: "sort_normalizer",
							ignore_above: 256,
						},
					},
				},
				nom: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 256,
						},
						sort: {
							type: "keyword",
							normalizer: "sort_normalizer",
							ignore_above: 256,
						},
					},
				},
				prenom: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 256,
						},
						sort: {
							type: "keyword",
							normalizer: "sort_normalizer",
							ignore_above: 256,
						},
					},
				},
				email: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 256,
						},
						sort: {
							type: "keyword",
							normalizer: "sort_normalizer",
							ignore_above: 256,
						},
					},
				},
				date: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 256,
						},
						sort: {
							type: "keyword",
							normalizer: "sort_normalizer",
							ignore_above: 256,
						},
					},
				},
				updateMode: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 256,
						},
						sort: {
							type: "keyword",
							normalizer: "sort_normalizer",
							ignore_above: 256,
						},
					},
				},
			},
		},
	},
};

module.exports = {
	settings,
	mappings: ovh ? mappings : { merimee: mappings },
};
