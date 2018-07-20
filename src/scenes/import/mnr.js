import React from 'react';
import { Container } from 'reactstrap';
import Parse from 'csv-parse';
import Importer from './importer';

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
                    mapping={MnrMapping}
                />
            </Container >
        );
    }
}


function parseFiles(files, encoding) {
    return new Promise((resolve, reject) => {
        const filesMap = {};

        const MnrFields = MnrMapping.map(e => e.value);

        var file = files.find(file => ('' + file.name.split('.').pop()).toLowerCase() === 'csv');

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {

                // //Parsing du fichie en ajout piloté
                // let str = reader.result.replace(/\-\r\n/g, '');
                // var lines = str.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
                // const notices = [];
                // let obj = {};
                // for (var i = 0; i < lines.length; i++) {
                //     if (lines[i] === '//') {
                //         notices.push({ notice: obj, warnings: [], errors: [] });
                //         obj = {};
                //     } else {
                //         const key = lines[i];
                //         let value = '';
                //         let tag = true;
                //         while (tag) {
                //             value += lines[++i];
                //             if (lines[i + 1] && lines[i + 1] !== '//' && !JocondeFields.includes(lines[i + 1])) {
                //             } else {
                //                 tag = false;
                //             }
                //         }
                //         if (key) {
                //             obj[key] = value;
                //         }
                //     }
                // }

                // if (Object.keys(obj).length) {
                //     notices.push({ notice: obj, warnings: [], errors: [] });
                // }


                ///CONTROLE DE LA CONSISTENTE DES DONNEE 
                const errors = [];
                if (notices.length) {
                    for (var i = 0; i < notices.length; i++) {
                        for (let key in notices[i].notice) {
                            if (!MnrFields.includes(key)) {
                                errors.push(`La colonne ${key} est inconnue`);
                            }
                        }
                    }
                }

                //ADD IMAGES
                // for (var i = 0; i < notices.length; i++) {
                //     const names = extractIMGNames(notices[i].notice.REFIM)
                //     notices[i].images = [];
                //     for (var j = 0; j < names.length; j++) {
                //         let img = filesMap[names[j]];
                //         if (!img) {
                //             console.log('Cant find ', names[j], 'in', filesMap)
                //             errors.push(`Image ${names[j]} introuvable`)
                //         } else {
                //             let newImage = null;
                //             try {
                //                 newImage = new File([img], convertLongNameToShort(img.name), { type: img.type });
                //             } catch (err) {
                //                 newImage = new Blob([img], { type: 'image/jpeg' });
                //             }
                //             notices[i].images.push(newImage)
                //         }
                //     }
                // }

                if (errors.length) {
                    reject(errors.join('\n'));
                    return;
                }

                //CONTROLE DE LA VALIDITE DES CHAMPS
                for (var i = 0; i < notices.length; i++) {
                    const { notice, errors } = transform(notices[i].notice);
                    notices[i].notice = notice;
                    notices[i].errors = errors;
                }

                resolve({ importedNotices: notices, fileName: file.name });
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.readAsText(file, 'ISO-8859-1');
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
    obj.DOMN = utils.extractArray(obj.DOMN, ';');
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
    obj.DIMS = utils.extractArray(obj.DIMS, ';');
    obj.VIDEO = utils.extractArray(obj.VIDEO, ';');
    obj.INV = obj.INV || '';
    obj.EXPO = obj.EXPO || '';
    obj.BIBL = obj.BIBL || '';
    obj.AATT = obj.AATT || '';
    obj.AUTI = obj.AUTI || '';
    obj.CATE = obj.CATE || '';
    obj.NOTE = obj.NOTE || '';
    obj.REDC = utils.extractArray(obj.REDC, ';');
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
    obj.CONTIENT_IMAGE = obj.VIDEO.length ? "oui" : "non";

    return { notice: obj, errors };
}
