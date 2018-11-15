const app = require("../src/app");
const request = require("supertest");
const mongoose = require("mongoose");

afterAll(() => {
  mongoose.disconnect();
});

describe("/GET mnr", () => {
  test(`It should return mnr`, async () => {
    const response = await request(app)
      .get("/mnr")
      .set("Accept", "application/json")
      .expect(200);
  });
});
// trigger CI
