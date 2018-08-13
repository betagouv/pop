import React from 'react';
import { Container } from 'reactstrap';
import Importer from './importer';

import Merimee from '../../entities/merimee';
import Palissy from '../../entities/palissy';
import Memoire from '../../entities/memoire';

import utils from './utils';

export default class Import extends React.Component {
    render() {
        return (
            <Container className='import'>
                <Importer
                    collection="inventaire"
                    parseFiles={parseFiles}
                    dropzoneText="Glissez & déposez vos fichiers au format Renable (.xml) ou Gertrude (.csv à partir de la version 1.6) et les images associées (au format .jpg) dans cette zone"
                    defaultEncoding="UTF-8"
                />
            </Container >
        );
    }
}

function parseFiles(files, encoding) {
    return new Promise(async (resolve, reject) => {

        //GERTRUDE
        var objectFile = files.find(file => file.name.includes('GERTRUDE_xmlToPALISSY_lexicovide.txt'));
        if (objectFile) {
            const PalissyFile = files.find(file => file.name.includes('GERTRUDE_xmlToPALISSY_lexicovide.txt'));
            const MemoireFile = files.find(file => file.name.includes('GERTRUDE_xmlToMEMOIRE_lexicovide.txt'));
            const MerimeeFile = files.find(file => file.name.includes('GERTRUDE_xmlToMERIMEE_lexicovide.txt'));
            const importedNotices = await (ParseGertrude(PalissyFile, MemoireFile, MerimeeFile, encoding));

            //ADD IMAGES
            for (var i = 0; i < importedNotices.length; i++) {
                const ref = importedNotices[i].REF.value;
                for (var j = 0; j < files.length; j++) {
                    if (files[j].name.toUpperCase().indexOf(ref) !== -1) {
                        importedNotices[i]._images.push(files[j])
                        importedNotices[i].IMG.value = `memoire/${ref}/${files[j].name}`
                        break;
                    }
                }
            }

            resolve({ importedNotices, fileName: PalissyFile.name + "," + MemoireFile.name + "," + MerimeeFile.name })
            return;
        }

        //RENABLE
        const xmlFiles = files.find(file => file.name.includes('.xml'));
        if (xmlFiles.length) {
            const importedNotices = await (ParseRenabl(xmlFiles, encoding));
            resolve({ importedNotices, fileName: xmlFiles.map(e => e.name).join('\n') });
            return;
        }


        // ERROR
        reject("Impossible d'importer le(s) fichier(s)")

    })
}


function ParseGertrude(PalissyFile, MemoireFile, MerimeeFile, encoding) {
    return new Promise(async (resolve, reject) => {
        const notices = [];
        const arr = [];
        arr.push(utils.readCSV(PalissyFile, '|', encoding));
        arr.push(utils.readCSV(MerimeeFile, '|', encoding));
        arr.push(utils.readCSV(MemoireFile, '|', encoding));


        Promise.all(arr).then((values) => {
            notices.push(...values[0].map(e => new Palissy(e)));
            notices.push(...values[1].map(e => new Merimee(e)));
            notices.push(...values[2].map(e => new Memoire({ ...e, IMG: e.NOMI })));
            resolve(notices)
        })

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