
function extractIMG(str) {
    if (str) {
        return str.replace('@{img1;//', 'http://').replace(';ico1}@', '');
    }
    return str;
}

function extractEmail(str) {
    var regex = /mailto:([\w\d._@]*)/
    var result = str.match(regex);
    if (result && result.length == 2) {
        return result[1];
    }
    return str;
}

module.exports = {
    extractIMG,
    extractEmail,
};