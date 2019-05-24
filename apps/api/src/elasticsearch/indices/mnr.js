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
      analyzer: {
        french_fuzzy: {
          tokenizer: "icu_tokenizer",
          filter: ["french_elision", "icu_folding", "french_stemmer"]
        },
        french_strict: {
          tokenizer: "icu_tokenizer",
          filter: ["icu_folding"]
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
        ATIT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ATTR: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        AUTI: {
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
        BIBL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000
            }
          }
        },
        CATE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        CATE_DEPREC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        COMM: {
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
        DESC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
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
        DMIS: {
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
        DOMN: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        DREP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        ECOL: {
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
        EXPO: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        GENE: {
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
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000
            }
          }
        },
        HIST2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        HIST3: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        HIST4: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        HIST5: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        HIST6: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        INSC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        INV: {
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
        MILL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NOTE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000
            }
          }
        },
        NOTE2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        NUMS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        OBSE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PAUT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PHOT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PREP: {
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
        PROV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        PTIT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        REDC: {
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
        RESUME: {
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
        SREP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        STYL: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256
            }
          }
        },
        SUITE: {
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
        TITR: {
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
        TOUT: {
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
        }
      }
    }
  }
};
