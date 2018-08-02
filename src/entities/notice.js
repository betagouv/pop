export default class Notice {
    constructor() {
        this._errors = [];
        this._messages = [];
        this._warnings = [];
        this._images = [];
    }

    makeItFlat = function () {
        let flat = {};
        for (var property in this) {
            if (this.hasOwnProperty(property) && property.indexOf('_') !== 0 && typeof (this[property]) === 'object') {
                if (!this[property].generated) {
                    flat[property] = this[property].value;
                }
            }
        }
        return flat;
    }

    extractArray = function (str, delim = ";") {
        if (!str) { return [] }
        if (Array.isArray(str)) { return str; }
        return str.split(delim).map((e) => e.trim())
    }
    extractEmail = function (str) {
        if (!str) { return '' }
        var regex = /([\w\d-._@]*)/
        var result = str.match(regex);
        if (result && result.length == 2) {
            return result[1];
        }
        // erreurs.push(`Impossible d'extraire l'email dans ${str}`)
        return str;
    }
    extractUrls = function (str) {
        if (!str) { return [] }
        const arr = _regex(str, /(http[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g);
        if (arr.length) {
            return arr;
        }
        // erreurs.push(`Impossible d'extraire l'url dans ${str}`);
        return str;
    }

    stripHTML(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        console.log('html', html)
        return tmp.textContent || tmp.innerText || "";
    }
}


Notice.has = function (key) {
    const obj = new this({});
    return obj.hasOwnProperty(key)
}
