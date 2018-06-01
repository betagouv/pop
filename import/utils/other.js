
const { log } = require('./log');

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
    log('EMAIL', REF, 'Cant extract email', str)
    return str;
}

function extractArray(val, delim) {
    if (!val) {
        return []
    }
    return val.split(delim).map((e) => e.trim());
}

function extractAuteurs(str, REF) {
    if (!str) { return []; }
    const interdits = ['dit', 'ou', 'et']
    const arr = _regex(str, /([A-Za-zàâçéèêëîïôûùüÿñæœ .-]*\([a-zàâçéèêëîïôûùüÿñæœ .\-',]*\)|[A-Za-zàâçéèêëîïôûùüÿñæœ .'-]*)/g).filter((e) => interdits.indexOf(e) === -1);

    if (!arr.length) {
        log('AUTEURS', REF, 'Can\'t extract auteur', str)
    }
    return arr;
}

function extractLink(str, REF) {
    if (!str) { return [] }
    const arr = _regex(str, /([A-Z][A-Z][A-Z0-9]+)/g);
    if (!arr.length) {
        log('LINK', REF, 'Can\'t extract LINK', str)
    }
    return arr;
}

function extractPOPDate(str, REF) {
    let dates = [];

    for (var i = 0; i < str.length; i++) {
        let temp = []
        const nomalizedStr = ('' + str[i]).normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

        if (nomalizedStr.includes('prehistoire')) {
            temp.push(-10000);
        }

        if (nomalizedStr.includes('antiquite')) {
            temp.push(-1500);
        }
        if (nomalizedStr.includes('haut moyen age')) {
            temp.push(1000);
        }
        if (nomalizedStr.includes('moyen age')) {
            temp.push(500);
        }
        if (nomalizedStr.includes('temps modernes')) {
            temp.push(1800);
        }
        if (nomalizedStr.includes('epoque contemporaine')) {
            temp.push(2000);
        }

        _regex(str[i], /([0-9]+)er* siècle/g).forEach((e) => {
            const s = parseInt(e);
            if (isNaN(s)) {
                log('DATE', REF, 'Cant convert siecle', e)
            } else {
                temp.push((s - 1) * 100)
            }
        });

        if (!temp.length) {
            log('DATE', REF, 'Cant extract DATE', str[i])
        }
        dates = dates.concat(temp);
    }
    return dates;
}

function extractUrls(str, REF) {
    if (!str) { return [] }
    const arr = _regex(str, /(http[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g);
    if (!arr.length) {
        log('LIENS', REF, 'Cant extract URL', str)
    }

    return arr;
}

function _regex(str, reg) {
    if (!str) {
        return [];
    }
    var regex = new RegExp(reg);
    const arr = [];
    let m;
    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {        // This is necessary to avoid infinite loops with zero-width matches 
            regex.lastIndex++;
        }
        if (m[1]) {
            arr.push(m[1].trim());
        }
    }
    return arr;
}



module.exports = {
    extractIMG,
    extractEmail,
    extractArray,
    extractUrls,
    extractPOPDate,
    extractLink,
    extractAuteurs
};

