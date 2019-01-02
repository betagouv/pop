const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const { createUser, getJwtToken, removeAllUsers } = require("./setup/helpers");
const sampleNotice = require('./__notices__/joconde-1')

jest.mock("../elasticsearch");
const es = require("../elasticsearch");
es.mockImplementation(() => ({ /* ... */ }));

afterAll(() => mongoose.disconnect());
beforeEach(() => removeAllUsers());

describe("Joconde", () => {
  test(`GET /joconde - It should return joconde`, async () => {
    await request(app)
      .get("/joconde")
      .set("Accept", "application/json")
      .expect(200); //
  });

  test(`POST /joconde - It should create a notice`, async () => {
    const response = await request(app)
      .post('/joconde')
      .field('notice', JSON.stringify(sampleNotice))
      .set("Accept", "application/json")
      .set("Content-Type", "multipart/form-data")
      .set("Authorization", await getJwtToken(app, await createUser()))
      .expect(200);
  });
});
