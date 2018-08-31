import Notice from './notice'

export default class Joconde extends Notice {
    constructor(body) {
        super();
        this._type = 'joconde';

        this.REF = { type: 'String', value: (body.REF || '').trim(), required: true };
        this.ADPT = { type: 'Array', value: this.extractArray(body.ADPT) };
        this.APTN = { type: 'String', value: body.APTN || '' };
        this.ATTR = { type: 'String', value: body.ATTR || '' };
        this.AUTR = { type: 'String', value: body.AUTR || '', thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T513' };
        this.BIBL = { type: 'String', value: body.BIBL || '' };
        this.COMM = { type: 'String', value: body.COMM || '' };
        this.CONTACT = { type: 'String', value: this.extractEmail(body.CONTACT) };
        this.COOR = { type: 'String', value: body.COOR || '' };
        this.COPY = { type: 'String', value: body.COPY || '' };
        this.DACQ = { type: 'String', value: body.DACQ || '' };
        this.DATA = { type: 'String', value: body.DATA || '' };
        this.DATION = { type: 'String', value: body.DATION || '' };
        this.DDPT = { type: 'String', value: body.DDPT || '' };
        this.DECV = { type: 'String', value: body.DECV || '', thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T115' };
        this.DENO = { type: 'Array', value: this.extractArray(body.DENO), thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T505' };
        this.DEPO = { type: 'String', value: body.DEPO || '' };
        this.DESC = { type: 'String', value: body.DESC || '' };
        this.DESY = { type: 'String', value: body.DESY || '' };
        this.DIFFU = { type: 'String', value: body.DIFFU ? "oui" : "non" };
        this.DIMS = { type: 'String', value: body.DIMS || '' };
        this.DMAJ = { type: 'String', value: body.DMAJ || '', generated: true };
        this.DMIS = { type: 'String', value: body.DMIS || '', generated: true };
        this.DOMN = { type: 'Array', value: this.extractArray(body.DOMN), required: true, thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T51' };
        this.DREP = { type: 'String', value: body.DREP || '' };
        this.ECOL = { type: 'Array', value: this.extractArray(body.ECOL), thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T517' };
        this.EPOQ = { type: 'Array', value: this.extractArray(body.EPOQ), thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T93' };
        this.ETAT = { type: 'Array', value: this.extractArray(body.ETAT) };
        this.EXPO = { type: 'String', value: body.EXPO || '' };
        this.GENE = { type: 'Array', value: this.extractArray(body.GENE), thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T506' };
        this.GEOHI = { type: 'Array', value: this.extractArray(body.GEOHI) };
        this.HIST = { type: 'String', value: body.HIST || '' };
        this.IMAGE = { type: 'String', value: body.IMAGE || '' };
        this.IMG = { type: 'Array', value: this.extractIMGNames(body.REFIM).map((e => `joconde/${this.REF.value}/${e}`)) };
        this.INSC = { type: 'Array', value: this.extractArray(body.INSC), thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T520' };
        this.INV = { type: 'String', value: body.INV || '', required: true };
        this.LABEL = { type: 'String', value: body.LABEL || '', generated: true };
        this.LABO = { type: 'String', value: body.LABO || '' };
        this.LARC = { type: 'String', value: body.LARC || '' };
        this.LIEUX = { type: 'String', value: body.LIEUX || '', thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T84' };
        this.LOCA = { type: 'String', value: body.LOCA || '', thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T515' };
        this.LOCA2 = { type: 'String', value: body.LOCA2 || '' };
        this.LOCA3 = { type: 'String', value: body.LOCA3 || '' };
        this.MILL = { type: 'String', value: body.MILL || '' };
        this.MILU = { type: 'String', value: body.MILU || '' };
        this.MOSA = { type: 'String', value: body.MOSA || '' };
        this.MSGCOM = { type: 'String', value: body.MSGCOM || '' };
        this.MUSEO = { type: 'String', value: body.MUSEO || '' };
        this.NSDA = { type: 'String', value: body.NSDA || '' };
        this.ONOM = { type: 'Array', value: this.extractArray(body.ONOM) };
        this.PAUT = { type: 'String', value: body.PAUT || '' };
        this.PDAT = { type: 'String', value: body.PDAT || '' };
        this.PDEC = { type: 'String', value: body.PDEC || '' };
        this.PEOC = { type: 'Array', value: this.extractArray(body.PEOC), thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521" };
        this.PERI = { type: 'Array', value: this.extractArray(body.PERI), thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521" };
        this.PERU = { type: 'Array', value: this.extractArray(body.PERU), thesaurus: "http://data.culture.fr/thesaurus/resource/ark:/67717/T521" };
        this.PHOT = { type: 'String', value: body.PHOT || '' };
        this.PINS = { type: 'String', value: body.PINS || '' };
        this.PLIEUX = { type: 'String', value: body.PLIEUX || '' };
        this.PREP = { type: 'Array', value: this.extractArray(body.PREP) };
        this.PUTI = { type: 'String', value: body.PUTI || '' };
        this.RANG = { type: 'String', value: body.RANG || '' };
        this.REDA = { type: 'Array', value: this.extractArray(body.REDA) };
        this.REFIM = { type: 'String', value: body.REFIM || '' };
        this.REPR = { type: 'String', value: body.REPR || '', thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T523' };
        this.RETIF = { type: 'String', value: body.RETIF || '' };
        this.SREP = { type: 'Array', value: this.extractArray(body.SREP), thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T523' };
        this.STAT = { type: 'Array', value: this.extractArray(body.STAT), required: true };
        this.TECH = { type: 'Array', value: this.extractArray(body.TECH), thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T516' };
        this.TICO = { type: 'String', value: body.TICO || '' };
        this.TITR = { type: 'String', value: body.TITR || '' };
        this.TOUT = { type: 'String', value: body.TOUT || '' };
        this.UTIL = { type: 'Array', value: this.extractArray(body.UTIL), thesaurus: 'http://data.culture.fr/thesaurus/resource/ark:/67717/T86' };
        this.VIDEO = { type: 'String', value: body.VIDEO || '' };
        this.WWW = { type: 'Array', value: this.extractUrls(body.WWW) };
        this.LVID = { type: 'String', value: body.LVID || '' };
        this.CONTIENT_IMAGE = { type: 'String', value: this.IMG.value.length > 0 ? 'oui' : 'non' };


        // This field is in the old format but its not imported in the one. But you need to track it in order to import joconde properly
        //  For Ajout piloté,  sometime the file is broken and a new line doesn mean a new filed. To check all fileld and line, I'm checkiong if I know the field. If I dont know it,n its not a field.
        // So I need to declare it if I want it te be considered as a field
        this.REFMIS = { type: 'String', value: '' };


        //Check required fields
        for (var property in this) {
            if (this.hasOwnProperty(property) && property.indexOf('_') !== 0 && typeof (this[property]) === 'object') {
                if (this[property].required && !this[property].value) {
                    this._errors.push(`Le champs ${property} ne doit pas être vide`)
                }
            }
        }
    }

    extractIMGNames = function (str) {
        if (!str) { return []; }
        let tempImages = str.split(';');
        return tempImages.map(e => {
            let name = e.split(',')[0];
            return Joconde.convertLongNameToShort(name);
        })
    }

}

Joconde.convertLongNameToShort = function (str) {
    let name = str.substring(str.lastIndexOf('/') + 1);
    name = name.replace(/_[a-zA-Z0-9]\./g, '.');
    name = name.replace(/^.*[\\\/]/g, '');
    name = name.replace(/[a-zA-Z0-9]*_/g, '');
    name = name.toLowerCase();
    return name;
}
