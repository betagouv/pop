import React from 'react';
import {
    ReactiveComponent,
} from '@appbaseio/reactivesearch';
import Button from './button';

export default class ExportComponent extends React.Component {
    render() {
        return (
            <ReactiveComponent
                componentId='export'
                react={{
                    and: this.props.FILTER
                }}
                defaultQuery={() => ({
                    size: 100,
                    aggs: {},
                })}
            >
                <Exp
                    column={['REF', 'TOUT', 'ACTU', 'ADRS', 'AFFE', 'AIRE', 'APPL', 'APRO', 'ARCHEO', 'AUTP', 'AUTR', 'CADA', 'CANT', 'COLL', 'COM', 'COOR', 'COORM', 'COPY', 'COUV', 'DATE', 'DBOR', 'DOMN', 'DENO', 'DENQ', 'DEPL', 'DESC', 'DIMS', 'DOSS', 'DPRO', 'DPT', 'EDIF', 'ELEV', 'ENER', 'ESCA', 'ETAG', 'ETAT', 'ETUD', 'GENR', 'HIST', 'HYDR', 'IMPL', 'INSEE', 'INTE', 'JATT', 'JDAT', 'LBASE2', 'LIEU', 'LOCA', 'MFICH', 'MOSA', 'MHPP', 'MICR', 'MURS', 'NBOR', 'NOMS', 'OBS', 'PAFF', 'PART', 'PARN', 'PDEN', 'PERS', 'PLAN', 'PLOC', 'PPRO', 'PREP', 'PROT', 'PSTA', 'REFE', 'REFO', 'REFP', 'REG', 'REMA', 'REMP', 'RENV', 'REPR', 'RFPA', 'SCLD', 'SCLE', 'SCLX', 'SITE', 'STAT', 'TECH', 'TICO', 'TOIT', 'TYPO', 'VERT', 'REFIM', 'IMG', 'VIDEO', 'DOSURL', 'DOSURLP', 'DOSADRS', 'LIENS', 'IMAGE', 'VISI', 'VOCA', 'VOUT', 'WEB', 'ZONE', 'THEM', 'ACMH', 'ACURL', 'WADRS', 'WCOM', 'WRENV', 'REFM', 'CONTACT', 'IDAGR', 'LMDP', 'PINT', 'DLAB', 'APPL']}
                />
            </ReactiveComponent>

        );
    }
}

class Exp extends React.Component {
    exportData() {
        exportData('Merimee.csv', this.props.columns, this.props.hits);
    }

    render() {
        return (
            <Button icon={require('../../../assets/export.png')} text='Exporter les résultats' to='' onClick={this.exportData.bind(this)} />
        );
    }
}


async function exportData(fileName, columns, entities) {
    let csv = columns.join(',') + '\n';
    for (var j = 0; j < entities.length; j++) {
        const arr = []
        for (var i = 0; i < columns.length; i++) {
            let value = entities[j]._source[columns[i]]
            if (Array.isArray(value)) {
                value = value.join(';')
            }
            value = value.replace(/"/g, '""')
            arr.push('"' + value + '"');
        }
        csv += arr.join(',') + '\n'
    }

    initiateFileDownload(csv, fileName);
}

function initiateFileDownload(str, fileName) {

    let fileBytes = new TextEncoder("utf-8").encode(str);
    var octetStreamMimeType = "application/octet-stream";

    var blob;    //trySaveAsDownload
    if (window.saveAs) {
        blob = new Blob([fileBytes], { type: octetStreamMimeType });
        saveAs(blob, fileName);
        return true;
    }

    var chArray = Array.prototype.map.call(fileBytes, function (byte) { return String.fromCharCode(byte); });
    let base64 = window.btoa(chArray.join(""));

    var aElement = document.createElement("a");    //tryAnchorDownload
    var event;
    if ("download" in aElement) {
        aElement.setAttribute("download", fileName);
        aElement.href = "data:" + octetStreamMimeType + ";base64," + base64;
        document.body.appendChild(aElement);
        event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        aElement.dispatchEvent(event);
        document.body.removeChild(aElement);
        return true;
    }
    return false;
}

