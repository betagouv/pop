import api from '../../../services/api'

export default async function checkThesaurus(importedNotices) {
    const optimMap = {};

    if (!importedNotices.length) {
        resolve();
    }

    const allfieldswiththesaurus = Object.keys(importedNotices[0]).filter(e => (typeof (importedNotices[0][e]) === 'object' && importedNotices[0][e].thesaurus));

    for (var i = 0; i < importedNotices.length; i++) {

        for (var j = 0; j < allfieldswiththesaurus.length; j++) {
            const field = allfieldswiththesaurus[j].value;
            const thesaurus = allfieldswiththesaurus[j].thesaurus;
            const values = [].concat(importedNotices[i][field]);

            for (var k = 0; k < values.length; k++) {
                const value = values[k];
                if (value) {
                    let val = null;
                    if (optimMap[thesaurus] && optimMap[thesaurus][value] !== undefined) {
                        val = optimMap[thesaurus][value];
                    } else {
                        val = await (api.validateWithThesaurus(thesaurus, value));
                    }
                    if (!val) {
                        if (allfieldswiththesaurus[j].thesaurus_strict === true) {
                            importedNotices[i]._errors.push(`Le champs ${field} avec la valeur ${value} n'est pas conforme avec le thesaurus ${thesaurus}`)
                        } else {
                            importedNotices[i]._warnings.push(`Le champs ${field} avec la valeur ${value} n'est pas conforme avec le thesaurus ${thesaurus}`)
                        }
                    }

                    if (!optimMap[thesaurus]) optimMap[thesaurus] = {};
                    optimMap[thesaurus][value] = val;
                }
            }
        }
    }
}