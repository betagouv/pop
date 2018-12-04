import Notice from "./notice";

export default class Joconde extends Notice {
  constructor(body) {
    super();
    this._type = "joconde";

    this.setProperty("REF", "String", String(body.REF).trim(), {
      required: true
    });
    this.setProperty("PRODUCTEUR", "String", body.PRODUCTEUR, {
      generated: true
    });

    this.setProperty("ADPT", "Array", this.extractArray(body.ADPT));
    this.setProperty("APTN", "String", body.APTN);
    this.setProperty("ATTR", "String", body.ATTR);

    this.setProperty("AUTR", "String", body.AUTR, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T513",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("BIBL", "String", body.BIBL);
    this.setProperty("APPL", "String", body.APPL);
    this.setProperty("COMM", "String", body.COMM);
    this.setProperty("CONTACT", "String", this.extractEmail(body.CONTACT));
    this.setProperty("COOR", "String", body.COOR);
    this.setProperty("COPY", "String", body.COPY);
    this.setProperty("DACQ", "String", body.DACQ);
    this.setProperty("DATA", "String", body.DATA);
    this.setProperty("DATION", "String", body.DATION);
    this.setProperty("DDPT", "String", body.DDPT);
    this.setProperty("DECV", "String", body.DECV, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T115",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("DENO", "Array", this.extractArray(body.DENO), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T505",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("DEPO", "String", body.DEPO);
    this.setProperty("DESC", "String", body.DESC);
    this.setProperty("DESY", "String", body.DESY);
    // this.setProperty("DIFFU","String",body.DIFFU ? "oui" : "non" };
    this.setProperty("DIMS", "String", body.DIMS);
    this.setProperty("DMAJ", "String", body.DMAJ, { generated: true });
    this.setProperty("DMIS", "String", body.DMIS, { generated: true });

    this.setProperty("DOMN", "Array", this.extractArray(body.DOMN), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T51",
      thesaurus_separator: /[(,);#]/g,
      required: true
    });
    this.setProperty("DREP", "String", body.DREP);
    this.setProperty("ECOL", "Array", this.extractArray(body.ECOL), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T517",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("EPOQ", "Array", this.extractArray(body.EPOQ), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T93",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("ETAT", "Array", this.extractArray(body.ETAT));
    this.setProperty("EXPO", "String", body.EXPO);
    this.setProperty("GENE", "Array", this.extractArray(body.GENE), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T506",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("GEOHI", "Array", this.extractArray(body.GEOHI));
    this.setProperty("HIST", "String", body.HIST);
    this.setProperty("IMAGE", "String", body.IMAGE);
    this.setProperty(
      "IMG",
      "Array",
      this.extractIMGNames(body.REFIM).map(
        e => `joconde/${this.REF.value}/${e}`
      )
    );
    this.setProperty("INSC", "Array", this.extractArray(body.INSC), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T520",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("INV", "String", body.INV, { required: true });
    this.setProperty("LABEL", "String", body.LABEL, { generated: true });
    this.setProperty("LABO", "String", body.LABO);
    this.setProperty("LARC", "String", body.LARC);
    this.setProperty("LIEUX", "String", body.LIEUX, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T84",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("LOCA", "String", body.LOCA, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T515",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("LOCA2", "String", body.LOCA2);
    this.setProperty("LOCA3", "String", body.LOCA3);
    this.setProperty("MILL", "String", body.MILL);
    this.setProperty("MILU", "String", body.MILU);
    this.setProperty("MOSA", "String", body.MOSA);
    this.setProperty("MSGCOM", "String", body.MSGCOM);
    this.setProperty("MUSEO", "String", body.MUSEO);
    this.setProperty("NSDA", "String", body.NSDA);
    this.setProperty("ONOM", "Array", this.extractArray(body.ONOM));
    this.setProperty("PAUT", "String", body.PAUT);
    this.setProperty("PDAT", "String", body.PDAT);
    this.setProperty("PDEC", "String", body.PDEC);
    this.setProperty("PEOC", "Array", this.extractArray(body.PEOC), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("PERI", "Array", this.extractArray(body.PERI), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("PERU", "Array", this.extractArray(body.PERU), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("PHOT", "String", body.PHOT);
    this.setProperty("PINS", "String", body.PINS);
    this.setProperty("PLIEUX", "String", body.PLIEUX);
    this.setProperty("PREP", "Array", this.extractArray(body.PREP));
    this.setProperty("PUTI", "String", body.PUTI);
    this.setProperty("RANG", "String", body.RANG);
    this.setProperty("REDA", "Array", this.extractArray(body.REDA));
    this.setProperty("REFIM", "String", body.REFIM);
    this.setProperty("REPR", "String", body.REPR, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T523",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("RETIF", "String", body.RETIF);
    this.setProperty("SREP", "Array", this.extractArray(body.SREP), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T523",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("STAT", "Array", this.extractArray(body.STAT), {
      required: true
    });
    this.setProperty("TECH", "Array", this.extractArray(body.TECH), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T516",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("TICO", "String", body.TICO);
    this.setProperty("TITR", "String", body.TITR);
    this.setProperty("TOUT", "String", body.TOUT);
    this.setProperty("UTIL", "Array", this.extractArray(body.UTIL), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T86",
      thesaurus_separator: /[(,);#]/g
    });
    this.setProperty("VIDEO", "String", body.VIDEO);
    this.setProperty("WWW", "Array", this.extractUrls(body.WWW));
    this.setProperty("LVID", "String", body.LVID);

    // This field is in the old format but its not imported in the one. But you need to track it in order to import joconde properly
    //  For Ajout piloté,  sometime the file is broken and a new line doesn mean a new filed. To check all fileld and line, I'm checkiong if I know the field. If I dont know it,n its not a field.
    // So I need to declare it if I want it te be considered as a field
    this.setProperty("REFMIS", "String", "");

    // Check required fields
    for (let property in this) {
      if (
        this.hasOwnProperty(property) &&
        property.indexOf("_") !== 0 &&
        typeof this[property] === "object"
      ) {
        if (this[property].required && !this[property].value) {
          this._errors.push(`Le champ ${property} ne doit pas être vide`);
        }
      }
    }
  }

  extractIMGNames = function(str) {
    if (!str) {
      return [];
    }
    let tempImages = str.split(";");
    return tempImages.map(e => {
      let name = e.split(",")[0];
      return Joconde.convertLongNameToShort(name);
    });
  };
}

Joconde.convertLongNameToShort = function(str) {
  return str
    .substring(str.lastIndexOf("/") + 1)
    .replace(/_[a-zA-Z0-9]\./g, ".")
    .replace(/^.*[\\\/]/g, "")
    .replace(/[a-zA-Z0-9]*_/g, "")
    .toLowerCase();
};

Joconde.has = function(key) {
  const arr = [
    "REF",
    "ADPT",
    "APTN",
    "ATTR",
    "AUTR",
    "BIBL",
    "APPL",
    "COMM",
    "CONTACT",
    "COOR",
    "COPY",
    "DACQ",
    "DATA",
    "DATION",
    "DDPT",
    "DECV",
    "DENO",
    "DEPO",
    "DESC",
    "DESY",
    "DIMS",
    "DMAJ",
    "DMIS",
    "DOMN",
    "DREP",
    "ECOL",
    "EPOQ",
    "ETAT",
    "EXPO",
    "GENE",
    "GEOHI",
    "HIST",
    "IMAGE",
    "IMG",
    "INSC",
    "INV",
    "LABEL",
    "LABO",
    "LARC",
    "LIEUX",
    "LOCA",
    "LOCA2",
    "LOCA3",
    "MILL",
    "MILU",
    "MOSA",
    "MSGCOM",
    "MUSEO",
    "NSDA",
    "ONOM",
    "PAUT",
    "PDAT",
    "PDEC",
    "PEOC",
    "PERI",
    "PERU",
    "PHOT",
    "PINS",
    "PLIEUX",
    "PREP",
    "PUTI",
    "RANG",
    "REDA",
    "REFIM",
    "REPR",
    "RETIF",
    "SREP",
    "STAT",
    "TECH",
    "TICO",
    "TITR",
    "TOUT",
    "UTIL",
    "VIDEO",
    "WWW",
    "LVID",
    "REFMIS"
  ];
  return arr.includes(key);
};
