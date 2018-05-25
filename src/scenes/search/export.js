import API from '../../services/api'

export default async function exportData(fileName, columns, entities) {

    let csv = columns.join(',') + '\n';
    // let offset = 0;
    // let entities = [];
    // let res = await (API.search(opt.collection, opt.value, 100, offset));
    // while (res.docs.length > 0) {
    //     entities = entities.concat(res.docs)
    //     offset += 100;
    //     res = await (API.search(opt.collection, opt.value, 100, offset));
    // }
    for (var j = 0; j < entities.length; j++) {
        const arr = []
        for (var i = 0; i < columns.length; i++) {
            arr.push('"' + ('' + entities[j]._source[columns[i]]).replace(/"/g, '""') + '"');
        }
        csv += arr.join(',') + '\n'
    }



    initiateFileDownload(stringToArray(csv), fileName);

    /*
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName;
    hiddenElement.click();*/
}





function stringToArray(bufferString) {
    let uint8Array = new TextEncoder("utf-8").encode(bufferString);
    return uint8Array;
}

function byteArrayToBase64(bytes) {
    var chArray = Array.prototype.map.call(bytes, function (byte) { return String.fromCharCode(byte); });
    return window.btoa(chArray.join(""));
}

var octetStreamMimeType = "application/octet-stream";


// fileBytes is a Uint8Array
function initiateFileDownload(fileBytes, fileName) {
    //trySaveAsDownload
    var blob;
    if (window.saveAs) {
        blob = new Blob([fileBytes], { type: octetStreamMimeType });
        saveAs(blob, fileName);
        return true;
    }

    //tryAnchorDownload
    var aElement = document.createElement("a");
    var event;
    if ("download" in aElement) {
        aElement.setAttribute("download", fileName);
        aElement.href = "data:" + octetStreamMimeType + ";base64," + byteArrayToBase64(fileBytes);
        document.body.appendChild(aElement);
        event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        aElement.dispatchEvent(event);
        document.body.removeChild(aElement);
        return true;
    }
    return false;

}

