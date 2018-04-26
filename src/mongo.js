var mongoose = require('mongoose');

function startDatabase() {
    return new Promise((resolve, reject) => {
        //Set up default mongoose connection
        const mongoDB = 'mongodb://127.0.0.1/merimee';
        mongoose.connect(mongoDB);// Get Mongoose to use the global promise library
        mongoose.Promise = global.Promise;//Get the default connection
        let db = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log('CONNECTED OK')
            resolve(db)
        })
    })
}


module.exports = startDatabase;