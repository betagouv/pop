import React from 'react';
import { Badge } from 'reactstrap';

import api from '../../services/api'

export default function checkThesaurus(obj, collection) {
    return new Promise(async (resolve, reject) => {
        const jsxArr = [];
        const plainTextArr = [];
        for (var key in obj) {
            if (Thesaurus[collection] && Thesaurus[collection][key]) {
                if (Array.isArray(obj[key])) {
                    for (var i = 0; i < obj[key].length; i++) {
                        if (obj[key]) {
                            const val = await (api.validateWithThesaurus(Thesaurus[collection][key], obj[key][i]));
                            if (!val.exist) {
                                plainTextArr.push(`Le champs ${key} avec la valeur ${obj[key][i]} n'est pas conforme avec le thesaurus ${Thesaurus[collection][key]}`)
                                jsxArr.push(<div><Badge color="warning">Attention</Badge> Le champs <b>{key}</b> avec la valeur <b>{obj[key][i]}</b> n'est pas conforme avec le thesaurus <b>{Thesaurus[collection][key]}</b></div>)
                            }
                        }
                    }
                } else {
                    if (obj[key]) {
                        const val = await (api.validateWithThesaurus(Thesaurus[collection][key], obj[key]));
                        if (!val.exist) {
                            plainTextArr.push(`Le champs ${key} avec la valeur ${obj[key]} n'est pas conforme avec le thesaurus ${Thesaurus[collection][key]}`)
                            jsxArr.push(<div><Badge color="warning">Attention</Badge> Le champs <b>{key}</b> avec la valeur <b>{obj[key]}</b> n'est pas conforme avec le thesaurus <b>{Thesaurus[collection][key]}</b></div>)
                        }
                    }
                }
            }
        }
        resolve({ jsx: jsxArr, text: plainTextArr });
    })
}

const Thesaurus = {
    merimee: {
        "AFFE": "http://data.culture.fr/thesaurus/resource/ark:/67717/T97",
        "APRO": "http://data.culture.fr/thesaurus/resource/ark:/67717/T98",
        "COPY": "http://data.culture.fr/thesaurus/resource/ark:/67717/T21",
        "COUV": "http://data.culture.fr/thesaurus/resource/ark:/67717/T26",
        "DENO": "http://data.culture.fr/thesaurus/resource/ark:/67717/T96",
        "DEPL": "http://data.culture.fr/thesaurus/resource/ark:/67717/T14",
        "DIMS": "http://data.culture.fr/thesaurus/resource/ark:/67717/T11",
        "DOSS": "http://data.culture.fr/thesaurus/resource/ark:/67717/T13",
        "ELEV": "http://data.culture.fr/thesaurus/resource/ark:/67717/T25",
        "ENER": "http://data.culture.fr/thesaurus/resource/ark:/67717/T27",
        "ESCA": "http://data.culture.fr/thesaurus/resource/ark:/67717/T29",
        "ETAG": "http://data.culture.fr/thesaurus/resource/ark:/67717/T23",
        "ETAT": "http://data.culture.fr/thesaurus/resource/ark:/67717/T30",
        "ETUD": "http://data.culture.fr/thesaurus/resource/ark:/67717/T68",
        "GENR": "http://data.culture.fr/thesaurus/resource/ark:/67717/T197",
        "IMPL": "http://data.culture.fr/thesaurus/resource/ark:/67717/T12",
        "INTE": "http://data.culture.fr/thesaurus/resource/ark:/67717/T33",
    },
    joconde: {

    },
    mnr: {

    },
    palissy: {

    },
}






