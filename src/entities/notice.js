export default class Notice {
  constructor() {
    this._errors = [];
    this._messages = [];
    this._warnings = [];
    this._images = [];
    this._type = "";
    this._fields = [];
    this.POP_IMPORT = { value: [] };
  }

  setProperty(property, type, value, opt = null) {
    // in order to know which properties compose an entity
    this._fields.push(property);

    //if there is a value, add it. Otherwise I dont want to overwrite a value if there is nothing
    if (value !== undefined) {
      this[property] = { type, value }; // The type is used in order to check if the value is different from the production. I need the type
      if (opt) {
        this[property] = { ...this[property], ...opt };
      }
    }
  }

  makeItFlat = function() {
    let flat = {};
    for (var property in this) {
      if (
        this.hasOwnProperty(property) &&
        property.indexOf("_") !== 0 &&
        typeof this[property] === "object"
      ) {
        if (!this[property].generated) {
          flat[property] = this[property].value;
        }
      }
    }
    return flat;
  };

  extractArray = function(str, delim = ";") {
    if (str === undefined) {
      return undefined;
    }
    if (!str) {
      return [];
    }
    if (Array.isArray(str)) {
      return str;
    }
    const arr = str.split(delim).map(e => e.trim());

    //remove duplicates
    return arr.filter((obj, key, array) => array.map(obj2 => obj !== obj2));
    //return [...new Set(arr)]; // DOESNT WORK IN PRODUCTION
  };

  extractEmail = function(str) {
    if (str === undefined) {
      return str;
    }
    if (!str) {
      return "";
    }
    var regex = /([\w\d-._@]*)/;
    var result = str.match(regex);
    if (result && result.length == 2) {
      return result[1];
    }
    // erreurs.push(`Impossible d'extraire l'email dans ${str}`)
    return str;
  };
  extractUrls = function(str) {
    if (str === undefined) {
      return str;
    }

    if (!str) {
      return [];
    }
    const arr = _regex(str, /(http[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g);
    if (arr.length) {
      return arr;
    }
    // erreurs.push(`Impossible d'extraire l'url dans ${str}`);
    return str;
  };

  stripHTML(html) {
    if (html === undefined) {
      return html;
    }
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
}

function _regex(str, reg) {
  if (!str) {
    return [];
  }
  var regex = new RegExp(reg);
  const arr = [];
  let m;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      // This is necessary to avoid infinite loops with zero-width matches
      regex.lastIndex++;
    }
    if (m[1]) {
      arr.push(m[1].trim());
    }
  }
  return arr;
}
