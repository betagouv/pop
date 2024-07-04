const { logLevel } = require("./config");
const logger = require("pino-http")({ level: logLevel });

module.exports = logger;
