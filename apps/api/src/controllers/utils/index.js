const {
  lambertToWGS84,
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
  findMemoireProducteur,
  findMerimeeProducteur,
  findPalissyProducteur
} = require("./notice");
const { formattedNow } = require("./date");

module.exports = {
  uploadFile,
  deleteFile,
  formattedNow,
  getNewId,
  checkESIndex,
  updateNotice,
  lambertToWGS84,
  convertCOORM,
  getPolygonCentroid,
  hasCorrectCoordinates,
  hasCorrectPolygon,
  findMemoireProducteur,
  findMerimeeProducteur,
  findPalissyProducteur
};
