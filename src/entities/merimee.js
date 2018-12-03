import Notice from "./notice";

export default class Merimee extends Notice {
  constructor(body) {
    super();
    this._type = "merimee";

    this.setProperty("REF", "String", (body.REF || "").trim(), {
      required: true
    });
    this.setProperty("TOUT", "String", body.TOUT);
    this.setProperty("ACTU", "String", body.ACTU);
    this.setProperty("ADRS", "String", body.ADRS);
    this.setProperty("AFFE", "String", body.AFFE, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T97"
    });
    this.setProperty("AIRE", "String", body.AIRE);
    this.setProperty("APPL", "String", body.APPL);
    this.setProperty("APRO", "Array", this.extractArray(body.APRO), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T98"
    });

    this.setProperty("POP_COORDONNEES", "Object", body.COORWGS84);
    this.setProperty("ARCHEO", "String", body.ARCHEO);
    this.setProperty("AUTP", "Array", this.extractArray(body.AUTP));
    this.setProperty("AUTR", "Array", this.extractArray(body.AUTR));
    this.setProperty("CADA", "Array", this.extractArray(body.CADA));
    this.setProperty("CANT", "String", body.CANT);
    this.setProperty("COLL", "Array", this.extractArray(body.COLL));
    this.setProperty("COM", "String", body.COM);
    this.setProperty("COOR", "String", body.COOR);
    this.setProperty("COORM", "String", body.COORM);
    this.setProperty("COPY", "Array", this.extractArray(body.COPY), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T21"
    });
    this.setProperty("COUV", "Array", this.extractArray(body.COUV), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T26"
    });
    this.setProperty("DATE", "Array", this.extractArray(body.DATE));
    this.setProperty("DBOR", "String", body.DBOR);
    this.setProperty("DOMN", "Array", this.extractArray(body.DOMN));
    this.setProperty("DENO", "Array", this.extractArray(body.DENO), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T96"
    });
    this.setProperty("DENQ", "String", body.DENQ);
    this.setProperty("DEPL", "String", body.DEPL, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T14"
    });
    this.setProperty("DESC", "String", body.DESC);
    this.setProperty("DIMS", "String", body.DIMS, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T11"
    });
    this.setProperty("DMAJ", "String", body.DMAJ, { generated: true });
    this.setProperty("DMIS", "String", body.DMIS, { generated: true });
    this.setProperty("DOSS", "String", body.DOSS, {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T13"
    });
    this.setProperty("DPRO", "String", body.DPRO);
    this.setProperty("DPT", "String", body.DPT);
    this.setProperty("EDIF", "String", body.EDIF);
    this.setProperty("ELEV", "Array", this.extractArray(body.ELEV), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T25"
    });
    this.setProperty("ENER", "Array", this.extractArray(body.ENER), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T27"
    });
    this.setProperty("ESCA", "Array", this.extractArray(body.ESCA), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T29"
    });
    this.setProperty("ETAG", "Array", this.extractArray(body.ETAG), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T23"
    });
    this.setProperty("ETAT", "Array", this.extractArray(body.ETAT), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T30"
    });
    this.setProperty("ETUD", "Array", this.extractArray(body.ETUD), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T68"
    });
    this.setProperty("GENR", "Array", this.extractArray(body.GENR), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T197"
    });
    this.setProperty("HIST", "String", body.HIST);
    this.setProperty("HYDR", "String", body.HYDR);
    this.setProperty("IMPL", "Array", this.extractArray(body.IMPL), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T12"
    });
    this.setProperty("INSEE", "String", body.INSEE);
    this.setProperty("INTE", "Array", this.extractArray(body.INTE), {
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T33"
    });
    this.setProperty("JATT", "Array", this.extractArray(body.JATT));
    this.setProperty("JDAT", "Array", this.extractArray(body.JDAT));
    this.setProperty("LBASE2", "String", body.LBASE2);
    this.setProperty("LIEU", "String", body.LIEU);
    this.setProperty("LOCA", "String", body.LOCA);
    this.setProperty("MFICH", "String", body.MFICH);
    this.setProperty("MOSA", "String", body.MOSA);
    this.setProperty("MHPP", "String", body.MHPP);
    this.setProperty("MICR", "String", body.MICR);
    this.setProperty("MURS", "Array", this.extractArray(body.MURS));
    this.setProperty("NBOR", "String", body.NBOR);
    this.setProperty("NOMS", "Array", this.extractArray(body.NOMS));
    this.setProperty("OBS", "String", body.OBS);
    this.setProperty("PAFF", "String", body.PAFF);
    this.setProperty("PART", "Array", this.extractArray(body.PART));
    this.setProperty("PARN", "Array", this.extractArray(body.PARN));
    this.setProperty("PDEN", "String", body.PDEN);
    this.setProperty("PERS", "Array", this.extractArray(body.PERS));
    this.setProperty("PLAN", "String", body.PLAN);
    this.setProperty("PLOC", "String", body.PLOC);
    this.setProperty("PPRO", "String", body.PPRO);
    this.setProperty("PREP", "Array", this.extractArray(body.PREP));
    this.setProperty("PROT", "Array", this.extractArray(body.PROT));
    this.setProperty("PSTA", "String", body.PSTA);
    this.setProperty("REFE", "Array", this.extractArray(body.REFE));
    this.setProperty("REFO", "Array", this.extractArray(body.REFO));
    this.setProperty("REFP", "Array", this.extractArray(body.REFP));
    this.setProperty("REG", "String", body.REG);
    this.setProperty("REMA", "String", body.REMA);
    this.setProperty("REMP", "String", body.REMP);
    this.setProperty("RENV", "Array", this.extractArray(body.RENV));
    this.setProperty("REPR", "String", body.REPR);
    this.setProperty("RFPA", "String", body.RFPA);
    this.setProperty("SCLD", "Array", this.extractArray(body.SCLD));
    this.setProperty("SCLE", "Array", this.extractArray(body.SCLE));
    this.setProperty("SCLX", "Array", this.extractArray(body.SCLX));
    this.setProperty("SITE", "String", body.SITE);
    this.setProperty("STAT", "String", body.STAT);
    this.setProperty("TECH", "Array", this.extractArray(body.TECH));
    this.setProperty("TICO", "String", this.stripHTML(body.TICO));
    this.setProperty("TOIT", "Array", this.extractArray(body.TOIT));
    this.setProperty("TYPO", "String", body.TYPO);
    this.setProperty("VERT", "String", body.VERT);
    this.setProperty("REFIM", "String", body.REFIM);
    this.setProperty("IMG", "String", body.IMG);
    this.setProperty("VIDEO", "String", body.VIDEO);
    this.setProperty("DOSURL", "String", body.DOSURL);
    this.setProperty("DOSADRS", "String", body.DOSADRS);
    this.setProperty("LIENS", "Array", this.extractArray(body.SCLIENSLE));
    this.setProperty("IMAGE", "String", body.IMAGE);
    this.setProperty("VISI", "Array", this.extractArray(body.VISI));
    this.setProperty("VOCA", "String", body.VOCA);
    this.setProperty("VOUT", "String", body.VOUT);
    this.setProperty("WEB", "String", body.WEB);
    this.setProperty("ZONE", "String", body.ZONE);
    this.setProperty("THEM", "String", body.THEM);
    this.setProperty("ACMH", "String", body.ACMH);
    this.setProperty("ACURL", "String", body.ACURL);
    this.setProperty("WADRS", "String", body.WADRS);
    this.setProperty("WCOM", "String", body.WCOM);
    this.setProperty("WRENV", "String", body.WRENV);
    this.setProperty("REFM", "String", body.REFM);
    this.setProperty("CONTACT", "String", body.CONTACT);
    this.setProperty("IDAGR", "String", body.IDAGR);
    this.setProperty("LMDP", "String", body.LMDP);
    this.setProperty("PINT", "String", body.PINT);
    this.setProperty("DLAB", "String", body.DLAB);


    //Check required fields
    for (var property in this) {
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
}
