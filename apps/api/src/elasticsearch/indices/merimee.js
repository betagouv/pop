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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ACTU: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ACURL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ADRS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        AFFE: {
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
        APPL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        APRO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ARCHEO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
        CADA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        CANT: {
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
        COOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        COORM: {
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
        DATE: {
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
        DBOR: {
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
        DENQ: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DEPL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DESC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000,
              normalizer: "sort_normalizer"
            }
          }
        },
        DIMS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DLAB: {
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
        DOMN: {
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
        DOSADRS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DOSS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DOSURL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DOSURLPDF: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DPRO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 1000,
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
        ENER: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ETAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ETUD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        GENR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        HIST: {
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
        HYDR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        IDAGR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        IMAGE: {
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
        INTE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        LINHA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              normalizer: "sort_normalizer"
            }
          }
        },
        LREG: {
          type: "text",
          fields: {
            keyword: {
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
        LMDP: {
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
        MEMOIRE: {
          properties: {
            ref: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                  normalizer: "sort_normalizer"
                }
              }
            },
            url: {
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
        },
        MFICH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        MHPP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        MICR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
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
        NBOR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        OBS: {
          type: "text",
          fields: {
            keyword: {
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PDEN: {
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
        PERS: {
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
        PINT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PLAN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
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
        POP_CONTIENT_GEOLOCALISATION: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
        PROT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PSTA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
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
        REFM: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        REFO: {
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
        REMA: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        REMP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
        REPR: {
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
        RFPA: {
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
        SCLX: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
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
        STAT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TECH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        THEM: {
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
              ignore_above: 512,
              normalizer: "sort_normalizer"
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
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TYPO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        VERT: {
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
        VISI: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        VOCA: {
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
        WRENV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ZONE: {
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
