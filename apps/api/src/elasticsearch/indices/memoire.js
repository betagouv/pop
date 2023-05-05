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
    memoire: {
      properties: {
        PLOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ACQU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ADPHOT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ADRESSE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        WADRS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        AIRE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ANUMOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ANUMP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ANUMTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        AUTG: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        BASE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        CHRONO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        COM: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        CONTIENT_IMAGE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        COPY: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DPT_LETTRE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        COTECOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        COTECP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        COTECTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        COULEUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DATD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DATG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DATIMM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DATOEU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DATOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DATPV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DATTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DIFF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DMAJ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DMIS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DPT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ECH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        EDIARCH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        EDIF: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        EXPO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FORMAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FORMATOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FORMATTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        IDPROD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        IMG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        INSEE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        JDATPV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LAUTP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LBASE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LBASE2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LEG: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LIB: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LIENS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LIEU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LIEUCOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LIEUCP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LIEUCTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LIEUORIG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LOCA: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        MCGEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        MCL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        MCPER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        MENTIONS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        MENTOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        MENTTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000,
              normalizer: "sort_normalizer"
            }
          }
        },
        MOSA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMAUTP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMVERS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMCD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMOP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMSITE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NVD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        OBJT: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        OBSOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        OBSTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PAYS: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PRODUCTEUR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PUBLI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000,
              normalizer: "sort_normalizer"
            }
          }
        },
        REF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        REFIM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        REFIMG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        REFJOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "sort_normalizer"
            }
          }
        },
        REFMUS: {
          type: "text",
          fields: {
            keyword: {
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ROLE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        SCLE: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        SERIE: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        STRUCT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        SUJET: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TECHN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TECHOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TECHTI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        THEATRE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TICO: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TITRE: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TOUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TYP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TYPDOC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TYPEIMG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TYPSUPP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        VIDEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        VUECD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        WCOM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        WEB: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TRL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DENO: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        AUTR: {
          type: "text",
          analyzer: "french_fuzzy",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NEGPOS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NOMSN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            },
            nom: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            },
            prenom: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            },
            email: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            },
            date: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            },
            updateMode: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            }
          }
        }
      }
    }
  }
};
