const { ovh } = require("./config.js");

if (ovh) {
	console.log("Using mongoosastic5");
	module.exports = require("mongoosastic5");
} else {
	console.log("Using mongoosastic");
	module.exports = require("mongoosastic");
}
