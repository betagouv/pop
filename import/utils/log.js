var fs = require('fs');
function log(type, ref, message, content) {
    const normalizedContent = ('' + content).replace(',', '\,').replace('"', '');
    const str = `${type},${ref},${message},"${normalizedContent}"\n`
    console.log(`${type},${ref},${message},"${normalizedContent}"`)
    fs.appendFileSync('parsingerrors.csv', str, (err) => {
        console.log('Error saved')
    });
}

module.exports = {
    log
}