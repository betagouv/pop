import React from 'react';
import { Badge } from 'reactstrap';

import api from '../../../services/api'

export default function checkThesaurus(field, value, thesaurusId) {
    return new Promise(async (resolve, reject) => {
        const arr = [];
        const plainTextArr = [];
        const toCheck = [].concat(value);
        for (var i = 0; i < toCheck.length; i++) {
            if (toCheck[i]) {
                const val = await (api.validateWithThesaurus(thesaurusId, toCheck[i]));
                if (!val.exist) {
                    arr.push(`Le champs ${field} avec la valeur ${toCheck[i]} n'est pas conforme avec le thesaurus ${thesaurusId}`)
                }
            }
        }
        resolve(arr);
    })
}

