var mongoose = require('mongoose');
const { mongo_url } = require('./config.js');

console.log('mongo_url',mongo_url)
//Set up default mongoose connection

mongoose.connect(mongo_url);// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('CONNECTED OK')
})

module.exports = db;