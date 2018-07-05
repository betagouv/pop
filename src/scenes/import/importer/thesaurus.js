import React from 'react';
import { Badge } from 'reactstrap';

import api from '../../../services/api'

export default function checkThesaurus(field, value, thesaurusId) {
    return new Promise(async (resolve, reject) => {
        const jsxArr = [];
        const plainTextArr = [];
        const toCheck = [].concat(value);
        for (var i = 0; i < toCheck.length; i++) {
            if (toCheck[i]) {
                const val = await (api.validateWithThesaurus(thesaurusId, toCheck[i]));
                if (!val.exist) {
                    plainTextArr.push(`Le champs ${field} avec la valeur ${value} n'est pas conforme avec le thesaurus ${thesaurusId}`)
                    jsxArr.push(<div><Badge color="warning">Attention</Badge> Le champs <b>{field}</b> avec la valeur <b>{value}</b> n'est pas conforme avec le thesaurus <b>{thesaurusId}</b></div>)
                }
            }
        }
        resolve({ jsx: jsxArr, text: plainTextArr });
    })
}

/*
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
*/