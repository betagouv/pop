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

