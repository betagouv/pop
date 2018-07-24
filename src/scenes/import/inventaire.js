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
                    transform={() => { }}
                    mapping={JocondeMapping}
                />
            </Container >
        );
    }
}


function parseFiles(files, encoding) {
    return new Promise((resolve, reject) => {
        const filesMap = {};

        const JocondeFields = JocondeMapping.map(e => e.value);

        console.log(files)
        var objectFile = files.find(file => file.name.includes('xmlToNoticeObjet.txt'));
        if (!objectFile) {
            reject('Fichier xmlToNoticeObjet.txt absent');
            return;
        }

        var imageRename = files.find(file => file.name.includes('xmlToRenommeIllustrations.txt'));
        if (!imageRename) {
            reject('Fichier xmlToRenommeIllustrations.txt absent');
            return;
        }

        utils.readFile(objectFile, res => {




        })
    })
}

function XmlToPalissy(xml) {
    PRODUCTEUR = ''
    obj.CONTIENT_IMAGE = ''
    obj.REF = ''
    obj.VIDEO = ''
    obj.CONTACT = ''
    obj.ACQU = ''
    obj.ADRS = ''
    obj.ADRS2 = ''
    obj.AFIG = ''
    obj.AIRE = ''
    obj.APPL = ''
    obj.ATEL = ''
    obj.AUTP = ''
    obj.AUTR = ''
    obj.BIBL = ''
    obj.CANT = ''
    obj.CATE = ''
    obj.COM = ''
    obj.COM2 = ''
    obj.CONTACT = ''
    obj.COOR = ''
    obj.COORM = ''
    obj.COPY = ''
    obj.DATE = ''
    obj.DBOR = ''
    obj.DENO = ''
    obj.DENQ = ''
    obj.DEPL = ''
    obj.DESC = ''
    obj.DIMS = ''
    obj.DMAJ = ''
    obj.DMIS = ''
    obj.DOMN = ''
    obj.DOSADRS = ''
    obj.DOSS = ''
    obj.DOSURL = ''
    obj.DOSURLP = ''
    obj.DPRO = ''
    obj.DPT = ''
    obj.EDIF = ''
    obj.EDIF2 = ''
    obj.EMPL = ''
    obj.EMPL2 = ''
    obj.ETAT = ''
    obj.ETUD = ''
    obj.EXEC = ''
    obj.EXPO = ''
    obj.HIST = ''
    obj.IDAGR = ''
    obj.IMAGE = ''
    obj.IMG = ''
    obj.IMPL = ''
    obj.INSC = ''
    obj.INSEE = ''
    obj.INSEE2 = ''
    obj.INTE = ''
    obj.JDAT = ''
    obj.LBASE2 = ''
    obj.LIENS = ''
    obj.LIEU = ''
    obj.LMDP = ''
    obj.LOCA = ''
    obj.MATR = ''
    obj.MFICH = ''
    obj.MICR = ''
    obj.MOSA = ''
    obj.NART = ''
    obj.NINV = ''
    obj.NOMS = ''
    obj.NUMA = ''
    obj.NUMP = ''
    obj.OBS = ''
    obj.ORIG = ''
    obj.PAPP = ''
    obj.PARN = ''
    obj.PART = ''
    obj.PDEN = ''
    obj.PDIM = ''
    obj.PERS = ''
    obj.PETA = ''
    obj.PHOTO = ''
    obj.PINS = ''
    obj.PINT = ''
    obj.PLOC = ''
    obj.PPRO = ''
    obj.PREP = ''
    obj.PROT = ''
    obj.REFA = ''
    obj.REFE = ''
    obj.REFM = ''
    obj.REFP = ''
    obj.REG = ''
    obj.RENP = ''
    obj.RENV = ''
    obj.REPR = ''
    obj.SCLD = ''
    obj.SCLE = ''
    obj.SCLX = ''
    obj.SOUR = ''
    obj.STAD = ''
    obj.STAT = ''
    obj.STRU = ''
    obj.THEM = ''
    obj.TICO = ''
    obj.TITR = ''
    obj.TOUT = ''
    obj.VIDEO = ''
    obj.VOLS = ''
    obj.WADRS = ''
    obj.WCOM = ''
    obj.WEB = ''
    obj.WRENV = ''
    obj.ZONE = ''
}



