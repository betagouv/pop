
const extractCoordinates = require('./geoloc');

function extractIMG(str) {
    if (!str) {
        return '';
    }
    return str.replace(/\s/g, "").replace('@{img1;//', 'http://').replace(';ico1}@', '');
}

function extractEmail(str) {
    var regex = /mailto:([\w\d._@]*)/
    var result = str.match(regex);
    if (result && result.length == 2) {
        return result[1];
    }
    return str;
}

function extractArray(val, delim) {
    if (!val) {
        return []
    }
    return val.split(delim).map((e) => e.trim());
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
    extractCoordinates
};

