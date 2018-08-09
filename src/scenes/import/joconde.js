import React from 'react';
import { Container } from 'reactstrap';
import Importer from './importer';
import ExportData from './importer/export'; // fichier a télécharger
import ReportData from './importer/report'; //Mail reporting a la fin de l'import
import Joconde from '../../entities/joconde';

const utils = require('./utils')

export default class Import extends React.Component {
    render() {
        return (
            <Container className='import'>
                <Importer
                    collection="joconde"
                    parseFiles={parseFiles}
                    onExport={(notices) => ExportData.generate(notices, 'joconde', [{ name: 'Identifiant', key: 'REF' }, { name: 'N° inventaire', key: 'INV' }])}
                    onReport={(notices) => ReportData.generate(notices, 'joconde', [{ name: 'Identifiant', key: 'REF' }, { name: 'N° inventaire', key: 'INV' }])}
                    dropzoneText="Glissez & déposez vos fichiers au format joconde (.txt) et les images associées (au format .jpg) dans cette zone"
                />
            </Container >
        );
    }
}


function parseFiles(files, encoding) {
    return new Promise((resolve, reject) => {

        const errors = [];

        var file = files.find(file => ('' + file.name.split('.').pop()).toLowerCase() === 'txt');
        if (!file) {
            reject('Fichier .txt absent');
            return;
        }

        utils.readFile(file, encoding, res => {
            const importedNotices = utils.parseAjoutPilote(res, Joconde).map(value => new Joconde(value));

            const filesMap = {};
            for (var i = 0; i < files.length; i++) {
                //Sometimes, name is the long name with museum code, sometimes its not... The easiest way I found was to transform long name to short name each time I get a file name
                filesMap[Joconde.convertLongNameToShort(files[i].name)] = files[i];
            }

            //ADD IMAGES
            for (var i = 0; i < importedNotices.length; i++) {
                const names = importedNotices[i].IMG;
                for (var j = 0; j < names.length; j++) {
                    let img = filesMap[names[j]];
                    if (!img) {
                        errors.push(`Image ${names[j]} introuvable`)
                    } else {
                        let newImage = null;
                        try {
                            newImage = new File([img], Joconde.convertLongNameToShort(img.name), { type: img.type });
                        } catch (err) {
                            newImage = new Blob([img], { type: 'image/jpeg' });
                        }
                        importedNotices[i]._images.push(newImage)
                    }
                }
            }

            if (errors.length) {
                reject(errors.join('\n'));
                return;
            }
            console.log('importedNotices', importedNotices)

            resolve({ importedNotices, fileName: file.name });

        })
    });
}
