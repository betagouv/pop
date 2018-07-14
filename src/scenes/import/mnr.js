import React from 'react';
import { Container } from 'reactstrap';
import Parse from 'csv-parse';
import Importer from './importer';

import { bucket_url } from '../../config';
import MnrMapping from '../../mapping/mnr'

const utils = require('./utils')

export default class Import extends React.Component {
    render() {
        return (
            <Container className='import'>
                <Importer
                    collection="mnr"
                    parseFiles={parseFiles}
                    transform={transform}
                    allfieldswiththesaurus={MnrMapping.filter(e => e.thesaurus)}
                />
            </Container >
        );
    }
}


function parseFiles(files, encoding) {
    return new Promise((resolve, reject) => {

        const filesMap = {};
        for (var i = 0; i < files.length; i++) {

            //Sometimes, name is the long name with museum code, sometimes its not... The easiest way I found was to transform long name to short name each time I get a file name
            let newName = files[i].name.replace(/_[a-zA-Z0-9]\./g, '.');
            newName = newName.replace(/[a-zA-Z0-9]*_/g, '');
            filesMap[newName] = files[i];

        }

        var file = files.find(file => ('' + file.name.split('.').pop()).toLowerCase() === 'csv');
        if (file) {

            const reader = new FileReader();
            reader.onload = () => {

                const parser = Parse({ delimiter: ',', from: 1 });

                let record = null;
                let header = null;
                const notices = [];
                parser.on('readable', () => {
                    while ((record = parser.read())) {
                        if (!header) {
                            header = [].concat(record);
                            continue;
                        }
                        const obj = {};
                        record.map((e, i) => {  //update data 
                            obj[header[i]] = e;
                            if (header[i] === 'REF') { obj[header[i]] = ('' + obj[header[i]]).toUpperCase(); }
                        })

                        notices.push({ notice: obj });
                    }
                });

                // Catch any error 
                parser.on('error', (err) => { reject(err.message); return; });
                // When we are done, test that the parsed output matched what expected 
                parser.on('finish', () => {

                    console.log('notices', notices)
                    // CONTROLE DE LA CONSISTENTE DES DONNEE
                    const errors = [];
                    if (notices.length) {
                        const MnrFields = MnrMapping.map(e => e.value);
                        for (var i = 0; i < notices.length; i++) {
                            for (let key in notices[i].notice) {
                                if (!MnrFields.includes(key)) {
                                    console.log(notices[i].notice)
                                    errors.push(`La colonne ${key} est inconnue`);
                                }
                            }
                        }
                    }

                    // //ADD IMAGES
                    // for (var i = 0; i < notices.length; i++) {
                    //     const names = extractIMGNames(notices[i].notice.REFIM)
                    //     notices[i].images = [];
                    //     for (var j = 0; j < names.length; j++) {
                    //         let img = filesMap[names[j]];
                    //         if (!img) {
                    //             console.log('Cant find ', names[j], 'in', filesMap)
                    //         }
                    //         if (!img) {
                    //             errors.push(`Image ${names[j]} introuvable`)
                    //         }
                    //         notices[i].images.push(img)
                    //     }
                    // }


                    //   CONTROLE DE LA VALIDITE DES CHAMPS
                    for (var i = 0; i < notices.length; i++) {
                        const { notice, errors } = transform(notices[i].notice);
                        notices[i].notice = notice;
                        notices[i].errors = errors;
                    }

                    console.log('NOTICES', notices)
                    resolve(notices);
                });

                parser.write(reader.result);
                parser.end();
            };

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.readAsText(file);
        } else {
            reject('Fichier .csv absent');
        }
    })
}

function transform(obj) {
    const errors = [];

    obj.REF = obj.REF.trim();
    obj.TOUT = obj.TOUT || '';
    obj.AUTR = obj.AUTR || '';
    obj.PAUT = obj.PAUT || '';
    obj.ATTR = obj.ATTR || '';
    obj.ECOL = obj.ECOL || '';
    obj.TITR = obj.TITR || '';
    obj.ATIT = obj.ATIT || '';
    obj.PTIT = obj.PTIT || '';
    obj.DENO = utils.extractArray(obj.DENO, ';');
    obj.DESC = obj.DESC || '';
    obj.DOMN = obj.DOMN || '';
    obj.LOCA = obj.LOCA || '';
    obj.INSC = obj.INSC || '';
    obj.MARQ = obj.MARQ || '';
    obj.OBSE = obj.OBSE || '';
    obj.ETAT = obj.ETAT || '';
    obj.GENE = obj.GENE || '';
    obj.PROV = obj.PROV || '';
    obj.HIST = obj.HIST || '';
    obj.HIST2 = obj.HIST2 || '';
    obj.HIST3 = obj.HIST3 || '';
    obj.HIST4 = obj.HIST4 || '';
    obj.HIST5 = obj.HIST5 || '';
    obj.HIST6 = obj.HIST6 || '';
    obj.SCLE = utils.extractArray(obj.SCLE, ';');
    obj.STYL = obj.STYL || '';
    obj.MILL = obj.MILL || '';
    obj.TECH = utils.extractArray(obj.TECH, ';');
    obj.DIMS = obj.DIMS || '';

    obj.INV = obj.INV || '';
    obj.EXPO = obj.EXPO || '';
    obj.BIBL = obj.BIBL || '';
    obj.AATT = obj.AATT || '';
    obj.AUTI = obj.AUTI || '';
    obj.CATE = obj.CATE || '';
    obj.NOTE = obj.NOTE || '';
    obj.REDC = obj.REDC || '';
    obj.DREP = obj.DREP || '';
    obj.PREP = obj.PREP || '';
    obj.REPR = obj.REPR || '';
    obj.SREP = obj.SREP || '';
    obj.REFIM = obj.REFIM || '';
    obj.DMAJ = obj.DMAJ.replace('/', '-');
    obj.NUMS = obj.NUMS || '';
    obj.SUITE = obj.SUITE || '';
    obj.COMM = obj.COMM || '';
    obj.NOTE2 = obj.NOTE2 || '';
    obj.RESUME = obj.RESUME || '';
    obj.PHOT = obj.PHOT || '';
    obj.VIDEO = obj.VIDEO = [];
    obj.CONTIENT_IMAGE = obj.VIDEO.length ? "oui" : "non";

    return { notice: obj, errors };
}
