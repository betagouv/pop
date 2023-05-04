module.exports = {
    "settings": {
        "analysis": {
            "filter": {
                "french_elision": {
                    "type": "elision",
                    "articles_case": true,
                    "articles": [
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
                "french_stemmer": {
                    "type": "stemmer",
                    "language": "light_french"
                }
            },
            "analyzer": {
                "french_fuzzy": {
                    "tokenizer": "icu_tokenizer",
                    "filter": ["french_elision", "icu_folding", "french_stemmer"]
                },
                "french_strict": {
                    "tokenizer": "icu_tokenizer",
                    "filter": ["french_elision", "icu_folding"]
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
    "mappings": {
        "autor": {
            "properties": {
                "ADRS": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "ALAMAP": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "ARK": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "BASE": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "BIBLIO": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "BIF": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "BIO": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "CONTACT": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "COPY": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "DMAJ": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "DMIS": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "DMORT": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "DNAISS": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "EXPO": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "FONC": {
                    "type": "text",
                    "analyzer": "french_fuzzy",
                    "fields": {
                            "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        },
                            "strict": {
                            "type": "text",
                            "analyzer": "french_strict"
                        }
                    }
                },
                "FORM": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "GAR": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "INI": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "INS": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "ISNI": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "ISNI_VERIFIEE": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "LIENS": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "LMDP": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "LMORT": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "LNAISS": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "AUTORLOCA": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "LOCACT": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "LRELA": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "NATIO": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "NOM": {
                    "type": "text",
                    "analyzer": "french_fuzzy",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        },
                        "strict": {
                            "type": "text",
                            "analyzer": "french_strict"
                        } 
                    }
                },
                "OBS": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "OEUVR": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "PNOM": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "PREF": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "PREN": {
                    "type": "text",
                    "analyzer": "french_fuzzy",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        },
                        "strict": {
                            "type": "text",
                            "analyzer": "french_strict"
                        } 
                    }
                },
                "PRODUCTEUR": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "PUBLI": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "REDAC": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "REF": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "REJET": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "SOURCES": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "SYMB": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "TITR": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "TYPAPE": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "TYPID": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "NOMPRENOM": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "CONTIENT_IMAGE": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "VIDEO": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256,
                            normalizer: "sort_normalizer"
                        }
                    }
                },
                "HISTORIQUE": {
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
}
