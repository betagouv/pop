const fs = require('fs');
const xml2js = require('xml2js');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const datafolder = './data/thesaurus/';
const Mongo = require('../../src/mongo');

const parser = new xml2js.Parser();

const Thesaurus = require('../../src/models/thesaurus')

function load() {
    return new Promise(async (resolve, reject) => {
        const files = fs.readdirSync(datafolder);
        for (var i = 0; i < files.length; i++) {
            const data = fs.readFileSync(datafolder + files[i], 'utf8');
            try {
                await (exec(data));
            } catch (e) {
                console.log('ERR', e)
            }
            console.log('END')
        }
        console.log('END')
        resolve()
    })
}

function exec(data) {
    return new Promise((resolve, reject) => {
        parser.parseString(data, (err, result) => {
            const id = result.gincoExportedThesaurus.thesaurus[0].identifier[0];
            const filtered = result.gincoExportedThesaurus.terms.filter(e => (e.status[0] === '1' && e.language[0].id[0] === 'fr-FR'))
            const arr = filtered.map(e => new Thesaurus({ arc: id, value: e.lexicalValue[0] }));
            console.log('LA')
            Thesaurus.insertMany(arr, function (err, docs) {
                console.log(err)
                console.log('SAVED ', docs.length)
                resolve();
            });
        });
    });
}

setTimeout(() => {
    load().then((e) => { console.log('DONE') }).catch((e) => { console.log(e) });
}, 5000)

