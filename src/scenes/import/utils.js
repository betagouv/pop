function extractIMG(str) {
    if (!str) {
        return '';
    }
    return str.replace(/\s/g, "").replace('@{img1;//', 'http://').replace(';ico1}@', '')
}

function extractEmail(str, erreurs) {
    if (!str) { return '' }
    var regex = /([\w\d-._@]*)/
    var result = str.match(regex);
    if (result && result.length == 2) {
        return result[1];
    }
    erreurs.push(`Impossible d'extraire l'email dans ${str}`)
    return str;
}

function extractArray(str, delim, erreurs) {
    if (!str) {
        return ''
    }
    return str.split(delim).map((e) => e.trim())
}

function extractAuteurs(str, erreurs) {
    if (!str) { return []; }
    const arr = _regex(str, /([A-Za-zàâçéèêëîïôûùüÿñæœ .-]*\([a-zàâçéèêëîïôûùüÿñæœ .\-',]*\)|[A-Za-zàâçéèêëîïôûùüÿñæœ .'-]*)/g);
    if (arr.length) {
        return arr;
    }
    erreurs.push(`Impossible d'extraire les auteurs dans ${str}`)
    return str;
}

function extractLink(str, erreurs) {
    if (!str) { return [] }
    const arr = _regex(str, /([A-Z][A-Z][A-Z0-9]{6,})/g);
    if (arr.length) {
        return arr;
    }
    erreurs.push(`Impossible d'extraire le lien ${str}`)
    return str;
}

function extractPOPDate(str, erreurs) {
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
                erreurs.push(`Can't convert siecle ${e} `)
            } else {
                temp.push((s - 1) * 100)
            }
        });

        if (!temp.length) {
            erreurs.push(`Impossible dextraire la date dans ${str[i]}`)
        }
        dates = dates.concat(temp);
    }


    return dates;
}

function extractUrls(str, erreurs) {
    if (!str) { return [] }
    const arr = _regex(str, /(http[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g);
    if (arr.length) {
        return arr;
    }
    erreurs.push(`Impossible d'extraire l'url dans ${str}`);
    return str;

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
    extractAuteurs,
    _regex
};

