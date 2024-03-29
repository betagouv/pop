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
              "puisqu"
            ]
          },
          french_stemmer: {
            type: "stemmer",
            language: "light_french"
          }
        },
        char_filter:{
          replace_and:{
            type: "mapping",
            mappings: [
              "&=> and"
            ]
          }
        },
        analyzer: {
          french_fuzzy: {
            tokenizer: "icu_tokenizer",
            filter: ["french_elision", "icu_folding", "french_stemmer"],
            char_filter: ["replace_and"]
          },
          french_strict: {
            tokenizer: "icu_tokenizer",
            filter: ["french_elision", "icu_folding"]
          }
        }
      }
    },
    mappings: {
      properties: {
        ACMH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ACTU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ACURL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ADRS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AFFE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AIRE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        APPL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        APRO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ARCHEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AUTP: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        AUTR: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        BASE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CADA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CANT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COM: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        CONTACT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CONTIENT_IMAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COORM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COPY: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DATE: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        DBOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DENO: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        DENQ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DEPL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DESC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000
            }
          }
        },
        DIMS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DLAB: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DMAJ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DMIS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DOMN: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        DOSADRS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DOSS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DOSURL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DOSURLPDF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DPRO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DPT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EDIF: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        ENER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ETAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ETUD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        GENR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        HIST: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        HYDR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        IDAGR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        IMAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        IMG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        INSEE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        INTE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LINHA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        LREG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        LBASE2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIENS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIEU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LMDP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LOCA: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        MEMOIRE: {
          properties: {
            ref: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            url: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            }
          }
        },
        MFICH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MHPP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MICR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MOSA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NBOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        OBS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PAFF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PDEN: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        PERS: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        PINT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PLAN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PLOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        POP_CONTIENT_GEOLOCALISATION: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        POP_COORDONNEES: {
          type: "geo_point"
        },
        POP_DATE: {
          type: "long"
        },
        PPRO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000
            }
          }
        },
        PRODUCTEUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PROT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PSTA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REFIM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REFM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REFO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REFJOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        REFMUS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        REG: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        REMA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REMP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        RENV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REPR: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        RFPA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SCLE: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        SCLX: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SITE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        STAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TECH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        THEM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TICO: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 512
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        TOUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TYPO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VERT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VIDEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VISI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VOCA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        WADRS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        WCOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        WEB: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        WRENV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ZONE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        HISTORIQUE: {
          properties: {
            _id: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            nom: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            prenom: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            email: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            date: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            updateMode: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            }
          }
        }
      }
    }
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
              "puisqu"
            ]
          },
          french_stemmer: {
            type: "stemmer",
            language: "light_french"
          }
        },
        char_filter:{
          replace_and:{
            type: "mapping",
            mappings: [
              "& => and"
            ]
          }
        },
        analyzer: {
          french_fuzzy: {
            tokenizer: "icu_tokenizer",
            filter: ["french_elision", "icu_folding", "french_stemmer"],
            char_filter: ["replace_and"]
          },
          french_strict: {
            tokenizer: "icu_tokenizer",
            filter: ["french_elision", "icu_folding"]
          }
        }
      }
    },
    mappings: {
      properties: {
        PLOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ACQU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ADPHOT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ADRESSE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        WADRS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AIRE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ANUMOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ANUMP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ANUMTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AUTG: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        AUTOEU: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        AUTOR: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        AUTP: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        AUTTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        BASE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CHRONO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COM: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        CONTACT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CONTIENT_IMAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COPY: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DPT_LETTRE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COTECOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COTECP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COTECTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COULEUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DATD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DATG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DATIMM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DATOEU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DATOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DATPV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DATTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DIFF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DMAJ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DMIS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DPT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ECH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EDIARCH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EDIF: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        EMET: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        EXPO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        FORMAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        FORMATOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        FORMATTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        IDPROD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        IMG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        INSEE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        JDATPV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LAUTP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LBASE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LBASE2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LEG: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        LEG2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIB: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIENS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIEU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIEUCOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIEUCP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIEUCTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LIEUORIG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        LOCA: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        MARQ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MCGEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MCL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MCPER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MENTIONS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MENTOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        MENTTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000
            }
          }
        },
        MOSA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMAUTP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMVERS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMCD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMOP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMSITE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NVD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        OBJT: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        OBS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        OBSOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        OBSTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PAYS: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        PRECOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PRODUCTEUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PUBLI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000
            }
          }
        },
        REF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REFIM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REFIMG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REFJOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        REFMUS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword"
            }
          }
        },
        REG: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        RENV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ROLE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SCLE: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        SENS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SERIE: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        SITE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        STRUCT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SUJET: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        SUP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TECHN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TECHOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TECHTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        THEATRE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TICO: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        TIREDE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TITRE: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        CINEPROD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TOUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TYP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TYPDOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TYPEIMG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TYPSUPP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VIDEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        VUECD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        WCOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        WEB: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        TRL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DENO: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        AUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AUTR: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        DOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NEGPOS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NOMSN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        HISTORIQUE: {
          properties: {
            _id: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            nom: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            prenom: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            email: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            date: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            updateMode: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            }
          }
        }
      }
    }
  };
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
              "puisqu"
            ]
          },
          french_stemmer: {
            type: "stemmer",
            language: "light_french"
          }
        },
        char_filter:{
          replace_and:{
            type: "mapping",
            mappings: [
              "&=> and"
            ]
          }
        },
        analyzer: {
          french_fuzzy: {
            tokenizer: "icu_tokenizer",
            filter: ["french_elision", "icu_folding", "french_stemmer"],
            char_filter: ["replace_and"]
          },
          french_strict: {
            tokenizer: "icu_tokenizer",
            filter: ["french_elision", "icu_folding"]
          }
        },
        normalizer:{
          sort_normalizer:{
            type: "custom",
            filter: ["trim", "lowercase", "asciifolding"],
          }
        }
      }
    },
    mappings: {
      merimee: {
        properties: {
          ACMH: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ACTU: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ACURL: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ADRS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          AFFE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          AIRE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          APPL: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          APRO: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ARCHEO: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          AUTP: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          AUTR: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          BASE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          CADA: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          CANT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          COM: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          CONTACT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          CONTIENT_IMAGE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          COOR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          COORM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          COPY: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DATE: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          DBOR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DENO: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          DENQ: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DEPL: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DESC: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 8000            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 8000
              }
            }
          },
          DIMS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DLAB: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DMAJ: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DMIS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DOMN: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          DOSADRS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DOSS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DOSURL: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DOSURLPDF: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          DPRO: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 1000            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 1000
              }
            }
          },
          DPT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          EDIF: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          ENER: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ETAT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ETUD: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          GENR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          HIST: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          HYDR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          IDAGR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          IMAGE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          IMG: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          INSEE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          INTE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          LINHA: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          LREG: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          LBASE2: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          LIENS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          LIEU: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          LMDP: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          LOCA: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          MEMOIRE: {
            properties: {
              ref: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              },
              url: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              }
            }
          },
          MFICH: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          MHPP: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          MICR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          MOSA: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          NBOR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          OBS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          PAFF: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          PDEN: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          PERS: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          PINT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          PLAN: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          PLOC: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          POP_CONTIENT_GEOLOCALISATION: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          POP_COORDONNEES: {
            type: "geo_point"
          },
          POP_DATE: {
            type: "long"
          },
          PPRO: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          PRODUCTEUR: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          PROT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          PSTA: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          REF: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          REFIM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          REFM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          REFO: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          REFJOC: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          REFMUS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword"            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer"
              }
            }
          },
          REG: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          REMA: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          REMP: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          RENV: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          REPR: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          RFPA: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          SCLE: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          SCLX: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          SITE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          STAT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          TECH: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          THEM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          TICO: {
            type: "text",
            analyzer: "french_fuzzy",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 512            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 512
              },
              strict: {
                type: "text",
                analyzer: "french_strict"
              }
            }
          },
          TOUT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          TYPO: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          VERT: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          VIDEO: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          VISI: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          VOCA: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          WADRS: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          WCOM: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          WEB: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          WRENV: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          ZONE: {
            type: "text",
            fields: {
              keyword: {
                type: "keyword",
                ignore_above: 256            
              },
              sort: {
                type: "keyword",
                normalizer: "sort_normalizer",
                ignore_above: 256
              }
            }
          },
          HISTORIQUE: {
            properties: {
              _id: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              },
              nom: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              },
              prenom: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              },
              email: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              },
              date: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              },
              updateMode: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                    ignore_above: 256
                  },
                  sort: {
                    type: "keyword",
                    normalizer: "sort_normalizer",
                    ignore_above: 256
                  }
                }
              }
            }
          }
        }
      }
    }
  };
}
