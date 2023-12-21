const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const {
  createUser,
  getJwtToken,
  removeAllUsers,
  removeMerimeeNotices,
  removeOAINotices,
  createProducteurs,
  createGroups,
  removeProducteurs,
  removeGroups
} = require("./setup/helpers");
const sampleNotice = require("./__notices__/merimee-1");

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
  removeMerimeeNotices();
  removeOAINotices();
});

async function createNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .post("/merimee")
    .field("notice", JSON.stringify(notice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Cookie", "token="+await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function updateNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .put(`/merimee/${notice.REF}`)
    .field("notice", JSON.stringify(notice))
    .set("Accept", "application/json")
    .set("Content-Type", "multipart/form-data")
    .set("Cookie", "token="+await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

async function deleteNotice(user, expectedStatus = 200, notice = sampleNotice) {
  const response = await request(app)
    .delete(`/merimee/${notice.REF}`)
    .set("Accept", "application/json")
    .set("Cookie", "token="+await getJwtToken(app, user))
    .expect(expectedStatus);
  return response.body;
}

describe("POST /merimee", () => {
  // PRODUCTEUR: "Monuments Historiques"
  test(`It should create a notice { PRODUCTEUR: "Monuments Historiques" } for "administrateur" (group: "admin")`, async () => {
    await createGroups();
    await createProducteurs();
    
    const res = await createNotice(await createUser(), 200);
    expect(res.success).toBe(true);
  });
  const invUserOk = { group: "inv", role: "producteur" };
/*   test(`It should not create a notice { PRODUCTEUR: "Monuments Historiques" } for user ${JSON.stringify(
    invUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(invUserOk), 401);
    expect(res.success).toBe(false);
  }); */

  const mhUserOk = { group: "mh", role: "producteur" };
  test(`It should create a notice { PRODUCTEUR: "Monuments Historiques" } for user ${JSON.stringify(
    mhUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(mhUserOk), 200);
    expect(res.success).toBe(true);
  });
  // PRODUCTEUR: "Inventaire"
  const invNotice = { ...sampleNotice, REF: "IA97600007" };
  test(`It should create a notice { PRODUCTEUR: "Inventaire" } for user ${JSON.stringify(
    invUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(invUserOk), 200, invNotice);
    expect(res.success).toBe(true);
  });
/*   test(`It should not create a notice { PRODUCTEUR: "Inventaire" } for user ${JSON.stringify(
    mhUserOk
  )}`, async () => {
    const res = await createNotice(await createUser(mhUserOk), 401, invNotice);
    expect(res.success).toBe(false);
  }); */
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
      REG: ["x"], // 1
      ETUD: "", // 2
      PROT: "x", // 3
      DPRO: "", // 3 too.
      DPT: ["1"], // 4,
      INSEE: ["2"], // 5 and 6
      REF: "à", // 7
      DOSURL: "htd://_.com", // 8
      RENV: ["x"], // 9
      REFP: ["PA97600007"], // This one is valid!
      REFE: ["x"] // 10
    };
    res = await createNotice(await createUser(), 200, flagNotice);
    res = await request(app)
      .get(`/merimee/${flagNotice.REF}`)
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.POP_FLAGS).toHaveLength(11);
  });
});

describe("PUT /merimee/:ref", () => {
  const invNotice = { ...sampleNotice, REF: "IA97600007" };
  const invUserOk = { group: "inv", role: "producteur" };
  test(`It should update a notice for ${JSON.stringify(invUserOk)}`, async () => {
    const user = await createUser(invUserOk);
    let res = await createNotice(user, 200, invNotice);
    res = await updateNotice(user, 200, invNotice);
    expect(res.success).toBe(true);
  });
});

describe("DELETE /merimee/:ref", () => {
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
  const merimeeUser = { group: "joconde", role: "producteur" };
  test(`It should not authorize user ${JSON.stringify(merimeeUser)}`, async () => {
    const user = await createUser(merimeeUser);
    let res = await createNotice(await createUser({ email: "lol@example.com" }), 200);
    res = await deleteNotice(user, 401);
    expect(res.success).toBe(false);
  });
});

describe("GET /merimee/:ref", () => {
  test(`It should return a notice by for everyone`, async () => {
    await removeProducteurs();
    await removeGroups();

    let res = await createNotice(await createUser(), 200);
    res = await request(app)
      .get(`/merimee/${sampleNotice.REF}`)
      .set("Accept", "application/json")
      .expect(200);
    expect(res.body.TITR).toBe(sampleNotice.TITR);
  });
  test(`It should return 404 for non-existant notice`, async () => {
    const res = await request(app)
      .get("/merimee/LOL")
      .set("Accept", "application/json")
      .expect(404);
    expect(res.body.success).toBe(false);
  });
  
});
