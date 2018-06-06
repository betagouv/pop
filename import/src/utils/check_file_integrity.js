module.exports = function showInconsistentLines(file) {
    return new Promise((resolve, reject) => {
        let linesCount = null;
        let linesWithIssues = []
        const arr = [];
        const input = require('fs').createReadStream(file, 'latin1');
        var lineReader = require('readline').createInterface({ input });
        lineReader.on('line', (line) => {
            if (linesCount === null) {
                linesCount = (line.match(/\|/g) || []).length
            }
            if ((line.match(/\|/g) || []).length !== linesCount) {
                arr.push({ file, message: `Line should have ${linesCount} collumn and has ${(line.match(/\|/g) || []).length}`, line })
            }
        });
        input.on('end', () => {
            resolve(arr);
        })
    })
}