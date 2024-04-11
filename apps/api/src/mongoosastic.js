const { logger } = require("./logger");
const { ovh } = require("./config");

if (ovh) {
	logger.info("Using mongoosastic5");
	module.exports = require("mongoosastic5");
} else {
	logger.info("Using mongoosastic");
	module.exports = require("mongoosastic");
}
