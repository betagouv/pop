import React from 'react';
import { Container } from 'reactstrap';
import Importer from './importer';

import Merimee from '../../entities/merimee';
import Palissy from '../../entities/palissy';

import utils from './utils';

export default class Import extends React.Component {
    render() {
        return (
            <Container className='import'>
                <Importer
                    collection="inventaire"
                    parseFiles={parseFiles}
                />
            </Container >
        );
    }
}

function parseFiles(files, encoding) {
    return new Promise(async (resolve, reject) => {


        console.log('Got files', files)

        var xmlFiles = files.filter(file => file.name.includes('.xml'));
        if (!xmlFiles.length) {
            reject('Aucun fichier xml detecté');
            return;
        }
        var objectFile = files.find(file => file.name.includes('AllEntities.xml'));
        if (objectFile) {
            console.log('PARSE GERTRUDE')
            const importedNotices = await (ParseGertrude(objectFile, encoding));
            resolve({ importedNotices, fileName: objectFile.name })
        } else {
            const importedNotices = await (ParseRenabl(xmlFiles, encoding));
            resolve({ importedNotices, fileName: xmlFiles.map(e => e.name).join('\n') })
        }
    })
}


function ParseGertrude(objectFile, encoding) {
    return new Promise(async (resolve, reject) => {
        const notices = [];
        const xmlDoc = await (utils.readXML(objectFile, encoding));
        var tags = xmlDoc.childNodes[0].childNodes
        for (var i = 0; i < tags.length; i++) {
            switch (tags[i].nodeName) {
                case 'com.atolcd.gertrude.model.illustration.Illustration':
                    break;
                case 'com.atolcd.gertrude.model.dossier.oeuvre.objet.DossierOeuvreObjet':
                    notices.push(XmlToPalissy(tags[i]));
                    break;
                case 'com.atolcd.gertrude.model.dossier.oeuvre.objet.DossierOeuvreArchitecture':
                    notices.push(XmlToMerimee(tags[i]));
                    break;
            }
        }
        console.log(notices)
        resolve(notices)
    })
}

function ParseRenabl(xmlFiles, encoding) {
    return new Promise(async (resolve, reject) => {
        const notices = [];
        for (var j = 0; j < xmlFiles.length; j++) {
            const xmlDoc = await (utils.readXML(xmlFiles[j], encoding));
            var tags = xmlDoc.childNodes[0].childNodes;
            for (var i = 0; i < tags.length; i++) {
                if (tags[i].nodeName === 'MERIMEE') {
                    const obj = RenablXMLToObj(tags[i]);
                    notices.push(new Merimee(obj));
                } else if (tags[i].nodeName === 'PALISSY') {
                    const obj = RenablXMLToObj(tags[i]);
                    notices.push(new Palissy(obj));
                } else {
                    console.log(tags[i].nodeName);
                }
            }
        }
        resolve(notices)
    })
}


function RenablXMLToObj(node) {
    const obj = {};
    obj.REF = node.getAttribute('REF')
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeName !== '#text') {
            obj[node.childNodes[i].nodeName] = node.childNodes[i].textContent;
        }
    }
    return obj;
}







function findValue(xmlDoc, path) {
    const paths = path.split(',');
    let currentNode = xmlDoc;
    for (var i = 0; i < paths.length; i++) {
        currentNode = currentNode.getElementsByTagName(paths[i])[0];
        if (!currentNode) {
            return '';
        }
    }
    return currentNode.textContent;
}


function findValues(xmlDoc, path) {
    if (!path) { return ''; }

    const paths = path.split(',');
    let currentNode = xmlDoc;
    for (var i = 0; i < paths.length; i++) {

        if (!currentNode) { console.log('cant find paths[i]', paths); return ''; }

        if (paths.length === i + 1) {
            const nodes = currentNode.getElementsByTagName(paths[i]);
            const arr = [];
            for (var j = 0; j < nodes.length; j++) {
                arr.push(nodes[j].innerHTML);
            }
            return arr;
        } else {
            currentNode = currentNode.getElementsByTagName(paths[i])[0];
        }
    }
    return currentNode.innerHTML;
}


