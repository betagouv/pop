const mongoose = require("mongoose");
const { mongoUrl, dbName } = require("./config.js");

mongoose.set("useUnifiedTopology", true); // Use the new ServerDiscover and Monitoring engine and prevent warning for use of the older.
mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	dbName,
}); // Get Mongoose to use the global promise library
mongoose.Promise = global.Promise; // Get the default connection
const db = mongoose.connection;

if (process.env.NODE_ENV !== "test") {
	// Bind connection to error event (to get notification of connection errors)
	db.on("error", console.error.bind(console, "MongoDB connection error:"));
	db.once("open", () => {
		console.log("CONNECTED OK");
	});
}

module.exports = db;
