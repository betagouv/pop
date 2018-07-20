class Export {
    generate(notices, base) {

        const d = new Date();
        const date = ('0' + d.getDate()).slice(-2);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();
        const minutes = ('0' + d.getMinutes()).slice(-2);
        const hours = ('0' + d.getHours()).slice(-2);
        const secondes = ('0' + d.getSeconds()).slice(-2);
        const fileName = `Import${base}_${year}${month}${date}_${hours}h${minutes}m${secondes}s.csv`

        let csv = '';
        const columns = ["Identifiant Joconde", "N° inventaire", "Etat", "Details"];
        csv += columns.join(',') + '\n';


        const created = notices.filter(e => e.status === 'created');
        const updated = notices.filter(e => e.status === 'updated');
        const rejected = notices.filter(e => e.status === 'rejected');

        const lines = [];

        for (var i = 0; i < created.length; i++) {
            lines.push([`"${created[i].notice.REF}"`, `"${created[i].notice.INV}"`, 'Création', ''].join(','))

            for (var j = 0; j < created[i].warnings.length; j++) {
                lines.push([`"${created[i].notice.REF}"`, `"${created[i].notice.INV}"`, 'Avertissement', `"${created[i].warnings[j]}"`].join(','))
            }
        }

        for (var i = 0; i < updated.length; i++) {
            lines.push([`"${updated[i].notice.REF}"`, `"${updated[i].notice.INV}"`, 'Modification', ''].join(','))

            for (var j = 0; j < updated[i].messages.length; j++) {
                lines.push([`"${updated[i].notice.REF}"`, `"${updated[i].notice.INV}"`, 'Changement', `"${updated[i].messages[j]}"`].join(','))
            }
            for (var j = 0; j < updated[i].warnings.length; j++) {
                lines.push([`"${updated[i].notice.REF}"`, `"${updated[i].notice.INV}"`, 'Avertissement', `"${updated[i].warnings[j]}"`].join(','))
            }
        }

        for (var i = 0; i < rejected.length; i++) {
            lines.push([`"${rejected[i].notice.REF}"`, `"${rejected[i].notice.INV}"`, 'Rejet', ''].join(','))
            for (var j = 0; j < rejected[i].errors.length; j++) {
                lines.push([`"${rejected[i].notice.REF}"`, `"${rejected[i].notice.INV}"`, 'Erreur', `"${rejected[i].errors[j]}"`].join(','))
            }
            for (var j = 0; j < rejected[i].warnings.length; j++) {
                lines.push([`"${rejected[i].notice.REF}"`, `"${rejected[i].notice.INV}"`, 'Avertissement', `"${rejected[i].warnings[j]}"`].join(','))
            }
        }

        csv += lines.join('\n');

        initiateFileDownload(csv,fileName);

        // let fileBytes = new TextEncoder("utf-8").encode(csv);
        // var octetStreamMimeType = "application/octet-stream";

        // var blob;    //trySaveAsDownload
        // if (window.saveAs) {
        //     blob = new Blob([fileBytes], { type: octetStreamMimeType });
        //     saveAs(blob, fileName);
        //     return true;
        // }

        // var chArray = Array.prototype.map.call(fileBytes, function (byte) { return String.fromCharCode(byte); });
        // let base64 = window.btoa(chArray.join(""));

        // var aElement = document.createElement("a");    //tryAnchorDownload
        // var event;
        // if ("download" in aElement) {
        //     aElement.setAttribute("download", fileName);
        //     aElement.href = "data:" + octetStreamMimeType + ";base64," + base64;
        //     document.body.appendChild(aElement);
        //     event = document.createEvent("MouseEvents");
        //     event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        //     aElement.dispatchEvent(event);
        //     document.body.removeChild(aElement);
        //     return true;
        // }
        // return false;

    }

}

function initiateFileDownload(csv, fileName) {

    var blob = new Blob([csv]);
    if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
        window.navigator.msSaveBlob(blob, fileName);
    else {
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
        a.download = fileName;
        document.body.appendChild(a);
        a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        document.body.removeChild(a);
    }
}

const d = new Export();
export default d;
