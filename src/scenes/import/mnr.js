import React from 'react';
import { Container } from 'reactstrap';
import Parse from 'csv-parse';
import Importer from './importer';
import Mnr from '../../entities/mnr';

const utils = require('./utils');

export default class Import extends React.Component {
    render() {
        return (
            <Container className='import'>
                <Importer
                    collection="mnr"
                    parseFiles={parseFiles}
                />
            </Container >
        );
    }
}


function parseFiles(files, encoding) {
    return new Promise((resolve, reject) => {

        var file = files.find(file => ('' + file.name.split('.').pop()).toLowerCase() === 'csv');
        if (!file) {
            reject('Fichier .csv absent');
            return;
        }

        utils.readFile(file, res => {
            parseCSVFile(res).then(notices => {
                // const errors = [];
                console.log('GOT NOTICES', notices)
                ///CONTROLE DE LA CONSISTENTE DES DONNEE 
                // if (notices.length) {
                //     for (var i = 0; i < notices.length; i++) {
                //         for (let key in notices[i].notice) {
                //             if (!Mnr.has(key)) {
                //                 errors.push(`La colonne ${key} est inconnue`);
                //             }
                //         }
                //     }
                // }
                // if (errors.length) {
                //     reject(errors.join('\n'));
                //     return;
                // }
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
            while ((record = parser.read())) {
                if (!header) {
                    header = [].concat(record);
                    continue;
                }
                const obj = {};
                record.map((e, i) => {
                    obj[header[i]] = e;
                })
                output.push(new Mnr(obj));
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