function XmlToMerimee(xml) {
    const obj = {};
    obj.REF = findValue(xml, 'etude,reference,reference');
    obj.PRODUCTEUR = findValue(xml, '');
    obj.TOUT = findValue(xml, '');
    obj.ACTU = findValue(xml, '');
    obj.ADRS = findValue(xml, 'localisation,localisations,com.atolcd.gertrude.model.localisation.Localisation,adresses,typeVoie,libelle') + ' ' + findValue(xml, 'localisation,localisations,com.atolcd.gertrude.model.localisation.Localisation,adresses,nom,libelle');
    obj.AFFE = findValue(xml, '');
    obj.AIRE = findValue(xml, 'localisation,aireEtudeCanton,aireEtude,libelle');
    obj.APPL = findValue(xml, '');
    obj.APRO = findValue(xml, '');
    obj.ARCHEO = findValue(xml, 'etude,referencePatriarche');
    obj.AUTP = findValue(xml, '');
    obj.AUTR = findValue(xml, '');
    obj.CADA = findValue(xml, '');
    obj.CANT = findValue(xml, 'localisation,aireEtudeCanton,canton,libelle');
    obj.COLL = findValue(xml, '');
    obj.COM = findValue(xml, 'localisationPrincipale,commune,libelle');
    obj.COOR = findValue(xml, '');
    obj.COORM = findValue(xml, '');
    obj.COPY = findValues(xml, 'etude,copyrights,libelle');
    obj.COUV = findValue(xml, '');
    obj.DATE = findValue(xml, 'historique,dates,com.atolcd.gertrude.model.historique.DateHistorique,date');
    obj.DBOR = findValue(xml, 'etude,datesBordereau,int');
    obj.DOMN = findValue(xml, '');
    obj.DENO = findValues(xml, 'designation,denominations,libelle');
    obj.DENQ = findValue(xml, 'etude,dateEnquete');
    obj.DEPL = findValue(xml, '');
    obj.DESC = findValue(xml, '');
    obj.DIMS = findValue(xml, '');
    obj.DMAJ = findValue(xml, '');
    obj.DMIS = findValue(xml, '');
    obj.DOSS = findValue(xml, 'etude,naturesDossier,libelle');
    obj.DPRO = findValue(xml, '');
    obj.DPT = findValue(xml, 'localisationPrincipale,departement,libelle');
    obj.EDIF = findValue(xml, 'com.atolcd.gertrude.model.lien.LienEdifice');
    obj.ELEV = findValue(xml, '');
    obj.ENER = findValue(xml, '');
    obj.ESCA = findValue(xml, '');
    obj.ETAG = findValue(xml, '');
    obj.ETAT = findValue(xml, '');
    obj.ETUD = findValue(xml, 'etude,cadresEtude,com.atolcd.gertrude.model.dossier.cadreEtude.CadreEtude,type');
    obj.GENR = findValue(xml, '');
    obj.HIST = findValue(xml, '');
    obj.HYDR = findValue(xml, 'localisation,hydrographies,com.atolcd.gertrude.model.localisation.Hydrographie,precision,libelle') + ' ' + findValue(xml, 'localisation,hydrographies,com.atolcd.gertrude.model.localisation.Hydrographie,nom,libelle');
    obj.IMPL = findValue(xml, 'localisationPrincipale,milieuImplantation,libelle');
    obj.INSEE = findValue(xml, 'localisation,localisations,com.atolcd.gertrude.model.localisation.Localisation,commune,code');
    obj.INTE = findValue(xml, '');
    obj.JATT = findValues(xml, 'datations,com.atolcd.gertrude.model.historique.Datation,justifications,libelle');
    obj.JDAT = findValue(xml, 'historique,dates,com.atolcd.gertrude.model.historique.DateHistorique,justifications,com.atolcd.gertrude.model.thesaurus.ThesaurusField,libelle');
    obj.LBASE2 = findValue(xml, '');
    obj.LIEU = findValue(xml, 'localisation,localisations,com.atolcd.gertrude.model.localisation.Localisation,lieudits,com.atolcd.gertrude.model.localisation.LieuDit,nom,libelle');
    obj.LOCA = findValue(xml, '');
    obj.MFICH = findValue(xml, '');
    obj.MOSA = findValue(xml, '');
    obj.MHPP = findValue(xml, '');
    obj.MICR = findValue(xml, '');
    obj.MURS = findValue(xml, '');
    obj.NBOR = findValue(xml, '');
    obj.NOMS = findValue(xml, '');
    obj.OBS = findValue(xml, '');
    obj.PAFF = findValue(xml, '');
    obj.PART = findValue(xml, '');
    obj.PARN = findValues(xml, 'designation,partiesConstituantesNonEtudiees,libelle');
    obj.PDEN = findValue(xml, '');
    obj.PERS = findValue(xml, '');
    obj.PLAN = findValue(xml, '');
    obj.PLOC = findValue(xml, 'localisation,precisionsLocalisations');
    obj.PPRO = findValue(xml, '');
    obj.PREP = findValue(xml, '');
    obj.PROT = findValue(xml, '');
    obj.PSTA = findValue(xml, '');
    obj.REFE = findValue(xml, '');
    obj.REFO = findValue(xml, '');
    obj.REFP = findValue(xml, '');
    obj.REG = findValue(xml, 'localisationPrincipale,region,libelle');
    obj.REMA = findValue(xml, '');
    obj.REMP = findValue(xml, '');
    obj.RENV = findValue(xml, 'etude,numerosRenvoi');
    obj.REPR = findValue(xml, '');
    obj.RFPA = findValue(xml, '');
    obj.SCLD = findValue(xml, '');
    obj.SCLE = findValues(xml, 'datations,com.atolcd.gertrude.model.historique.Datation,periodes,libelle');
    obj.SCLX = findValue(xml, '');
    obj.SITE = findValue(xml, '');
    obj.STAT = findValue(xml, '');
    obj.TECH = findValue(xml, '');
    obj.TICO = findValue(xml, 'designation,titreCourant');
    obj.TOIT = findValue(xml, '');
    obj.TYPO = findValue(xml, '');
    obj.VERT = findValue(xml, '');
    obj.REFIM = findValue(xml, '');
    obj.IMG = findValue(xml, '');
    obj.VIDEO = findValue(xml, '');
    obj.DOSURL = findValue(xml, '');
    obj.DOSURLP = findValue(xml, '');
    obj.DOSADRS = findValue(xml, '');
    obj.LIENS = findValue(xml, '');
    obj.IMAGE = findValue(xml, '');
    obj.VISI = findValue(xml, '');
    obj.VOCA = findValue(xml, 'designation,vocables');
    obj.VOUT = findValue(xml, '');
    obj.WEB = findValue(xml, '');
    obj.ZONE = findValue(xml, '');
    obj.THEM = findValue(xml, '');
    obj.ACMH = findValue(xml, '');
    obj.ACURL = findValue(xml, '');
    obj.WADRS = findValue(xml, '');
    obj.WCOM = findValue(xml, '');
    obj.WRENV = findValue(xml, '');
    obj.REFM = findValue(xml, '');
    obj.CONTACT = findValue(xml, '');
    obj.IDAGR = findValue(xml, '');
    obj.LMDP = findValue(xml, '');
    obj.PINT = findValue(xml, '');
    obj.DLAB = findValue(xml, '');
    obj.CONTIENT_IMAGE = findValue(xml, '');
    return new Merimee(obj);
}


