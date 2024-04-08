const { ovh } = require("../../config.js");

if (ovh) {
	module.exports = {
		settings: {
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
						mappings: ["& => and"],
					},
				},
				analyzer: {
					french_fuzzy: {
						tokenizer: "icu_tokenizer",
						filter: [
							"french_elision",
							"icu_folding",
							"french_stemmer",
						],
						char_filter: ["replace_and"],
					},
					french_strict: {
						tokenizer: "icu_tokenizer",
						filter: ["french_elision", "icu_folding"],
					},
				},
			},
		},
		mappings: {
			properties: {
				ADPT: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				APPL: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				APTN: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				ATTR: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
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
					},
				},
				BASE: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				BIBL: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
							ignore_above: 8000,
						},
					},
				},
				COMM: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				CONTACT: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				CONTIENT_IMAGE: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				COOR: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				COPY: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				DACQ: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				DATA: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				DATION: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				DDPT: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				DECV: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
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
					},
				},
				DEPO: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
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
					},
				},
				DESY: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				DIFFU: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				DIMS: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				DMAJ: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				DMIS: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
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
					},
				},
				DREP: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				ECOL: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				EPOQ: {
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
					},
				},
				ETAT: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				EXPO: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				GENE: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				GEOHI: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
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
					},
				},
				IMAGE: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				IMG: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				INSC: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				INV: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				LABEL: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				LABO: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				LARC: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				LIEUX: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
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
					},
				},
				LOCA2: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				LOCA3: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				LVID: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				MILL: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				MILU: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				MOSA: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				MSGCOM: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				MUSEO: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				NSDA: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				ONOM: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PAUT: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PDAT: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PDEC: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PEOC: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PERI: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PERU: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PHOT: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PINS: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PLIEUX: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PREP: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PRODUCTEUR: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				PUTI: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				RANG: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				REDA: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				REF: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				REFIM: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				REFMEM: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				REFPAL: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				REFMER: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				REFMIS: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
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
					},
				},
				RETIF: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				SREP: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				STAT: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				TECH: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				TICO: {
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
					},
				},
				TITR: {
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
					},
				},
				TOUT: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				UTIL: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				VIDEO: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
						},
					},
				},
				WWW: {
					type: "text",
					fields: {
						keyword: {
							type: "keyword",
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
					},
				},
				POP_COORDONNEES: {
					type: "geo_point",
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
							},
						},
						nom: {
							type: "text",
							fields: {
								keyword: {
									type: "keyword",
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
							},
						},
						email: {
							type: "text",
							fields: {
								keyword: {
									type: "keyword",
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
							},
						},
						updateMode: {
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
			},
		},
	};
} else {
	module.exports = {
		settings: {
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
						mappings: ["& => and"],
					},
				},
				analyzer: {
					french_fuzzy: {
						tokenizer: "icu_tokenizer",
						filter: [
							"french_elision",
							"icu_folding",
							"french_stemmer",
						],
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
		},
		mappings: {
			joconde: {
				properties: {
					ADPT: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					APPL: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					APTN: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					ATTR: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
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
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
								ignore_above: 256,
							},
							strict: {
								type: "text",
								analyzer: "french_strict",
							},
						},
					},
					BASE: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					BIBL: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
								ignore_above: 8000,
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
								ignore_above: 8000,
							},
						},
					},
					COMM: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					CONTACT: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					CONTIENT_IMAGE: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					COOR: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					COPY: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					DACQ: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					DATA: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					DATION: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					DDPT: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					DECV: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
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
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
								ignore_above: 256,
							},
							strict: {
								type: "text",
								analyzer: "french_strict",
							},
						},
					},
					DEPO: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
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
								ignore_above: 8000,
							},
						},
					},
					DESY: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					DIFFU: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					DIMS: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					DMAJ: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					DMIS: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
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
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
								ignore_above: 256,
							},
							strict: {
								type: "text",
								analyzer: "french_strict",
							},
						},
					},
					DREP: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					ECOL: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					EPOQ: {
						type: "text",
						analyzer: "french_fuzzy",
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
							strict: {
								type: "text",
								analyzer: "french_strict",
							},
						},
					},
					ETAT: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					EXPO: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					GENE: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					GEOHI: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
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
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
								ignore_above: 256,
							},
							strict: {
								type: "text",
								analyzer: "french_strict",
							},
						},
					},
					IMAGE: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					IMG: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					INSC: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					INV: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					LABEL: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					LABO: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					LARC: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					LIEUX: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
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
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
								ignore_above: 256,
							},
							strict: {
								type: "text",
								analyzer: "french_strict",
							},
						},
					},
					LOCA2: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					LOCA3: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					LVID: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					MILL: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					MILU: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					MOSA: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					MSGCOM: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					MUSEO: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					NSDA: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					ONOM: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PAUT: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PDAT: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PDEC: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PEOC: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PERI: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PERU: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PHOT: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PINS: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PLIEUX: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PREP: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PRODUCTEUR: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					PUTI: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					RANG: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					REDA: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					REF: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					REFIM: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					REFMEM: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					REFPAL: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					REFMER: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					REFMIS: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
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
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
								ignore_above: 256,
							},
							strict: {
								type: "text",
								analyzer: "french_strict",
							},
						},
					},
					RETIF: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					SREP: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					STAT: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					TECH: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					TICO: {
						type: "text",
						analyzer: "french_fuzzy",
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
							strict: {
								type: "text",
								analyzer: "french_strict",
							},
						},
					},
					TITR: {
						type: "text",
						analyzer: "french_fuzzy",
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
							strict: {
								type: "text",
								analyzer: "french_strict",
							},
						},
					},
					TOUT: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					UTIL: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					VIDEO: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
							},
						},
					},
					WWW: {
						type: "text",
						fields: {
							keyword: {
								type: "keyword",
							},
							sort: {
								type: "keyword",
								normalizer: "sort_normalizer",
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
			},
		},
	};
}
