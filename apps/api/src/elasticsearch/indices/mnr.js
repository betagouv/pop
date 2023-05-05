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
    mnr: {
      properties: {
        AATT: {
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
        ATIT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ATTR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        AUTI: {
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
        BIBL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000,
              normalizer: "sort_normalizer"
            }
          }
        },
        CATE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        RCL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        COMM: {
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
        DESC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
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
        DREP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ECOL: {
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
        GENE: {
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
              ignore_above: 8000,
              normalizer: "sort_normalizer"
            },
            strict: {
              type: "text",
              analyzer: "french_strict"
            }
          }
        },
        HIST2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        HIST3: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        HIST4: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        SALLES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        CARTELS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        INSC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        INV: {
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
              ignore_above: 8000,
              normalizer: "sort_normalizer"
            }
          }
        },
        MILL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NOTE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000,
              normalizer: "sort_normalizer"
            }
          }
        },
        NOTE2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NUMS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        OBSE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PAUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PHOT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PREP: {
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
        PROV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        PTIT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        REDC: {
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
        RESUME: {
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
        SREP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        STYL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        SUITE: {
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
        TITR: {
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
        NET: {
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
        }
      }
    }
  }
};
