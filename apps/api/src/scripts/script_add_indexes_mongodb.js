db.joconde.createIndex({REFMEM: 1});
db.joconde.createIndex({REFMER: 1});
db.joconde.createIndex({REFPAL: 1});

db.memoire.createIndex({REFJOC: 1});
db.memoire.createIndex({REFMUS: 1});

db.merimee.createIndex({REFJOC: 1});
db.merimee.createIndex({REFMUS: 1});

db.museo.createIndex({REFMEM: 1});
db.museo.createIndex({REFMER: 1});
db.museo.createIndex({REFPAL: 1});

db.palissy.createIndex({REFJOC: 1});
db.palissy.createIndex({REFMUS: 1});