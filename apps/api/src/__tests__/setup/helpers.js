const request = require("supertest");
const User = require("../../models/user");
const Joconde = require("../../models/joconde");
const Mnr = require("../../models/mnr");
const Memoire = require("../../models/memoire");
const Palissy = require("../../models/palissy");
const Merimee = require("../../models/merimee");
const noticeOAI = require("../../models/noticesOAI");
const Producteur = require("../../models/producteur");
const Groups = require("../../models/group");

async function createUser(props = {}) {
  const user = {
    institution: "random",
    email: "a@example.com",
    group: "admin",
    role: "administrateur",
    password: "secret",
    ...props
  };
  await User.deleteOne({ email: user.email });
  await new User(user).save();
  return user;
}

async function getJwtToken(app, user) {
  const response = await request(app)
    .post("/auth/signin")
    .send({ email: user.email, password: user.password })
    .expect(200);
  return response.body.token;
}

async function removeAllUsers() {
  await User.deleteMany();
}
async function removeJocondeNotices() {
  await Joconde.deleteMany();
}
async function removeMnrNotices() {
  await Mnr.deleteMany();
}
async function removeMemoireNotices() {
  await Memoire.deleteMany();
}
async function removePalissyNotices() {
  await Palissy.deleteMany();
}
async function removeMerimeeNotices() {
  await Merimee.deleteMany();
}
async function removeOAINotices() {
  await noticeOAI.deleteMany();
}
async function createProducteurs() {
  await new Producteur({"BASE":[{"base":"joconde","prefixes":[]}],"LABEL":"MUSEE","__v":0}).save();
  await new Producteur({"BASE":[{"base":"mnr","prefixes":[]}],"LABEL":"MNR","__v":0}).save();
  await new Producteur({"BASE":[{"base":"autor","prefixes":["OR"]},{"base":"merimee","prefixes":["IA"]},{"base":"palissy","prefixes":["IM"]}],"LABEL":"Inventaire","__v":0}).save();
  await new Producteur({"BASE":[{"base":"memoire","prefixes":["AR"]}],"LABEL":"ARCH","__v":0}).save();
  await new Producteur({"BASE":[{"base":"memoire","prefixes":["MH"]}],"LABEL":"CRMH","__v":0}).save();
  await new Producteur({"BASE":[{"base":"memoire","prefixes":["OA"]}],"LABEL":"CAOA","__v":0}).save();
  await new Producteur({"BASE":[{"base":"memoire","prefixes":["AP"]}],"LABEL":"UDAP","__v":0}).save();
  await new Producteur({"BASE":[{"base":"palissy","prefixes":["EM"]},{"base":"merimee","prefixes":["EA"]}],"LABEL":"Ã‰tat","__v":0}).save();
  await new Producteur({"BASE":[{"base":"memoire","prefixes":["IVN","IVR","IVD","IVC"]}],"LABEL":"INV","__v":0}).save();
  await new Producteur({"BASE":[{"base":"palissy","prefixes":["PM"]},{"base":"merimee","prefixes":["PA"]}],"LABEL":"Monuments Historiques","__v":0}).save();
  await new Producteur({"BASE":[{"base":"memoire","prefixes":[]},{"base":"autor","prefixes":["AW","AA","AC","AB"]}],"LABEL":"MAP","__v":0}).save();
  await new Producteur({"BASE":[{"base":"memoire","prefixes":[]},{"base":"palissy","prefixes":[]},{"base":"merimee","prefixes":[]}],"LABEL":"AUTRE","__v":0}).save();
  await new Producteur({"BASE":[{"base":"palissy","prefixes":["JDP"]},{"base":"merimee","prefixes":["SJDP"]},{"base":"memoire","prefixes":["AJDP"]}],"LABEL":"Jeu de Paume","__v":0}).save();
  await new Producteur({"BASE":[{"base":"autor","prefixes":["MV"]}],"LABEL":"Corpus Vitrearum","__v":0}).save();
}
async function createGroups() {
  await new Groups({"PRODUCTEURS":["MUSEE"],"LABEL":"joconde","__v":0}).save();
  await new Groups({"PRODUCTEURS":["Inventaire","INV","AUTRE"],"LABEL":"inv","__v":0}).save();
  await new Groups({"PRODUCTEURS":["CRMH","CAOA","UDAP","Ã‰tat","AUTRE","Monuments Historiques","MAP","Jeu de Paume","Corpus Vitrearum"],"LABEL":"mh","__v":0}).save();
  await new Groups({"PRODUCTEURS":["AUTRE","MAP"],"LABEL":"memoire","__v":0}).save();
  await new Groups({"PRODUCTEURS":["Monuments Historiques"],"LABEL":"PM28","__v":0}).save();
  await new Groups({"PRODUCTEURS":["MNR"],"LABEL":"mnr","__v":0}).save();
}
async function removeProducteurs() {
  await Producteur.deleteMany();
}
async function removeGroups() {
  await Groups.deleteMany();
}

module.exports = {
  getJwtToken,
  removeAllUsers,
  removeJocondeNotices,
  removeMnrNotices,
  removeMemoireNotices,
  removePalissyNotices,
  removeMerimeeNotices,
  removeOAINotices,
  createUser,
  createGroups,
  createProducteurs,
  removeGroups,
  removeProducteurs
};
