const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const { createUser,
  getJwtToken,
  removeAllUsers
  } = require("./setup/helpers");


afterAll(() => mongoose.disconnect());
beforeEach(() => {
  removeAllUsers();
});


async function updatePassword(user, expectedStatus = 200, body) {
  const response = await request(app)
    .post(`/auth/updatePassword`)
    .set("Accept", "*/*")
    .set("Content-Type", "application/json")
    .set("Authorization", await getJwtToken(app, user))
    .send(JSON.stringify(body))
    .expect(expectedStatus);
  return response.body;
}

describe("POST /auth/updatePassword", () => {
  test(`Mise à jour refusée, mot de passe vide`, async () => {
    const user = await createUser();
    const res = await updatePassword(user, 400, { email: user.email, pwd: user.password, pwd1: "", pwd2: "" });
    expect(res.success).toBe(false);
  });

  test(`Mise à jour refusée, mot de passe non conforme (inférieur à 12 caractères)`, async () => {
    const user = await createUser();
    const res = await updatePassword(user, 401, { email: user.email, pwd: user.password, pwd1: "test123", pwd2: "test123" });
    expect(res.success).toBe(false);
  });

  test(`Mise à jour refusée, mot de passe non conforme (sans chiffre)`, async () => {
    const user = await createUser();
    const res = await updatePassword(user, 401, { email: user.email, pwd: user.password, pwd1: "frtFtest/*/*", pwd2: "frtFtest/*/*" });
    expect(res.success).toBe(false);
  });

  test(`Mise à jour refusée, mot de passe non conforme (sans majuscule)`, async () => {
    const user = await createUser();
    const res = await updatePassword(user, 401, { email: user.email, pwd: user.password, pwd1: "frt1test/*/*", pwd2: "frt1test/*/*" });
    expect(res.success).toBe(false);
  });

  test(`Mise à jour refusée, mot de passe non conforme (sans caractères spéciaux)`, async () => {
    const user = await createUser();
    const res = await updatePassword(user, 401, { email: user.email, pwd: user.password, pwd1: "frt1testTEST", pwd2: "frt1testTEST" });
    expect(res.success).toBe(false);
  });

  test(`Mise à jour autorisée`, async () => {
    const user = await createUser();
    const res = await updatePassword(user, 200, { email: user.email, pwd: user.password, pwd1: "frt123*/TEST", pwd2: "frt123*/TEST" });
    expect(res.success).toBe(true);
  });
});
 