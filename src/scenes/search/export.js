import API from '../../services/api'

export default async function exportData(fileName, columns, entities) {
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

