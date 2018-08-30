function compare(importedObject, existed) {


    //make the imported object flat
    let imported = importedObject.makeItFlat();

    const differences = []

    if (imported === existed) return differences;
    // if both imported and existed are null or undefined and exactly the same

    if (!(imported instanceof Object) || !(existed instanceof Object)) {
        //     console.error('Error when comparing imported and existed objects')
        return differences;
    }
    // if they are not strictly equal, they both need to be Objects

    if (imported.constructor !== existed.constructor) {
        //     console.error('Error when comparing imported and existed objects constructors')
        return differences;
    }
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for (var p in imported) {
        if (!imported.hasOwnProperty(p)) continue;
        //other properties were tested using imported.constructor === existed.constructor

        if (!existed.hasOwnProperty(p)) {
            //     console.log('diff1 : ', p, imported[p], existed[p])
            differences.push(p)
            continue;
        }

        if (imported[p] == existed[p]) continue;

        if (Array.isArray(existed[p]) && !existed[p].length && imported[p]) {
            continue;
        }

        // imported[p] = imported[p].trim();

        if (isInt(existed[p])) {
            imported[p] = addZero(imported[p], existed[p].toString().length)
        }

        //allows to compare imported[ p ] and existed[ p ] when set to undefined
        if (imported[p] == existed[p] || imported[p] === undefined && existed[p] === '' || imported[p] === undefined && Array.isArray(existed[p]) && !existed[p].length) continue;


        if (Array.isArray(imported[p]) !== Array.isArray(existed[p])) {
            //     console.log('diff2 :', p, imported[p], existed[p])
            differences.push(p)
            continue;
        }

        if (Array.isArray(imported[p]) && Array.isArray(existed[p])) {
            if (imported[p].length == existed[p].length && imported[p].every((v, i) => v === existed[p][i])) continue;
        }


        //    console.log('diff3 :', p, '#', imported[p], '#', existed[p], '#', imported[p] == existed[p])
        // if they have the same strict value or identity then they are equal
        //if (!imported[p] && (!existed[p] || (Array.isArray(existed[p]) && !existed[p].length))) continue;
        differences.push(p)
    }
    return differences;
}

function addZero(number, numberofzero) {
    const add = numberofzero - number.toString().length;
    let hey = number.toString();
    for (var i = 0; i < add; i++) {
        hey = "0" + hey;
    }
    return hey;
}

function isInt(value) {
    return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}

export default function diff(importedNotices, existingNotices) {

    for (var i = 0; i < importedNotices.length; i++) {


        let found = false;
        for (var j = 0; j < existingNotices.length; j++) {
            const existingNotice = existingNotices[j];
            if (importedNotices[i].REF.value === existingNotice.REF) {
                let differences = compare(importedNotices[i], existingNotice);

                //remove differences based on generated fields
                // differences = differences.filter(key => !fieldToNotCheck.includes(key));

                importedNotices[i]._messages = differences.map(e => {
                    const from = Array.isArray(existingNotice[e]) ? existingNotice[e].join(', ') : existingNotice[e];
                    const to = Array.isArray(importedNotices[i][e].value) ? importedNotices[i][e].value.join(', ') : importedNotices[i][e].value;
                    console.log(from,to);
                    return `Le champs ${e} à évolué de ${from} à ${to}`;
                });
                
                if (differences.length) {
                    importedNotices[i]._status = 'updated';
                } else {
                    importedNotices[i]._status = 'unchanged';
                }
                found = true;
            }
        }
        if (!found) {
            importedNotices[i]._status = 'created';
        }
    }

    return importedNotices;
}