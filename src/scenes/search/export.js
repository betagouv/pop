import API from '../../services/api'

export default async function exportData(fileName, columns, entities) {

    let csv = columns.join(';') + '\n';
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
            arr.push(entities[j]._source[columns[i]]);
        }
        csv += arr.join(';') + '\n'
    }

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName;
    hiddenElement.click();
}

