const Mongo = require('../src/mongo');
const Joconde = require('../src/models/joconde');
const Mnr = require('../src/models/mnr');


function SyncES() {
    var stream = Joconde.synchronize({}, {}, { timeout: true })
    var count = 0;

    stream.on('data', function (doc) {
        console.log('done', count++)
    })

    stream.on('close', function () {
        console.log('indexed ' + count + ' documents!');
    });
}

// function SyncES() {
//     next(0)
// }

function next(offset) {
    Joconde.paginate({}, { offset, limit: 1000 }, (err, result) => {
        const arr = [];
        for (var i = 0; i < result.docs.length; i++) {
            arr.push(new Promise((resolve) => { result.docs[i].index((err, res) => { resolve(); }); }));
        }
        Promise.all(arr).then(() => {
            next(offset + 1000);
            console.log('NEXT ', offset + 1000)
        })
    });
}





setTimeout(() => {
    SyncES();
}, 5000)