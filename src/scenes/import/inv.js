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
            // const RenameFile = files.find(file => file.name.includes('GERTRUDE_xmlToRenommeIllustrations_Toutes.txt'));

            if (!PalissyFile) {
                reject("Impossible d'importer le(s) fichier(s). Fichier GERTRUDE_xmlToPALISSY_lexicovide.txt introuvable")
                return;
            }
            if (!MemoireFile) {
                reject("Impossible d'importer le(s) fichier(s). Fichier GERTRUDE_xmlToMEMOIRE_lexicovide.txt introuvable")
                return;
            }
            if (!MerimeeFile) {
                reject("Impossible d'importer le(s) fichier(s). Fichier GERTRUDE_xmlToMERIMEE_lexicovide.txt introuvable")
                return;
            }
            // if (!RenameFile) {
            //     reject("Impossible d'importer le(s) fichier(s). Fichier GERTRUDE_xmlToRenommeIllustrations_Toutes.txt introuvable")
            //     return;
            // }

            //RENAME FILES
            // console.log(files);
            // console.log("RenameFile", RenameFile)
            // const images = [];
            // utils.readFile(RenameFile, encoding, (e) => {
            //     const renamedFiles = e.split('\n').map(f => f.split(' '))
            //     for (var i = 0; i < renamedFiles.length; i++) {
            //         console.log(renamedFiles[i])
            //         const imageFile = files.find(e => e.name === renamedFiles[i][1]);
            //         if(imageFile){
            //             var blob = imageFile.slice(0, -1, 'image/jpg');
            //             images.push(new File([blob], `${renamedFiles[i][2]}`, { type: 'image/jpg' }))
            //         }
            //     }
            //     console.log(images)
            // });


            const otherFiles = files.filter(file => file.name.indexOf('.xml') === -1);
            const importedNotices = await (ParseGertrude(PalissyFile, MemoireFile, MerimeeFile, otherFiles, encoding));
            console.log("importedNotices", importedNotices)
            resolve({ importedNotices, fileName: PalissyFile.name + "\n" + MemoireFile.name + "\n" + MerimeeFile.name })
            return;
        }

        //RENABLE
        const xmlFiles = files.filter(file => file.name.indexOf('.xml') !== -1);
        const otherFiles = files.filter(file => file.name.indexOf('.xml') === -1);
        if (xmlFiles.length) {
            const importedNotices = await (ParseRenabl(otherFiles, xmlFiles, encoding));

            resolve({ importedNotices, fileName: xmlFiles.map(e => e.name).join('\n') });
            return;
        }

        // ERROR
        reject("Impossible d'importer le(s) fichier(s). Aucun fichier Renable ou Gertrude détecté")

    })
}


function ParseGertrude(PalissyFile, MemoireFile, MerimeeFile, files, encoding) {
    return new Promise(async (resolve, reject) => {
        const notices = [];
        const arr = [];
        arr.push(utils.readCSV(PalissyFile, '|', encoding));
        arr.push(utils.readCSV(MerimeeFile, '|', encoding));
        arr.push(utils.readCSV(MemoireFile, '|', encoding));


        Promise.all(arr).then((values) => {
            notices.push(...values[0].map(e => new Palissy(e)));
            notices.push(...values[1].map(e => new Merimee(e)));
            notices.push(...values[2].map(e => {

                //changement du modèle de donnée gertrude -> pop
                const imagePath = e.NOMI || e.NUMI;
                e.NUMP = e.NUMP;
                e.AUTP = e.AUT;
                e.IDPROD = e.EMET;
                e.AUTOEU = e.AUTR;
                e.PRECOR = e.DOC;
                e.ADRESSE = e.LIEU + ";" + e.ADRS;
                const memoireObj = new Memoire(e);
                const imageFile = files.find(e => convertLongNameToShort(e.name).toUpperCase().indexOf(imagePath.toUpperCase()) !== -1);
                if (imageFile) {
                    memoireObj._images.push(imageFile)
                    memoireObj.IMG.value = `memoire/${e.REF}/${imageFile.name}`
                } else {
                    memoireObj._errors.push(`Impossible de trouver l'image ${imagePath}`)
                }

                return memoireObj;
            }));
            resolve(notices)
        })

    })
}

function ParseRenabl(files, xmlFiles, encoding) {
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
                } else if (tags[i].nodeName === 'ILLUSTRATION') {
                    const obj = RenablXMLToObj(tags[i]);
                    const EMET = tags[i].getAttribute('EMET');
                    const NUMI = tags[i].getAttribute('NUMI');
                    obj.REF = EMET + "_" + NUMI;

                    const memoireObj = new Memoire(obj);

                    const image = convertLongNameToShort(obj.FNU2, "\\");
                    const imageFile = files.find(e => convertLongNameToShort(e.name).toUpperCase() === image.toUpperCase());
                    if (imageFile) {
                        memoireObj._images.push(imageFile)
                        memoireObj.IMG.value = `memoire/${obj.REF}/${imageFile.name}`
                    } else {
                        memoireObj._errors.push(`Impossible de trouver l'image ${image}`)
                    }
                    notices.push(memoireObj);
                } else {
                    // console.log(tags[i].nodeName);
                }
            }
        }
        resolve(notices)
    })
}

function convertLongNameToShort(str, delim = '/') {
    let name = str.substring(str.lastIndexOf(delim) + 1);
    return name;
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