import Notice from './notice'

export default class Memoire extends Notice {
    constructor(body) {
        super();
        this._type = 'memoire';
        this.REF = { type: 'String', value: (body.REF || '').trim(), required: true };
        this.ACC = { type: 'String', value: body.ACC || '' };
        this.ACQU = { type: 'String', value: body.ACQU || '' };
        this.ADPHOT = { type: 'String', value: body.ADPHOT || '' };
        this.ADRESSE = { type: 'String', value: body.ADRESSE || '' };
        this.ADRS = { type: 'String', value: body.ADRS || '' };
        this.AIRE = { type: 'String', value: body.AIRE || '' };
        this.ANUMOR = { type: 'String', value: body.ANUMOR || '' };
        this.ANUMP = { type: 'String', value: body.ANUMP || '' };
        this.ANUMTI = { type: 'String', value: body.ANUMTI || '' };
        this.AUTG = { type: 'String', value: body.AUTG || '' };
        this.AUTOEU = { type: 'String', value: body.AUTOEU || '' };
        this.AUTOR = { type: 'String', value: body.AUTOR || '' };
        this.AUTP = { type: 'String', value: body.AUTP || '' };
        this.AUTTI = { type: 'String', value: body.AUTTI || '' };
        this.CHRONO = { type: 'String', value: body.CHRONO || '' };
        this.COM = { type: 'String', value: body.COM || '' };
        this.CONTACT = { type: 'String', value: body.CONTACT || '' };
        this.COPY = { type: 'String', value: body.COPY || '' };
        this.COSTUME = { type: 'String', value: body.COSTUME || '' };
        this.COTECOR = { type: 'String', value: body.COTECOR || '' };
        this.COTECP = { type: 'String', value: body.COTECP || '' };
        this.COTECTI = { type: 'String', value: body.COTECTI || '' };
        this.COULEUR = { type: 'String', value: body.COULEUR || '' };
        this.DATD = { type: 'String', value: body.DATD || '' };
        this.DATG = { type: 'String', value: body.DATG || '' };
        this.DATIMM = { type: 'String', value: body.DATIMM || '' };
        this.DATOEU = { type: 'String', value: body.DATOEU || '' };
        this.DATOR = { type: 'String', value: body.DATOR || '' };
        this.DATPV = { type: 'String', value: body.DATPV || '' };
        this.DATTI = { type: 'String', value: body.DATTI || '' };
        this.DIFF = { type: 'String', value: body.DIFF || '' };
        this.DMAJ = { type: 'String', value: body.DMAJ || '', generated: true };
        this.DMIS = { type: 'String', value: body.DMIS || '', generated: true };
        this.DOM = { type: 'String', value: body.DOM || '' };
        this.DPT = { type: 'String', value: body.DPT || '' };
        this.ECH = { type: 'String', value: body.ECH || '' };
        this.EDIARCH = { type: 'String', value: body.EDIARCH || '' };
        this.EDIF = { type: 'String', value: body.EDIF || '' };
        this.EMET = { type: 'String', value: body.EMET || '' };
        this.FORMAT = { type: 'String', value: body.FORMAT || '' };
        this.FORMATOR = { type: 'String', value: body.FORMATOR || '' };
        this.FORMATTI = { type: 'String', value: body.FORMATTI || '' };
        this.IDPROD = { type: 'String', value: body.IDPROD || '' };
        this.IMG = { type: 'String', value: this.extractImage(body) };
        this.INSEE = { type: 'String', value: body.INSEE || '' };
        this.JDATPV = { type: 'String', value: body.JDATPV || '' };
        this.LAUTP = { type: 'String', value: body.LAUTP || '' };
        this.LBASE = { type: 'String', value: body.LBASE || '' };
        this.LBASE2 = { type: 'String', value: body.LBASE2 || '' };
        this.LEG = { type: 'String', value: body.LEG || '' };
        this.LEG2 = { type: 'String', value: body.LEG2 || '' };
        this.LIB = { type: 'String', value: body.LIB || '' };
        this.LIENS = { type: 'String', value: body.LIENS || '' };
        this.LIEU = { type: 'String', value: body.LIEU || '' };
        this.LIEUCOR = { type: 'String', value: body.LIEUCOR || '' };
        this.LIEUCP = { type: 'String', value: body.LIEUCP || '' };
        this.LIEUCTI = { type: 'String', value: body.LIEUCTI || '' };
        this.LIEUORIG = { type: 'String', value: body.LIEUORIG || '' };
        this.LOCA = { type: 'String', value: body.LOCA || '' };
        this.MARQ = { type: 'String', value: body.MARQ || '' };
        this.MCGEO = { type: 'String', value: body.MCGEO || '' };
        this.MCL = { type: 'String', value: body.MCL || '' };
        this.MCPER = { type: 'String', value: body.MCPER || '' };
        this.MENTIONS = { type: 'String', value: body.MENTIONS || '' };
        this.MENTOR = { type: 'String', value: body.MENTOR || '' };
        this.MENTTI = { type: 'String', value: body.MENTTI || '' };
        this.MOSA = { type: 'String', value: body.MOSA || '' };
        this.NUM = { type: 'String', value: body.NUM || '' };
        this.NUMAUTP = { type: 'String', value: body.NUMAUTP || '' };
        this.NUMCAF = { type: 'String', value: body.NUMCAF || '' };
        this.NUMCD = { type: 'String', value: body.NUMCD || '' };
        this.NUMF = { type: 'String', value: body.NUMF || '' };
        this.NUMI = { type: 'String', value: body.NUMI || '' };
        this.NUMOP = { type: 'String', value: body.NUMOP || '' };
        this.NUMOR = { type: 'String', value: body.NUMOR || '' };
        this.NUMP = { type: 'String', value: body.NUMP || '' };
        this.NUMSITE = { type: 'String', value: body.NUMSITE || '' };
        this.NUMTI = { type: 'String', value: body.NUMTI || '' };
        this.NVD = { type: 'String', value: body.NVD || '' };
        this.OBJT = { type: 'String', value: body.OBJT || '' };
        this.OBS = { type: 'String', value: body.OBS || '' };
        this.OBSOR = { type: 'String', value: body.OBSOR || '' };
        this.OBSTI = { type: 'String', value: body.OBSTI || '' };
        this.PAYS = { type: 'String', value: body.PAYS || '' };
        this.PRECOR = { type: 'String', value: body.PRECOR || '' };
        this.PUBLI = { type: 'String', value: body.PUBLI || '' };
        this.REFIM = { type: 'String', value: body.REFIM || '' };
        this.REFIMG = { type: 'String', value: body.REFIMG || '' };
        this.REG = { type: 'String', value: body.REG || '' };
        this.RENV = { type: 'String', value: body.RENV || '' };
        this.ROLE = { type: 'String', value: body.ROLE || '' };
        this.SCLE = { type: 'String', value: body.SCLE || '' };
        this.SENS = { type: 'String', value: body.SENS || '' };
        this.SERIE = { type: 'String', value: body.SERIE || '' };
        this.SITE = { type: 'String', value: body.SITE || '' };
        this.STRUCT = { type: 'String', value: body.STRUCT || '' };
        this.SUJET = { type: 'String', value: body.SUJET || '' };
        this.SUP = { type: 'String', value: body.SUP || '' };
        this.TECH = { type: 'String', value: body.TECH || '' };
        this.TECHOR = { type: 'String', value: body.TECHOR || '' };
        this.TECHTI = { type: 'String', value: body.TECHTI || '' };
        this.THEATRE = { type: 'String', value: body.THEATRE || '' };
        this.TICO = { type: 'String', value: body.TICO || '' };
        this.TIREDE = { type: 'String', value: body.TIREDE || '' };
        this.TITRE = { type: 'String', value: body.TITRE || '' };
        this.TOILE = { type: 'String', value: body.TOILE || '' };
        this.TOUT = { type: 'String', value: body.TOUT || '' };
        this.TYP = { type: 'String', value: body.TYP || '' };
        this.TYPDOC = { type: 'String', value: body.TYPDOC || '' };
        this.TYPEIMG = { type: 'String', value: body.TYPEIMG || '' };
        this.TYPSUPP = { type: 'String', value: body.TYPSUPP || '' };
        this.VIDEO = { type: 'String', value: body.VIDEO || '' };
        this.VUECD = { type: 'String', value: body.VUECD || '' };
        this.WCOM = { type: 'String', value: body.WCOM || '' };
        this.WEB = { type: 'String', value: body.WEB || '' };

        //Check required fields
        for (var property in this) {
            if (this.hasOwnProperty(property) && property.indexOf('_') !== 0 && typeof (this[property]) === 'object') {
                if (this[property].required && !this[property].value) {
                    this._errors.push(`Le champs ${property} ne doit pas être vide`)
                }
            }
        }
    }

    extractImage(body) {
        const e = body.IMG || body.NOMSN || ''
        return `memoire/${this.REF.value}/${e}`
    }

}


