const Mongo = require('../src/mongo');
const Joconde = require('../src/models/joconde');
const Mnr = require('../src/models/mnr');

async function run(collection, transform) {
    let offset = 0;
    const limit = 1000;
    let stillData = true;
    while (stillData) {
        const results = await (collection.paginate({}, { offset, limit }));
        if (results.total - results.offset < 0) {
            console.log('END');
            stillData = false;
        }
        console.log(`${results.offset + limit}/${results.total}`);
        const arr = [];
        var bulk = collection.collection.initializeOrderedBulkOp();
        for (var i = 0; i < results.docs.length; i++) {
            const update = transformfunction(results.docs[i]);
            if (update) {
                bulk.find({ '_id': results.docs[i]._id }).update({ $set: update });
            }
        }

        if (bulk && bulk.s && bulk.s.currentBatch && bulk.s.currentBatch.operations && bulk.s.currentBatch.operations.length > 0) {
            console.log(`update ${bulk.s.currentBatch.operations.length} documents`)
            await (bulk.execute());
        }
        offset += limit;
    }
}


function transformfunction(obj) {
    if (obj.DMIS || obj.DMAJ) {
        var DMIS = obj.DMIS.replace('/', '-');
        var DMAJ = obj.DMAJ.replace('/', '-');
        return { DMIS, DMAJ };
    }
    return null;
}



setTimeout(() => {
    run(Joconde, transformfunction);
}, 5000)