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

describe("POST /joconde", () => {
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

  test(`It should create a notice for "administrateur" (group: "admin")`, async () => {
    const res = await createNotice(await createUser(), 200);
    expect(res.success).toBe(true);
  });
  const jocondeUserOk = { group: "joconde", role: "producteur", museofile: "M5031" };
  test(`It should create a notice for user ${JSON.stringify(jocondeUserOk)}`, async () => {
    const res = await createNotice(await createUser(jocondeUserOk), 200);
    expect(res.success).toBe(true);
  });
  const jocondeUserNotOk = { group: "joconde", role: "producteur", museofile: "M9999" };
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
    const user = await createUser()
    let res = await createNotice(user, 200);
    expect(res.success).toBe(true);
    res = await createNotice(user, 500);
    expect(res.success).toBe(false);
  });
});
