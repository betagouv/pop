const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const {
  createUser,
  getJwtToken,
  removeAllUsers,
  removeMemoireNotices,
  removeOAINotices,
  createProducteurs,
  createGroups,
  removeProducteurs,
  removeGroups
} = require("./setup/helpers");
let sampleNotice = require("./__notices__/memoire-1");

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
  removeOAINotices();
});

async function createNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .post("/memoire")
    .field("notice", JSON.stringify(notice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Cookie", "token="+await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function updateNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .put(`/memoire/${notice.REF}`)
    .field("notice", JSON.stringify(notice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Cookie", "token="+await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function deleteNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .delete(`/memoire/${notice.REF}`)
    .set("Accept", "application/json")
    .set("Cookie", "token="+await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

describe("POST /memoire", () => {
  // PRODUCTEUR: "AUTRE"
  test(`It should create a notice { PRODUCTEUR: "AUTRE" } for "administrateur" (group: "admin")`, async () => {
    await createGroups();
    await createProducteurs();
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
  const caoaNotice = { ...sampleNotice, REF: "OAXXX"};
  test(`It should create a notice ffffff{ PRODUCTEUR: "CAOA" } for user ${JSON.stringify(
    mhUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(mhUserOk), 200, caoaNotice);
    expect(res.success).toBe(true);
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
  test(`It should raise flags on errors`, async () => {
    // Create a valid notice for reference.
    let res = await createNotice(await createUser(), 200);
    // Create notice with errors.
    const flagNotice = {
      ...sampleNotice,
      PAYS: ["France"], // Ajout du pays pour la vérification de la région
      IDPROD: "", // 1
      LEG: "", // 2
      LBASE: ["123456789"], // 3, 4 (two errors in a row)
      INSEE: ["2"], // 5
      CONTACT: "o", // 6
      NUMTI: "à", // 7
      NUMP: "à", // 8
      REF: "978601295ZB"
    };
    res = await createNotice(await createUser(), 200, flagNotice);
    res = await request(app)
      .get(`/memoire/${flagNotice.REF}`)
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.POP_FLAGS).toHaveLength(9);
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
  })
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
    await removeProducteurs();
    await removeGroups();

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
 