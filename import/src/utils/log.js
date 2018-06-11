var fs = require('fs');

module.exports = function log(type, ref, message, content) {
    const normalizedContent = ('' + content).replace(',', '\,').replace('"', '');
    console.log(`${type},${ref},${message},"${normalizedContent}"`)

    const str = `${type},${ref},${message},"${normalizedContent}"\n`

    fs.appendFileSync(`./${type}.log`, str, (err) => {
        console.log('Error saved')
    });
}

