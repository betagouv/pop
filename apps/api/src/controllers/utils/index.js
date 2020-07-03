const {
  lambertToWGS84,
  isInFrance,
  convertCOORM,
  getPolygonCentroid,
  hasCorrectCoordinates,
  hasCorrectPolygon
} = require("./geoloc");
const { deleteFile, uploadFile } = require("./s3");
const {
  getNewId,
  checkESIndex,
  updateNotice,
  updateOaiNotice,
  findMemoireProducteur,
  findMerimeeProducteur,
  findPalissyProducteur,
  identifyProducteur
} = require("./notice");
const { formattedNow } = require("./date");
const { getBaseCompletName } = require("./OAI/oai_utils")
module.exports = {
  uploadFile,
  deleteFile,
  formattedNow,
  getNewId,
  checkESIndex,
  updateNotice,
  updateOaiNotice,
  lambertToWGS84,
  isInFrance,
  convertCOORM,
  getPolygonCentroid,
  hasCorrectCoordinates,
  hasCorrectPolygon,
  findMemoireProducteur,
  findMerimeeProducteur,
  findPalissyProducteur,
  identifyProducteur,
  getBaseCompletName
};
