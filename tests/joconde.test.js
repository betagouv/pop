const app = require("../src/app");
const request = require("supertest");
const mongoose = require("mongoose");

afterAll(() => {
  mongoose.disconnect();
});

describe("/GET joconde", () => {
  test(`It should return joconde`, async () => {
    const response = await request(app)
      .get("/joconde")
      .set("Accept", "application/json")
      .expect(200);
  });
});
