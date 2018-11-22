const request = require("supertest");
const User = require("../../models/user");

async function createUser() {
  const email = "a@example.com";
  const password = "secret";
  const user = {
    institution: "random",
    email,
    group: "admin",
    role: "admin",
    password
  };
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
  await User.remove({});
}

module.exports = {
  getJwtToken,
  removeAllUsers,
  createUser
};
