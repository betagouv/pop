import React from 'react';
import { Container } from 'reactstrap';
import Importer from './importer';
import Parse from 'csv-parse';
import Merimee from '../../entities/merimee';
import Palissy from '../../entities/palissy';


import utils from './utils';

export default class Import extends React.Component {
    render() {
        return (
            <Container className='import'>
                <Importer
                    collection="MH"
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
        utils.readCSV(objectFile, '|', encoding).then(objs => {
            const importedNotices = objs.map(obj => {
                if (obj.REF.indexOf('PM') !== -1) {
                    return new Palissy(obj);
                } else if (obj.REF.indexOf('PA') !== -1) {
                    return new Merimee(obj);
                } else {
                    console.log('ISSUE');
                    return;
                }
            })
            resolve({ importedNotices, fileName: objectFile.name });
        })

    })
}

