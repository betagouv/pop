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
    enluminures: {
      properties: {
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
        BASE: {
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
              normalizer: "sort_normalizer"
            }
          }
        },
        ATTRIB: {
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
        AUTS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        CONSERV: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        CONTXT: {
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
        COTE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DATDEB: {
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
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        DATFIN: {
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
        DROIT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ENRGFP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ENRGMS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ETAB: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FOLIOS: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        FOPG: {
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
        REFC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        REFDE: {
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
        LANGOUV: {
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
        LOCA2: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NFICH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NOMENC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NOTDEC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        NOTES: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 8000,
              normalizer: "sort_normalizer"
            }
          }
        },
        NVUE: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        OPHOT: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ORIGG: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ORIGH: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        ORIGP: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        POSS: {
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
        REFD: {
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
        SUPP: {
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
        TYPCOD: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TYPDEC: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
              normalizer: "sort_normalizer"
            }
          }
        },
        TYPE: {
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
        VISITE: {
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
