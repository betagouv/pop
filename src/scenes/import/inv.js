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

        console.log(files)

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

            resolve({ importedNotices, fileName: PalissyFile.name + "\n" + MemoireFile.name + "\n" + MerimeeFile.name })
            return;
        }



        //RENABLE
        const xmlFiles = files.filter(file => file.name.indexOf('.xml') !== -1);
        if (xmlFiles.length) {
            const importedNotices = await (ParseRenabl(files, xmlFiles, encoding));


            //ADD IMAGES
            // for (var i = 0; i < importedNotices.length; i++) {
            //     const ref = importedNotices[i].REF.value;
            //     for (var j = 0; j < files.length; j++) {
            //         if (files[j].name.toUpperCase().indexOf(ref) !== -1) {
            //             importedNotices[i]._images.push(files[j])
            //             importedNotices[i].IMG.value = `memoire/${ref}/${files[j].name}`
            //             break;
            //         }
            //     }
            // }

            resolve({ importedNotices, fileName: xmlFiles.map(e => e.name).join('\n') });
            return;
        }


        // ERROR
        reject("Impossible d'importer le(s) fichier(s). Aucun fichier Renable ou Gertrude détecté")

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
            notices.push(...values[2].map(e => {

                //changement du modèle de donnée gertrude -> pop
                e.IMG = e.NOMI;
                e.NUMP = e.NUMP;
                e.AUTP = e.AUT;
                e.IDPROD = e.EMET;
                e.AUTOEU = e.AUTR;
                e.PRECOR = e.DOC;
                e.ADRESSE = e.LIEU + ";" + e.ADRS;
                return new Memoire(e);
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
                console.log(tags)
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

                    //ADD IMAGES
                    const ref = memoireObj.REF.value;
                    for (var j = 0; j < files.length; j++) {
                        if (files[j].name.toUpperCase().indexOf(ref) !== -1) {
                            memoireObj._images.push(files[j])
                            memoireObj.IMG.value = `memoire/${ref}/${files[j].name}`
                            break;
                        }
                    }
                    console.log(memoireObj)
                    notices.push(memoireObj);
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