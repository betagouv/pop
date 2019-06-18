const request = require("supertest");
const User = require("../../models/user");
const Joconde = require("../../models/joconde");
const Mnr = require("../../models/mnr");
const Memoire = require("../../models/memoire");
const Palissy = require("../../models/palissy");
const Merimee = require("../../models/merimee");

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

module.exports = {
  getJwtToken,
  removeAllUsers,
  removeJocondeNotices,
  removeMnrNotices,
  removeMemoireNotices,
  removePalissyNotices,
  removeMerimeeNotices,
  createUser
};
