const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const {
  createUser,
  getJwtToken,
  removeAllUsers,
  removeJocondeNotices
} = require("./setup/helpers");
const sampleNotice = require("./__notices__/joconde-1");

jest.mock("../elasticsearch");
const es = require("../elasticsearch");
es.mockImplementation(() => ({}));

jest.mock("../controllers/utils");
const { checkESIndex } = require("../controllers/utils");
checkESIndex.mockImplementation(() => ({}));

afterAll(() => mongoose.disconnect());
beforeEach(() => {
  removeAllUsers();
  removeJocondeNotices();
});

async function createNotice(user, expectedStatus = 200) {
  const response = await request(app)
    .post("/joconde")
    .field("notice", JSON.stringify(sampleNotice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function updateNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .put(`/joconde/${notice.REF}`)
    .field("notice", JSON.stringify(notice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function deleteNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .delete(`/joconde/${notice.REF}`)
    .field("notice", JSON.stringify(notice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Authorization", await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

describe("POST /joconde", () => {
  test(`It should create a notice for "administrateur" (group: "admin")`, async () => {
    const res = await createNotice(await createUser(), 200);
    expect(res.success).toBe(true);
  });
  const jocondeUserOk = { group: "joconde", role: "producteur", museofile: ["M5031"] };
  test(`It should create a notice for user ${JSON.stringify(jocondeUserOk)}`, async () => {
    const res = await createNotice(await createUser(jocondeUserOk), 200);
    expect(res.success).toBe(true);
  });
  const jocondeUserNotOk = { group: "joconde", role: "producteur", museofile: ["M9999"] };
  test(`It should not authorize user ${JSON.stringify(jocondeUserNotOk)}`, async () => {
    const res = await createNotice(await createUser(jocondeUserNotOk), 401);
    expect(res.success).toBe(false);
  });
  const memoireUser = { group: "memoire", role: "utilisateur" };
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

describe("PUT /joconde/:ref", () => {
  const jocondeUserOk = { group: "joconde", role: "producteur", museofile: ["M5031"] };
  test(`It should update a notice for ${JSON.stringify(jocondeUserOk)}`, async () => {
    const user = await createUser(jocondeUserOk);
    let res = await createNotice(user, 200);
    res = await updateNotice(user, 200);
    expect(res.success).toBe(true);
  });
  test(`It should not authorize ${JSON.stringify(jocondeUserOk)} to change MUSEO`, async () => {
    const user = await createUser(jocondeUserOk);
    let res = await createNotice(user, 200);
    // Fail on museo changed
    res = await updateNotice(user, 401, { ...sampleNotice, MUSEO: "M9999" });
    expect(res.success).toBe(false);
  });
});

describe("DELETE /joconde/:ref", () => {
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
  const memoireUser = { group: "memoire", role: "utilisateur" };
  test(`It should not authorize user ${JSON.stringify(memoireUser)}`, async () => {
    const user = await createUser(memoireUser);
    let res = await createNotice(await createUser({email: "lol@example.com"}), 200);
    res = await deleteNotice(user, 401);
    expect(res.success).toBe(false);
  });
});
