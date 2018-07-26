import React from 'react';
import { Container } from 'reactstrap';
import Parse from 'csv-parse';
import Importer from './importer';

import MnrMapping from '../../mapping/mnr';

const utils = require('./utils');

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

        const MnrFields = MnrMapping.map(e => e.value);
        var file = files.find(file => ('' + file.name.split('.').pop()).toLowerCase() === 'csv');
        if (!file) {
            reject('Fichier .csv absent');
            return;
        }

        utils.readFile(file, res => {
            parseCSVFile(reader.result).then(notices => {
                const errors = [];
                console.log('GOT NOTICES', notices)
                ///CONTROLE DE LA CONSISTENTE DES DONNEE 
                if (notices.length) {
                    for (var i = 0; i < notices.length; i++) {
                        for (let key in notices[i].notice) {
                            if (!MnrFields.includes(key)) {
                                errors.push(`La colonne ${key} est inconnue`);
                            }
                        }
                    }
                }

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

            })
        });
    });
}


function parseCSVFile(fileAsBinaryString) {
    return new Promise((resolve, reject) => {
        const parser = Parse({ delimiter: ',', from: 1 });
        const output = [];

        let record = null;
        let header = null;

        parser.on('readable', () => {
            let count = 0;
            while ((record = parser.read())) {
                if (!header) {
                    header = [].concat(record);
                    continue;
                }
                const obj = {};
                record.map((e, i) => {
                    obj[header[i]] = e;
                })
                output.push({ notice: obj, warnings: [], errors: [], messages: [] });
            }
        });

        // Catch any error
        parser.on('error', (err) => {
            reject(err.message)
        });

        // When we are done, test that the parsed output matched what expected
        parser.on('finish', () => {
            resolve(output);
        });

        parser.write(fileAsBinaryString);
        parser.end();
    })
}




function transform(obj) {
    const errors = [];

    obj.REF = obj.REF.trim();
    obj.TOUT = obj.TOUT || '';
    obj.AUTR = utils.extractArray(obj.AUTR, ';');
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
