const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const {
  createUser,
  getJwtToken,
  removeAllUsers,
  removePalissyNotices
} = require("./setup/helpers");
const sampleNotice = require("./__notices__/palissy-1");

jest.mock("../elasticsearch");
const es = require("../elasticsearch");
es.mockImplementation(() => ({}));

jest.mock("../controllers/utils");
const { checkESIndex } = require("../controllers/utils");
checkESIndex.mockImplementation(() => ({}));

jest.mock("mongoosastic");
const mongoosastic = require("mongoosastic");
mongoosastic.mockImplementation(() => ({}));

afterAll(() => mongoose.disconnect());
beforeEach(() => {
  removeAllUsers();
  removePalissyNotices();
});

async function createNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .post("/palissy")
    .field("notice", JSON.stringify(notice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function updateNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .put(`/palissy/${notice.REF}`)
    .field("notice", JSON.stringify(notice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function deleteNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .delete(`/palissy/${notice.REF}`)
    .set("Accept", "application/json")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

describe("POST /palissy", () => {
  // PRODUCTEUR: "Monuments Historiques"
  test(`It should create a notice { PRODUCTEUR: "Monuments Historiques" } for "administrateur" (group: "admin")`, async () => {
    const res = await createNotice(await createUser(), 200);
    expect(res.success).toBe(true);
  });
  const invUserOk = { group: "inv", role: "producteur" };
  test(`It should not create a notice { PRODUCTEUR: "Monuments Historiques" } for user ${JSON.stringify(
    invUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(invUserOk), 401);
    expect(res.success).toBe(false);
  });

  const mhUserOk = { group: "mh", role: "producteur" };
  test(`It should create a notice { PRODUCTEUR: "Monuments Historiques" } for user ${JSON.stringify(
    mhUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(mhUserOk), 200);
    expect(res.success).toBe(true);
  });
  // PRODUCTEUR: "Inventaire"
  const invNotice = { ...sampleNotice, REF: "IM97600007" };
  test(`It should create a notice { PRODUCTEUR: "Inventaire" } for user ${JSON.stringify(
    invUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(invUserOk), 200, invNotice);
    expect(res.success).toBe(true);
  });
  test(`It should not create a notice { PRODUCTEUR: "Inventaire" } for user ${JSON.stringify(
    mhUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(mhUserOk), 401, invNotice);
    expect(res.success).toBe(false);
  });
  // Other tests
  const jocondeUser = { group: "joconde", role: "producteur" };
  test(`It should not authorize user ${JSON.stringify(jocondeUser)}`, async () => {
    const res = await createNotice(await createUser(jocondeUser), 401);
    expect(res.success).toBe(false);
  });
  test(`It should not create a notice twice with same REF`, async () => {
    const user = await createUser();
    let res = await createNotice(user, 200);
    expect(res.success).toBe(true);
    res = await createNotice(user, 500);
    expect(res.success).toBe(false);
  });
});

describe("PUT /palissy/:ref", () => {
  const invNotice = { ...sampleNotice, REF: "IM97600007" };
  const invUserOk = { group: "inv", role: "producteur" };
  test(`It should update a notice for ${JSON.stringify(invUserOk)}`, async () => {
    const user = await createUser(invUserOk);
    let res = await createNotice(user, 200, invNotice);
    res = await updateNotice(user, 200, invNotice);
    expect(res.success).toBe(true);
  });
});

describe("DELETE /palissy/:ref", () => {
  test(`It should delete an existing notice`, async () => {
    const user = await createUser();
    let res = await createNotice(user, 200);
    res = await deleteNotice(user, 200);
    expect(res.success).toBe(true);
  });
  test(`It should return 404 on deleting a non-existent notice`, async () => {
    const res = await deleteNotice(await createUser(), 404);
    expect(res.success).toBe(false);
  });
  const palissyUser = { group: "joconde", role: "producteur" };
  test(`It should not authorize user ${JSON.stringify(palissyUser)}`, async () => {
    const user = await createUser(palissyUser);
    let res = await createNotice(await createUser({ email: "lol@example.com" }), 200);
    res = await deleteNotice(user, 401);
    expect(res.success).toBe(false);
  });
});

describe("GET /palissy/:ref", () => {
  test(`It should return a notice by for everyone`, async () => {
    let res = await createNotice(await createUser(), 200);
    res = await request(app)
      .get(`/palissy/${sampleNotice.REF}`)
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.TITR).toBe(sampleNotice.TITR);
  });
  test(`It should return 404 for non-existant notice`, async () => {
    const res = await request(app)
      .get("/palissy/LOL")
      .set("Accept", "application/json")
      .expect(404);
    expect(res.body.success).toBe(false);
  });
});
