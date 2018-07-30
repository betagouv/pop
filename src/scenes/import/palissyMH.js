import React from 'react';
import { Container } from 'reactstrap';
import Importer from './importer';
import Parse from 'csv-parse';
import Palissy from '../../entities/palissy';

const utils = require('./utils')

export default class Import extends React.Component {
    render() {
        return (
            <Container className='import'>
                <Importer
                    collection="palissy"
                    parseFiles={parseFiles}
                />
            </Container >
        );
    }
}

function parseFiles(files, encoding) {
    return new Promise((resolve, reject) => {

        var objectFile = files.find(file => file.name.includes('.csv'));
        if (!objectFile) {
            reject('Pas de fichiers .csv detecté');
            return;
        }

        utils.readFile(objectFile, encoding, (file) => {
            ParseCSV(file).then(notices => {
                resolve({ importedNotices: notices, fileName: objectFile.name });
            });
        })

    })
}

function ParseCSV(file) {
    return new Promise((resolve, reject) => {
        const parser = Parse({ delimiter: '|', from: 1, quote: '', relax_column_count: true });
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
                output.push(new Palissy(obj));
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

        parser.write(file);
        parser.end();
    })
}