function XmlToPalissy(xml) {
    const obj = {};

    obj.PRODUCTEUR = findValue(xml, '');
    obj.CONTIENT_IMAGE = findValue(xml, '');
    obj.REF = findValue(xml, 'etude,reference,reference');
    obj.VIDEO = findValue(xml, '');
    obj.CONTACT = findValue(xml, '');
    obj.ACQU = findValue(xml, '');
    obj.ADRS = findValue(xml, 'localisation,localisations,com.atolcd.gertrude.model.localisation.Localisation,adresses');
    obj.ADRS2 = findValue(xml, '');
    obj.AFIG = findValue(xml, '');
    obj.AIRE = findValue(xml, 'localisation,aireEtudeCanton,aireEtude,libelle');
    obj.APPL = findValue(xml, '');
    obj.ATEL = findValue(xml, '');
    obj.AUTP = findValue(xml, '');
    obj.AUTR = findValue(xml, '');
    obj.BIBL = findValue(xml, '');
    obj.CANT = findValue(xml, 'localisation,aireEtudeCanton,canton,libelle');
    obj.CATE = findValue(xml, '');
    obj.COM = findValue(xml, 'localisationPrincipale,commune,libelle');
    obj.COM2 = findValue(xml, '');
    obj.CONTACT = findValue(xml, '');
    obj.COOR = findValue(xml, '');
    obj.COORM = findValue(xml, '');
    obj.COPY = findValues(xml, 'etude,copyrights,libelle');
    obj.DATE = findValue(xml, 'historique,dates,com.atolcd.gertrude.model.historique.DateHistorique,date');
    obj.DBOR = findValue(xml, 'etude,datesBordereau,int');
    obj.DENO = findValues(xml, 'designation,denominations,libelle');
    obj.DENQ = findValue(xml, 'etude,dateEnquete');
    obj.DEPL = findValue(xml, '');
    obj.DESC = findValue(xml, '');
    obj.DIMS = findValue(xml, '');
    obj.DMAJ = findValue(xml, '');
    obj.DMIS = findValue(xml, '');
    obj.DOMN = findValue(xml, '');
    obj.DOSADRS = findValue(xml, '');
    obj.DOSS = findValue(xml, 'etude,naturesDossier,libelle');
    obj.DOSURL = findValue(xml, '');
    obj.DOSURLP = findValue(xml, '');
    obj.DPRO = findValue(xml, '');
    obj.DPT = findValue(xml, 'localisationPrincipale,departement,libelle');
    obj.EDIF = findValue(xml, '');
    obj.EDIF2 = findValue(xml, '');
    obj.EMPL = findValue(xml, '');
    obj.EMPL2 = findValue(xml, '');
    obj.ETAT = findValue(xml, '');
    obj.ETUD = findValue(xml, 'etude,cadresEtude,com.atolcd.gertrude.model.dossier.cadreEtude.CadreEtude,type');
    obj.EXEC = findValue(xml, '');
    obj.EXPO = findValue(xml, '');
    obj.HIST = findValue(xml, '');
    obj.IDAGR = findValue(xml, '');
    obj.IMAGE = findValue(xml, '');
    obj.IMG = findValue(xml, '');
    obj.IMPL = findValue(xml, 'localisationPrincipale,milieuImplantation,libelle');
    obj.INSC = findValue(xml, '');
    obj.INSEE = findValue(xml, 'localisation,localisations,com.atolcd.gertrude.model.localisation.Localisation,commune,code');
    obj.INSEE2 = findValue(xml, '');
    obj.INTE = findValue(xml, '');
    obj.JDAT = findValue(xml, 'historique,dates,com.atolcd.gertrude.model.historique.DateHistorique,justifications,com.atolcd.gertrude.model.thesaurus.ThesaurusField,libelle');
    obj.LBASE2 = findValue(xml, '');
    obj.LIENS = findValue(xml, '');
    obj.LIEU = findValue(xml, 'localisation,localisations,com.atolcd.gertrude.model.localisation.Localisation,lieudits,com.atolcd.gertrude.model.localisation.LieuDit,nom,libelle');
    obj.LMDP = findValue(xml, '');
    obj.LOCA = findValue(xml, '');
    obj.MATR = findValue(xml, '');
    obj.MFICH = findValue(xml, '');
    obj.MICR = findValue(xml, '');
    obj.MOSA = findValue(xml, '');
    obj.NART = findValue(xml, '');
    obj.NINV = findValue(xml, '');
    obj.NOMS = findValue(xml, '');
    obj.NUMA = findValue(xml, '');
    obj.NUMP = findValue(xml, '');
    obj.OBS = findValue(xml, '');
    obj.ORIG = findValue(xml, '');
    obj.PAPP = findValue(xml, '');
    obj.PARN = findValue(xml, 'designation,partiesConstituantesNonEtudiees,com.atolcd.gertrude.model.thesaurus.ThesaurusField,libelle');
    obj.PART = findValue(xml, '');
    obj.PDEN = findValue(xml, '');
    obj.PDIM = findValue(xml, '');
    obj.PERS = findValue(xml, '');
    obj.PETA = findValue(xml, '');
    obj.PHOTO = findValue(xml, '');
    obj.PINS = findValue(xml, '');
    obj.PINT = findValue(xml, '');
    obj.PLOC = findValue(xml, 'localisation,precisionsLocalisations');
    obj.PPRO = findValue(xml, '');
    obj.PREP = findValue(xml, '');
    obj.PROT = findValue(xml, '');
    obj.REFA = findValue(xml, '');
    obj.REFE = findValue(xml, '');
    obj.REFM = findValue(xml, '');
    obj.REFP = findValue(xml, '');
    obj.REG = findValue(xml, 'localisationPrincipale,region,libelle');
    obj.RENP = findValue(xml, '');
    obj.RENV = findValue(xml, 'etude,numerosRenvoi');
    obj.REPR = findValue(xml, '');
    obj.SCLD = findValue(xml, '');
    obj.SCLE = findValues(xml, 'datations,com.atolcd.gertrude.model.historique.Datation,periodes,libelle');
    obj.SCLX = findValue(xml, '');
    obj.SOUR = findValue(xml, '');
    obj.STAD = findValue(xml, '');
    obj.STAT = findValue(xml, '');
    obj.STRU = findValue(xml, '');
    obj.THEM = findValue(xml, '');
    obj.TICO = findValue(xml, 'designation,titreCourant');
    obj.TITR = findValue(xml, '');
    obj.TOUT = findValue(xml, '');
    obj.VIDEO = findValue(xml, '');
    obj.VOLS = findValue(xml, '');
    obj.WADRS = findValue(xml, '');
    obj.WCOM = findValue(xml, '');
    obj.WEB = findValue(xml, '');
    obj.WRENV = findValue(xml, '');
    obj.ZONE = findValue(xml, '');

    return new Palissy(obj);
}



