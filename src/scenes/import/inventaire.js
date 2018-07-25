import React from 'react';
import { Container } from 'reactstrap';
import Importer from './importer';
import JocondeMapping from '../../mapping/joconde'

const utils = require('./utils')

export default class Import extends React.Component {
    render() {
        return (
            <Container className='import'>
                <Importer
                    collection="joconde"
                    parseFiles={parseFiles}
                    transform={() => { }}
                    mapping={JocondeMapping}
                />
            </Container >
        );
    }
}


function parseFiles(files, encoding) {
    return new Promise((resolve, reject) => {
        const JocondeFields = JocondeMapping.map(e => e.value);
        var objectFile = files.find(file => file.name.includes('AllEntities.xml'));
        if (!objectFile) {
            reject('Fichier AllEntities.xml absent');
            return;
        }

        utils.readXML(objectFile, xmlDoc => {
            var tags = xmlDoc.childNodes[0].childNodes
            for (var i = 0; i < tags.length; i++) {
                console.log(tags[i].nodeName);
                switch (tags[i].nodeName) {
                    case 'com.atolcd.gertrude.model.illustration.Illustration':
                        console.log('GOT IMAGE');
                        break;
                    case 'com.atolcd.gertrude.model.dossier.oeuvre.objet.DossierOeuvreObjet':
                        console.log('GOT Palissy stuffs');
                        console.log(XmlToPalissy(tags[i]));
                        break;
                }
            }
        })
    })
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



