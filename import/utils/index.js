
const extractCoordinates = require('./geoloc');

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


function extractAutr(str) {
    if (!str) { return []; }
    var regex = new RegExp();
    const urls = [];
    var myArray;
    while ((myArray = regex.exec(str)) != null) {
        console.log('AA', myArray)
        urls.push(myArray[1]);
    }

    return urls;
}

function extractArrayFromRegex(str, regex) {
    let m;
    if (!str) { return []; }
    const arr = [];
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        if(m[1] && m[1].trim()){
            arr.push(m[1]);
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
    var regex = /([0-9]*)e\ssiècle/

    // const v = []
    for (var i = 0; i < str.length; i++) {
        var result = str[i].match(regex);
        if (result && result.length == 2) {
            return parseInt(result[1])
        } else {
            console.log(`${REF} Error to extract DATE ${str[i]}`)
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
    extractArrayFromRegex,
    extractCoordinates
};

