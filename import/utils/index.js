
const { extractPoint, extractPolygon } = require('./geoloc');

function extractIMG(str) {
    if (!str) {
        return '';
    }
    return str.replace(/\s/g, "").replace('@{img1;//', 'http://').replace(';ico1}@', '');
}

function extractEmail(str, REF) {
    if (!str) { return '' }
    var regex = /mailto:([\w\d._@]*)/
    var result = str.match(regex);
    if (result && result.length == 2) {
        return result[1];
    }
    console.log(`${REF} Error to extract Email ${str}`)
    return str;
}

function extractArray(val, delim) {
    if (!val) {
        return []
    }
    return val.split(delim).map((e) => e.trim());
}

function extractAuteurs(str,  ref) {
    const regex = /([A-Za-zàâçéèêëîïôûùüÿñæœ .-]*\([a-zàâçéèêëîïôûùüÿñæœ .\-',]*\)|[A-Za-zàâçéèêëîïôûùüÿñæœ .'-]*)/g;
    let m;
    const interdits = ['dit', 'ou', 'et']
    if (!str) { return []; }
    const arr = [];
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        const val = m[1].trim();
        if (val) {
            if (interdits.indexOf(val) === -1) {
                arr.push(val);
            }
        }
    }
    return arr.map(e => e.trim());
}

function extractLink(str, REF) {
    if (!str) { return '' }
    var regex = /\(['"]([a-z]*)['"][\t\n ]*,[\t\n ]*['"]([A-Za-z0-9]*)['"]\)/
    var result = str.match(regex);
    if (result && result.length == 3) {
        return result[1] + '/' + result[2]
    }
    console.log(`${REF} Error to extract Link ${str}`)
    return '';
}

function extractPOPDate(str, REF) {
    if (!str.length) { return -1 }

    const v = ('' + str).trim().toLowerCase();

    if (v === 'antiquité') {
        return 0;
    } else if (v === 'haut moyen âge') {
        return 0;
    } else if (v === 'préhistoire') {
        return 0;
    }


    var regex = /([0-9]*)e\ssiècle/
    // const v = []
    for (var i = 0; i < str.length; i++) {
        var result = str[i].match(regex);
        if (result && result.length == 2) {
            return parseInt(result[1])
        } else {
            console.log('v', v)
            console.log(`${REF} Error to extract DATE ${str[i]} (${v})`)
        }
    }



    return -1;
}

function extractUrls(str) {
    if (!str) {
        return [];
    }
    var regex = new RegExp(/\('([-a-zA-Z0-9@:%._\/]*)'\)/g);
    const urls = [];
    var myArray;
    while ((myArray = regex.exec(str)) != null) {
        console.log('yo', str)
        urls.push(myArray[1]);
    }

    return urls;
}

module.exports = {
    extractIMG,
    extractEmail,
    extractArray,
    extractUrls,
    extractPOPDate,
    extractLink,
    extractAuteurs,
    extractPoint,
    extractPolygon
};

