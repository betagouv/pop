import React from 'react';
import { Container } from 'reactstrap';
import Importer from './importer';

import { bucket_url } from '../../config';
import JocondeMapping from '../../mapping/joconde'

const utils = require('./utils')

export default class Import extends React.Component {
    render() {
        return (
            <Container className='import'>
                <Importer
                    collection="joconde"
                    parseFiles={parseFiles}
                    transform={transform}
                    allfieldswiththesaurus={JocondeMapping.filter(e => e.thesaurus)}
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

        var file = files.find(file => file.name.split('.').pop() === 'TXT');
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                let str = reader.result.replace(/\-\r\n/g, '');
                var lines = str.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
                const notices = [];
                let obj = {};
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i] === '//') {
                        notices.push({ notice: obj });
                        console.log(obj)
                        obj = {};
                    } else {
                        console.log(lines[i])
                        obj[lines[i]] = lines[++i]
                    }
                }

                ///CONTROLE DE LA CONSISTENTE DES DONNEE 
                const errors = [];
                if (notices.length) {
                    const JocondeFields = JocondeMapping.map(e => e.value);
                    for (var i = 0; i < notices.length; i++) {
                        for (let key in notices[i].notice) {
                            if (!JocondeFields.includes(key)) {
                                console.log(notices[i].notice)
                                errors.push(`La colonne ${key} est inconnue`);
                            }
                        }
                    }
                }

                //ADD IMAGES
                for (var i = 0; i < notices.length; i++) {
                    const names = extractIMGNames(notices[i].notice.REFIM)
                    notices[i].images = [];
                    for (var j = 0; j < names.length; j++) {
                        let img = filesMap[names[j]];
                        if (!img) {
                            console.log('Cant find ', names[j], 'in', filesMap)
                        }
                        if (!img) {
                            errors.push(`Image ${names[j]} introuvable`)
                        }
                        notices[i].images.push(img)
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
                    notices[i].errors = {
                        jsx: errors.map(e => <div><Badge color="danger">Erreur</Badge> {e}</div>),
                        text: errors
                    }
                }

                resolve(notices);
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            console.log('encoding', encoding)
            reader.readAsText(file, encoding);
        } else {
            reject('Fichier .TXT absent');
        }
    })
}

function transform(obj) {
    const errors = [];


    obj.REF = obj.REF.trim();
    obj.ADPT = utils.extractArray(obj.ADPT, ';', errors);
    obj.APPL = utils.extractArray(obj.APPL, ';', errors);
    obj.APTN = obj.APTN || '';
    obj.ATTR = obj.ATTR || '';
    obj.AUTR = obj.AUTR || '';
    obj.BIBL = obj.BIBL || '';
    obj.COMM = obj.COMM || '';
    obj.CONTACT = utils.extractEmail(obj.CONTACT, obj.REF, errors);
    obj.COOR = obj.COOR || '';
    obj.COPY = obj.COPY || '';
    obj.DACQ = obj.DACQ || '';
    obj.DATA = obj.DATA || '';
    obj.DATION = obj.DATION || '';
    obj.DDPT = obj.DDPT || '';
    obj.DECV = obj.DECV || '';
    obj.DENO = utils.extractArray(obj.DENO, ';', errors);
    obj.DEPO = obj.DEPO || '';
    obj.DESC = obj.DESC || '';
    obj.DESY = obj.DESY || '';
    obj.DIFFU = obj.DIFFU ? "oui" : "non"
    obj.DIMS = obj.DIMS || '';
    obj.DMAJ = obj.DMA || '';
    obj.DMIS = obj.DMIS || '';
    obj.DOMN = utils.extractArray(obj.DOMN, ';', errors);
    obj.DREP = obj.DREP || '';
    obj.ECOL = utils.extractArray(obj.ECOL, ';', errors);
    obj.EPOQ = utils.extractArray(obj.EPOQ, ';', errors);
    obj.ETAT = utils.extractArray(obj.ETAT, ';', errors);
    obj.EXPO = obj.EXPO || '';
    obj.GENE = utils.extractArray(obj.GENE, ';', errors);
    obj.GEOHI = utils.extractArray(obj.GEOHI, ';', errors);
    obj.HIST = obj.HIST || '';
    obj.IMAGE = obj.IMAGE || '';
    obj.IMG = extractIMGNames(obj.REFIM).map(e => `${bucket_url}/joconde/${obj.REF}/${e}`);
    obj.INSC = utils.extractArray(obj.INSC, ';', errors);
    obj.INV = obj.INV || '';
    obj.LABEL = obj.LABEL || '';
    obj.LABO = obj.LABO || '';
    obj.LARC = obj.LARC || '';
    obj.LIEUX = obj.LIEUX || '';
    obj.LOCA = obj.LOCA || '';
    obj.LOCA2 = obj.LOCA2 || '';
    obj.LOCA3 = obj.LOCA3 || '';
    obj.MILL = utils.extractArray(obj.MILL, ';', errors);
    obj.MILU = obj.MILU || '';
    obj.MOSA = obj.MOSA || '';
    obj.MSGCOM = obj.MSGCOM || '';
    obj.MUSEO = obj.MUSEO || '';
    obj.NSDA = obj.NSDA || '';
    obj.ONOM = utils.extractArray(obj.ONOM, ';', errors);
    obj.PAUT = obj.PAUT || '';
    obj.PDAT = obj.PDAT || '';
    obj.PDEC = obj.PDEC || '';
    obj.PEOC = utils.extractArray(obj.PEOC, ';', errors);
    obj.PERI = utils.extractArray(obj.PERI, ';', errors);
    obj.PERU = utils.extractArray(obj.PERU, ';', errors);
    obj.PHOT = obj.PHOT || '';
    obj.PINS = obj.PINS || '';
    obj.PLIEUX = obj.PLIEUX || '';
    obj.PREP = utils.extractArray(obj.PREP, ';', errors);
    obj.PUTI = obj.PUTI || '';
    obj.RANG = obj.RANG || '';
    obj.REDA = utils.extractArray(obj.REDA, ';', errors);

    obj.REFIM = obj.REFIM || '';

    obj.REPR = obj.REPR || '';
    obj.RETIF = obj.RETIF || '';
    obj.SREP = utils.extractArray(obj.SREP, ';', errors);
    obj.STAT = utils.extractArray(obj.STAT, ';', errors);
    obj.TECH = utils.extractArray(obj.TECH, ';', errors);
    obj.TICO = obj.TICO || '';
    obj.TITR = obj.TITR || '';
    obj.TOUT = obj.TOUT || '';
    obj.UTIL = utils.extractArray(obj.UTIL, ';', errors);
    obj.VIDEO = obj.VIDEO || '';
    obj.WWW = utils.extractUrls(obj.WWW, obj.REF, errors);
    obj.LVID = obj.LVID || '';

    obj.CONTIENT_IMAGE = obj.IMG.length > 0 ? 'oui' : 'non';

    return { notice: obj, errors };
}


function extractIMGNames(REFIM) {
    if (!REFIM) {
        return [];
    }

    let tempImages = REFIM.split(';');
    return tempImages.map(e => {
        let name = e.split(',')[0];
        name = name.replace(/_[a-zA-Z0-9]\./g, '.');
        name = name.replace(/[a-zA-Z0-9]*_/g, '');
        return name;
    })
}
