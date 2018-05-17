
function extractIMG(str) {
    if (!str) {
        return '';
    }

    let trimed = str.replace(' ', '');
    return trimed.replace('@{img1;//', 'http://').replace(';ico1}@', '');
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

    let newVal = val ? val.split(delim) : [];
    newVal = newVal.map((e) => e.trim())
    return newVal;
}

function lambert93toWGPS(lambertE, lambertN) {

    var constantes = {
        GRS80E: 0.081819191042816,
        LONG_0: 3,
        XS: 700000,
        YS: 12655612.0499,
        n: 0.7256077650532670,
        C: 11754255.4261
    }

    var delX = lambertE - constantes.XS;
    var delY = lambertN - constantes.YS;
    var gamma = Math.atan(-delX / delY);
    var R = Math.sqrt(delX * delX + delY * delY);
    var latiso = Math.log(constantes.C / R) / constantes.n;
    var sinPhiit0 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * Math.sin(1)));
    var sinPhiit1 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit0));
    var sinPhiit2 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit1));
    var sinPhiit3 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit2));
    var sinPhiit4 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit3));
    var sinPhiit5 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit4));
    var sinPhiit6 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit5));

    var longRad = Math.asin(sinPhiit6);
    var latRad = gamma / constantes.n + constantes.LONG_0 / 180 * Math.PI;

    var longitude = latRad / Math.PI * 180;
    var latitude = longRad / Math.PI * 180;

    return { longitude: longitude, latitude: latitude };
}




module.exports = {
    extractIMG,
    extractEmail,
    extractArray,
    lambert93toWGPS
};


Math.tanh = Math.tanh || function (x) {
    if (x === Infinity) {
        return 1;
    } else if (x === -Infinity) {
        return -1;
    } else {
        return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
    }
};

Math.atanh = Math.atanh || function (x) {
    return Math.log((1 + x) / (1 - x)) / 2;
};



