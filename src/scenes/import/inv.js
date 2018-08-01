import React from 'react';
import { Container } from 'reactstrap';
import Importer from './importer';

import Merimee from '../../entities/merimee';
import Palissy from '../../entities/palissy';

const utils = require('./utils')

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

        var xmlFiles = files.filter(file => file.name.includes('.xml'));
        if (!xmlFiles.length) {
            reject('Aucun fichier xml detecté');
            return;
        }
        var objectFile = files.find(file => file.name.includes('AllEntities.xml'));
        if (objectFile) {
            const importedNotices = await (ParseGertrude(objectFile));
            resolve({ importedNotices, fileName: objectFile.name })
        } else {
            const importedNotices = await (ParseRenabl(xmlFiles));
            resolve({ importedNotices, fileName: xmlFiles.map(e => e.name).join('\n') })
        }
    })
}


function ParseGertrude() {
    return new Promise(async (resolve, reject) => {
        const notices = [];

        resolve(notices)
    })
}

function ParseRenabl(xmlFiles) {
    return new Promise(async (resolve, reject) => {
        const notices = [];
        for (var j = 0; j < xmlFiles.length; j++) {
            const xmlDoc = await (utils.readXML(xmlFiles[j]));
            var tags = xmlDoc.childNodes[0].childNodes;
            for (var i = 0; i < tags.length; i++) {
                if (tags[i].nodeName === 'MERIMEE') {
                    const obj = RenablXMLToMerimee(tags[i]);
                    notices.push(obj);
                } else {
                    console.log(tags[i].nodeName);
                }
            }
        }
        resolve(notices)
    })
}


function RenablXMLToMerimee(node) {
    const obj = {};
    obj.REF = node.getAttribute('REF')
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeName !== '#text') {
            obj[node.childNodes[i].nodeName] = node.childNodes[i].innerHTML;
        }
    }
    return new Merimee(obj);
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
    return currentNode.innerHTML;
}


function findValues(xmlDoc, path) {
    if (!path) { return ''; }

    const paths = path.split(',');
    let currentNode = xmlDoc;
    for (var i = 0; i < paths.length; i++) {
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


function XmlToPalissy(xml) {
    const obj = {};

    obj.PRODUCTEUR = findValue(xml, '');
    obj.CONTIENT_IMAGE = findValue(xml, '');
    obj.REF = findValue(xml, 'etude,reference,reference');
    obj.VIDEO = findValue(xml, '');
    obj.CONTACT = findValue(xml, '');
    obj.ACQU = findValue(xml, '');
    obj.ADRS = findValue(xml, '');
    obj.ADRS2 = findValue(xml, '');
    obj.AFIG = findValue(xml, '');
    obj.AIRE = findValue(xml, '');
    obj.APPL = findValue(xml, '');
    obj.ATEL = findValue(xml, '');
    obj.AUTP = findValue(xml, '');
    obj.AUTR = findValue(xml, '');
    obj.BIBL = findValue(xml, '');
    obj.CANT = findValue(xml, '');
    obj.CATE = findValue(xml, '');
    obj.COM = findValue(xml, '');
    obj.COM2 = findValue(xml, '');
    obj.CONTACT = findValue(xml, '');
    obj.COOR = findValue(xml, '');
    obj.COORM = findValue(xml, '');
    obj.COPY = findValues(xml, 'etude,copyrights,libelle');
    obj.DATE = findValue(xml, '');
    obj.DBOR = findValue(xml, 'etude,datesBordereau,int');
    obj.DENO = findValue(xml, '');
    obj.DENQ = findValue(xml, 'etude,dateEnquete');
    obj.DEPL = findValue(xml, '');
    obj.DESC = findValue(xml, '');
    obj.DIMS = findValue(xml, '');
    obj.DMAJ = findValue(xml, '');
    obj.DMIS = findValue(xml, '');
    obj.DOMN = findValue(xml, '');
    obj.DOSADRS = findValue(xml, '');
    obj.DOSS = findValue(xml, '');
    obj.DOSURL = findValue(xml, '');
    obj.DOSURLP = findValue(xml, '');
    obj.DPRO = findValue(xml, '');
    obj.DPT = findValue(xml, '');
    obj.EDIF = findValue(xml, '');
    obj.EDIF2 = findValue(xml, '');
    obj.EMPL = findValue(xml, '');
    obj.EMPL2 = findValue(xml, '');
    obj.ETAT = findValue(xml, '');
    obj.ETUD = findValue(xml, 'etude,cadresEtude');
    obj.EXEC = findValue(xml, '');
    obj.EXPO = findValue(xml, '');
    obj.HIST = findValue(xml, '');
    obj.IDAGR = findValue(xml, '');
    obj.IMAGE = findValue(xml, '');
    obj.IMG = findValue(xml, '');
    obj.IMPL = findValue(xml, '');
    obj.INSC = findValue(xml, '');
    obj.INSEE = findValue(xml, '');
    obj.INSEE2 = findValue(xml, '');
    obj.INTE = findValue(xml, '');
    obj.JDAT = findValue(xml, '');
    obj.LBASE2 = findValue(xml, '');
    obj.LIENS = findValue(xml, '');
    obj.LIEU = findValue(xml, '');
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
    obj.PARN = findValue(xml, '');
    obj.PART = findValue(xml, '');
    obj.PDEN = findValue(xml, '');
    obj.PDIM = findValue(xml, '');
    obj.PERS = findValue(xml, '');
    obj.PETA = findValue(xml, '');
    obj.PHOTO = findValue(xml, '');
    obj.PINS = findValue(xml, '');
    obj.PINT = findValue(xml, '');
    obj.PLOC = findValue(xml, '');
    obj.PPRO = findValue(xml, '');
    obj.PREP = findValue(xml, '');
    obj.PROT = findValue(xml, '');
    obj.REFA = findValue(xml, '');
    obj.REFE = findValue(xml, '');
    obj.REFM = findValue(xml, '');
    obj.REFP = findValue(xml, '');
    obj.REG = findValue(xml, '');
    obj.RENP = findValue(xml, '');
    obj.RENV = findValue(xml, 'etude,numerosRenvoi');
    obj.REPR = findValue(xml, '');
    obj.SCLD = findValue(xml, '');
    obj.SCLE = findValue(xml, '');
    obj.SCLX = findValue(xml, '');
    obj.SOUR = findValue(xml, '');
    obj.STAD = findValue(xml, '');
    obj.STAT = findValue(xml, '');
    obj.STRU = findValue(xml, '');
    obj.THEM = findValue(xml, '');
    obj.TICO = findValue(xml, '');
    obj.TITR = findValue(xml, '');
    obj.TOUT = findValue(xml, '');
    obj.VIDEO = findValue(xml, '');
    obj.VOLS = findValue(xml, '');
    obj.WADRS = findValue(xml, '');
    obj.WCOM = findValue(xml, '');
    obj.WEB = findValue(xml, '');
    obj.WRENV = findValue(xml, '');
    obj.ZONE = findValue(xml, '');

    return obj;
}



