export default function compare(imported, existed) {
    if (imported === existed) return true;
    // if both imported and existed are null or undefined and exactly the same

    if (!(imported instanceof Object) || !(existed instanceof Object)) {
        // console.log('false1', existed, p)
        return false;
    }
    // if they are not strictly equal, they both need to be Objects

    if (imported.constructor !== existed.constructor) {
        // console.log('false2', existed, p)
        return false;
    }
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for (var p in imported) {


        imported[p] = imported[p].trim();

        if (!imported.hasOwnProperty(p)) continue;
        //other properties were tested using imported.constructor === existed.constructor

        if (!existed.hasOwnProperty(p)) {
            //console.log('false3', y, p)
            return false;
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

        // if they have the same strict value or identity then they are equal
        //if (!imported[p] && (!existed[p] || (Array.isArray(existed[p]) && !existed[p].length))) continue;

        console.log(`Compare key = ${p} REF = ${existed.REF} imported `, imported[p], ' with ', existed[p])
        return false;

        //if (typeof (imported[p]) !== "object") return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        // if (!compareObjects(imported[p], existed[p])) return false;
        // Objects and Arrays must be tested recursively
    }

    return true;
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