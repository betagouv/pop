import Notice from "./notice";

export default class Merimee extends Notice {
  constructor(body) {
    super();
    this._type = "merimee";

    this.REF = {
      type: "String",
      value: (body.REF || "").trim(),
      required: true
    };
    this.PRODUCTEUR = { type: "String", value: body.PRODUCTEUR || "" };
    // this.POP_COORDINATES_POINT = { type: 'String', value: body.NOTE || '' };
    // this.POP_COORDINATES_POLYGON = { type: 'String', value: body.NOTE || '' };
    // this.POP_CONTIENT_GEOLOCALISATION = { type: 'String', value: body.NOTE || '' };
    // this.POP_DATE = { type: 'String', value: body.NOTE || '' };
    this.TOUT = { type: "String", value: body.TOUT || "" };
    this.ACTU = { type: "String", value: body.ACTU || "" };
    this.ADRS = { type: "String", value: body.ADRS || "" };
    this.AFFE = {
      type: "String",
      value: body.ADRS || "",
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T97"
    };
    this.AIRE = { type: "String", value: body.AIRE || "" };
    this.APPL = { type: "String", value: body.APPL || "" };
    this.APRO = {
      type: "Array",
      value: this.extractArray(body.APRO),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T98"
    };
    this.ARCHEO = { type: "String", value: body.ARCHEO || "" };
    this.AUTP = { type: "Array", value: this.extractArray(body.AUTP) };
    this.AUTR = { type: "Array", value: this.extractArray(body.AUTR) };
    this.CADA = { type: "Array", value: this.extractArray(body.CADA) };
    this.CANT = { type: "String", value: body.CANT || "" };
    this.COLL = { type: "Array", value: this.extractArray(body.COLL) };
    this.COM = { type: "String", value: body.COM || "" };
    this.COOR = { type: "String", value: body.COOR || "" };
    this.COORM = { type: "String", value: body.COORM || "" };
    this.COPY = {
      type: "Array",
      value: this.extractArray(body.COPY),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T21"
    };
    this.COUV = {
      type: "Array",
      value: this.extractArray(body.COUV),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T26"
    };
    this.DATE = { type: "Array", value: this.extractArray(body.DATE) };
    this.DBOR = { type: "String", value: body.DBOR || "" };
    this.DOMN = { type: "Array", value: this.extractArray(body.DOMN) };
    this.DENO = {
      type: "Array",
      value: this.extractArray(body.DENO),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T96"
    };
    this.DENQ = { type: "String", value: body.DENQ || "" };
    this.DEPL = {
      type: "String",
      value: body.DEPL || "",
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T14"
    };
    this.DESC = { type: "String", value: body.DESC || "" };
    this.DIMS = {
      type: "String",
      value: body.DIMS || "",
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T11"
    };
    this.DMAJ = { type: "String", value: body.DMAJ || "", generated: true };
    this.DMIS = { type: "String", value: body.DMIS || "", generated: true };
    this.DOSS = {
      type: "String",
      value: body.DOSS || "",
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T13"
    };
    this.DPRO = { type: "String", value: body.DPRO || "" };
    this.DPT = { type: "String", value: body.DPT || "" };
    this.EDIF = { type: "String", value: body.EDIF || "" };
    this.ELEV = {
      type: "Array",
      value: this.extractArray(body.ELEV),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T25"
    };
    this.ENER = {
      type: "Array",
      value: this.extractArray(body.ENER),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T27"
    };
    this.ESCA = {
      type: "Array",
      value: this.extractArray(body.ESCA),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T29"
    };
    this.ETAG = {
      type: "Array",
      value: this.extractArray(body.ETAG),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T23"
    };
    this.ETAT = {
      type: "Array",
      value: this.extractArray(body.ETAT),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T30"
    };
    this.ETUD = {
      type: "Array",
      value: this.extractArray(body.ETUD),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T68"
    };
    this.GENR = {
      type: "Array",
      value: this.extractArray(body.GENR),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T197"
    };
    this.HIST = { type: "String", value: body.HIST || "" };
    this.HYDR = { type: "String", value: body.HYDR || "" };
    this.IMPL = {
      type: "Array",
      value: this.extractArray(body.IMPL),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T12"
    };
    this.INSEE = { type: "String", value: body.INSEE || "" };
    this.INTE = {
      type: "Array",
      value: this.extractArray(body.INTE),
      thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T33"
    };
    this.JATT = { type: "Array", value: this.extractArray(body.JATT) };
    this.JDAT = { type: "Array", value: this.extractArray(body.JDAT) };
    this.LBASE2 = { type: "String", value: body.LBASE2 || "" };
    this.LIEU = { type: "String", value: body.LIEU || "" };
    this.LOCA = { type: "String", value: body.LOCA || "" };
    this.MFICH = { type: "String", value: body.MFICH || "" };
    this.MOSA = { type: "String", value: body.MOSA || "" };
    this.MHPP = { type: "String", value: body.MHPP || "" };
    this.MICR = { type: "String", value: body.MICR || "" };
    this.MURS = { type: "Array", value: this.extractArray(body.MURS) };
    this.NBOR = { type: "String", value: body.NBOR || "" };
    this.NOMS = { type: "Array", value: this.extractArray(body.NOMS) };
    this.OBS = { type: "String", value: body.OBS || "" };
    this.PAFF = { type: "String", value: body.PAFF || "" };
    this.PART = { type: "Array", value: this.extractArray(body.PART) };
    this.PARN = { type: "Array", value: this.extractArray(body.PARN) };
    this.PDEN = { type: "String", value: body.PDEN || "" };
    this.PERS = { type: "Array", value: this.extractArray(body.PERS) };
    this.PLAN = { type: "String", value: body.PLAN || "" };
    this.PLOC = { type: "String", value: body.PLOC || "" };
    this.PPRO = { type: "String", value: body.PPRO || "" };
    this.PREP = { type: "Array", value: this.extractArray(body.PREP) };
    this.PROT = { type: "Array", value: this.extractArray(body.PROT) };
    this.PSTA = { type: "String", value: body.PSTA || "" };
    this.REFE = { type: "Array", value: this.extractArray(body.REFE) };
    this.REFO = { type: "Array", value: this.extractArray(body.REFO) };
    this.REFP = { type: "Array", value: this.extractArray(body.REFP) };
    this.REG = { type: "String", value: body.REG || "" };
    this.REMA = { type: "String", value: body.REMA || "" };
    this.REMP = { type: "String", value: body.REMP || "" };
    this.RENV = { type: "Array", value: this.extractArray(body.RENV) };
    this.REPR = { type: "String", value: body.REPR || "" };
    this.RFPA = { type: "String", value: body.RFPA || "" };
    this.SCLD = { type: "Array", value: this.extractArray(body.SCLD) };
    this.SCLE = { type: "Array", value: this.extractArray(body.SCLE) };
    this.SCLX = { type: "Array", value: this.extractArray(body.SCLX) };
    this.SITE = { type: "String", value: body.SITE || "" };
    this.STAT = { type: "String", value: body.STAT || "" };
    this.TECH = { type: "Array", value: this.extractArray(body.TECH) };
    this.TICO = { type: "String", value: this.stripHTML(body.TICO) };
    this.TOIT = { type: "Array", value: this.extractArray(body.TOIT) };
    this.TYPO = { type: "String", value: body.TYPO || "" };
    this.VERT = { type: "String", value: body.VERT || "" };
    this.REFIM = { type: "String", value: body.REFIM || "" };
    this.IMG = { type: "String", value: body.IMG || "" };
    this.VIDEO = { type: "String", value: body.VIDEO || "" };
    this.DOSURL = { type: "String", value: body.DOSURL || "" };
    this.DOSADRS = { type: "String", value: body.DOSADRS || "" };
    this.LIENS = { type: "Array", value: this.extractArray(body.SCLIENSLE) };
    this.IMAGE = { type: "String", value: body.IMAGE || "" };
    this.VISI = { type: "Array", value: this.extractArray(body.VISI) };
    this.VOCA = { type: "String", value: body.VOCA || "" };
    this.VOUT = { type: "String", value: body.VOUT || "" };
    this.WEB = { type: "String", value: body.WEB || "" };
    this.ZONE = { type: "String", value: body.ZONE || "" };
    this.THEM = { type: "String", value: body.THEM || "" };
    this.ACMH = { type: "String", value: body.ACMH || "" };
    this.ACURL = { type: "String", value: body.ACURL || "" };
    this.WADRS = { type: "String", value: body.WADRS || "" };
    this.WCOM = { type: "String", value: body.WCOM || "" };
    this.WRENV = { type: "String", value: body.WRENV || "" };
    this.REFM = { type: "String", value: body.REFM || "" };
    this.CONTACT = { type: "String", value: body.CONTACT || "" };
    this.IDAGR = { type: "String", value: body.IDAGR || "" };
    this.LMDP = { type: "String", value: body.LMDP || "" };
    this.PINT = { type: "String", value: body.PINT || "" };
    this.DLAB = { type: "String", value: body.DLAB || "" };
    this.CONTIENT_IMAGE = {
      type: "String",
      value: this.IMG.value.length > 0 ? "oui" : "non"
    };

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
