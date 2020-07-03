const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const { createUser,
  getJwtToken,
  removeAllUsers,
  removeMnrNotices,
  removeOAINotices,
  createProducteurs,
  createGroups,
  removeProducteurs,
  removeGroups} = require("./setup/helpers");
const sampleNotice = require("./__notices__/mnr-1");

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
  removeMnrNotices();
  removeOAINotices();
});

async function createNotice(user, expectedStatus = 200) {
  const response = await request(app)
    .post("/mnr")
    .field("notice", JSON.stringify(sampleNotice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function updateNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .put(`/mnr/${notice.REF}`)
    .field("notice", JSON.stringify(notice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function deleteNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .delete(`/mnr/${notice.REF}`)
    .set("Accept", "application/json")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

describe("POST /mnr", () => {
  test(`It should create a notice for "administrateur" (group: "admin")`, async () => {
    await createGroups();
    await createProducteurs();
    
    const res = await createNotice(await createUser(), 200);
    expect(res.success).toBe(true);
  });
  const mnrUserOk = { group: "mnr", role: "producteur" };
  test(`It should create a notice for user ${JSON.stringify(mnrUserOk)}`, async () => {
    const res = await createNotice(await createUser(mnrUserOk), 200);
    expect(res.success).toBe(true);
  });
  const mnrUserNotOk = { group: "mnr", role: "utilisateur" };
  test(`It should not authorize user ${JSON.stringify(mnrUserNotOk)}`, async () => {
    const res = await createNotice(await createUser(mnrUserNotOk), 401);
    expect(res.success).toBe(false);
  });
  const memoireUser = { group: "memoire", role: "producteur" };
  test(`It should not authorize user ${JSON.stringify(memoireUser)}`, async () => {
    const res = await createNotice(await createUser(memoireUser), 401);
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

describe("PUT /mnr/:ref", () => {
  const mnrUserOk = { group: "mnr", role: "producteur" };
  test(`It should update a notice for ${JSON.stringify(mnrUserOk)}`, async () => {
    const user = await createUser(mnrUserOk);
    let res = await createNotice(user, 200);
    res = await updateNotice(user, 200);
    expect(res.success).toBe(true);
  });
});

describe("DELETE /mnr/:ref", () => {
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
  const memoireUser = { group: "memoire", role: "producteur" };
  test(`It should not authorize user ${JSON.stringify(memoireUser)}`, async () => {
    const user = await createUser(memoireUser);
    let res = await createNotice(await createUser({ email: "lol@example.com" }), 200);
    res = await deleteNotice(user, 401);
    expect(res.success).toBe(false);
  });
});

describe("GET /mnr/:ref", () => {
  test(`It should return a notice by for everyone`, async () => {
    await removeProducteurs();
    await removeGroups();

    let res = await createNotice(await createUser(), 200);
    res = await request(app)
      .get(`/mnr/${sampleNotice.REF}`)
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.TITR).toBe(sampleNotice.TITR);
  });
  test(`It should return 404 for non-existant notice`, async () => {
    const res = await request(app)
      .get("/mnr/LOL")
      .set("Accept", "application/json")
      .expect(404);
    expect(res.body.success).toBe(false);
  });
});
 