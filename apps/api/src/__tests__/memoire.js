const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const {
  createUser,
  getJwtToken,
  removeAllUsers,
  removeMemoireNotices
} = require("./setup/helpers");
const sampleNotice = require("./__notices__/memoire-1");

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
  removeMemoireNotices();
});

async function createNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .post("/memoire")
    .field("notice", JSON.stringify(notice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function updateNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .put(`/memoire/${notice.REF}`)
    .field("notice", JSON.stringify(notice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function deleteNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .delete(`/memoire/${notice.REF}`)
    .set("Accept", "application/json")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

describe("POST /memoire", () => {
  // PRODUCTEUR: "AUTRE"
  test(`It should create a notice { PRODUCTEUR: "AUTRE" } for "administrateur" (group: "admin")`, async () => {
    const res = await createNotice(await createUser(), 200);
    expect(res.success).toBe(true);
  });
  const memoireUserOk = { group: "memoire", role: "producteur" };
  test(`It should create a notice { PRODUCTEUR: "AUTRE" } for user ${JSON.stringify(
    memoireUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(memoireUserOk), 200);
    expect(res.success).toBe(true);
  });
  const mhUserOk = { group: "mh", role: "producteur" };
  test(`It should create a notice { PRODUCTEUR: "AUTRE" } for user ${JSON.stringify(
    mhUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(mhUserOk), 200);
    expect(res.success).toBe(true);
  });
  // PRODUCTEUR: "CAOA"
  const caoaNotice = { ...sampleNotice, REF: "OAXXX" };
  test(`It should create a notice { PRODUCTEUR: "CAOA" } for user ${JSON.stringify(
    mhUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(mhUserOk), 200, caoaNotice);
    expect(res.success).toBe(true);
  });
  test(`It should not create a notice { PRODUCTEUR: "CAOA" } for user ${JSON.stringify(
    memoireUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(memoireUserOk), 401, caoaNotice);
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

describe("PUT /memoire/:ref", () => {
  const memoireUserOk = { group: "memoire", role: "producteur", email: "lol@example.com" };
  const mhUserOk = { group: "mh", role: "producteur", email: "lol@example.com" };
  const caoaNotice = { ...sampleNotice, REF: "OAXXX" };

  test(`It should update a notice for ${JSON.stringify(memoireUserOk)}`, async () => {
    const user = await createUser(memoireUserOk);
    let res = await createNotice(user, 200);
    res = await updateNotice(user, 200);
    expect(res.success).toBe(true);
  });
  test(`It should update a notice for ${JSON.stringify(mhUserOk)}`, async () => {
    const user = await createUser(mhUserOk);
    let res = await createNotice(await createUser(), 200, caoaNotice);
    res = await updateNotice(user, 200, caoaNotice);
    expect(res.success).toBe(true);
  });
  test(`It should not update a notice { PRODUCTEUR: "CAOA" } for ${JSON.stringify(
    memoireUserOk
  )}`, async () => {
    const user = await createUser(memoireUserOk);
    let res = await createNotice(await createUser(), 200, caoaNotice);
    res = await updateNotice(user, 401, caoaNotice);
    expect(res.success).toBe(false);
    res = await updateNotice(user, 401);
    expect(res.success).toBe(false);
  });
});

describe("DELETE /memoire/:ref", () => {
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
  const memoireUser = { group: "joconde", role: "producteur" };
  test(`It should not authorize user ${JSON.stringify(memoireUser)}`, async () => {
    const user = await createUser(memoireUser);
    let res = await createNotice(await createUser({ email: "lol@example.com" }), 200);
    res = await deleteNotice(user, 401);
    expect(res.success).toBe(false);
  });
});

describe("GET /memoire/:ref", () => {
  test(`It should return a notice by for everyone`, async () => {
    let res = await createNotice(await createUser(), 200);
    res = await request(app)
      .get(`/memoire/${sampleNotice.REF}`)
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.TITR).toBe(sampleNotice.TITR);
  });
  test(`It should return 404 for non-existant notice`, async () => {
    const res = await request(app)
      .get("/memoire/LOL")
      .set("Accept", "application/json")
      .expect(404);
    expect(res.body.success).toBe(false);
  });
});
