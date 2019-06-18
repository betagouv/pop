const request = require("supertest");
const User = require("../../models/user");
const Joconde = require("../../models/joconde");
const Mnr = require("../../models/mnr");

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

module.exports = {
  getJwtToken,
  removeAllUsers,
  removeJocondeNotices,
  removeMnrNotices,
  createUser
};
