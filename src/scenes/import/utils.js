import React from 'react';

function compare(imported, existed) {

    const differences = []

    if (imported === existed) return differences;
    // if both imported and existed are null or undefined and exactly the same

    if (!(imported instanceof Object) || !(existed instanceof Object)) {
        console.error('Error when comparing imported and existed objects')
        return differences;
    }
    // if they are not strictly equal, they both need to be Objects

    if (imported.constructor !== existed.constructor) {
        console.error('Error when comparing imported and existed objects constructors')
        return differences;
    }
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for (var p in imported) {
        imported[p] = imported[p].trim();

        if (!imported.hasOwnProperty(p)) continue;
        //other properties were tested using imported.constructor === existed.constructor

        if (!existed.hasOwnProperty(p)) {
            console.log('diff', imported[p], existed[p])
            differences.push(p)
            continue;
        }

        if (Array.isArray(existed[p]) && !existed[p].length && imported[p]) {
            continue;
        }

        if (isInt(existed[p])) {
            imported[p] = addZero(imported[p], existed[p].toString().length)
        }

        //allows to compare imported[ p ] and existed[ p ] when set to undefined
        if (imported[p] === existed[p]) continue;

        //transform to array
        if (Array.isArray(existed[p])) {
            imported[p] = imported[p] ? imported[p].split(';') : [];
            if (imported[p].length == existed[p].length && imported[p].every((v, i) => v === existed[p][i])) continue;
        }

        console.log('diff', imported[p], existed[p])
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

function diff(importedNotices, existingNotices) {
    const unChanged = [];
    const updated = [];
    const created = [];
    const invalid = [];


    for (var i = 0; i < importedNotices.length; i++) {
        let importedNotice = importedNotices[i];
        let found = false;
        for (var j = 0; j < existingNotices.length; j++) {
            const existingNotice = existingNotices[j];
            if (importedNotice.REF === existingNotice.REF) {
                const differences = compare(importedNotice, existingNotice);
                const messages = differences.map((e, i) => { return (<div key={i}>Le champs <b>{e}</b> à évolué de "<b>{existingNotice[e]}</b>" à "<b>{importedNotice[e]}</b>"</div>) })
                if (differences.length) {
                    updated.push({ notice: importedNotice, messages })
                } else {
                    unChanged.push({ notice: existingNotice })
                }
                found = true;
            }
        }
        if (!found) {
            created.push({ notice: importedNotice });
        }
    }

    return {
        unChanged,
        created,
        updated,
        invalid
    }
}


export {
    diff
}