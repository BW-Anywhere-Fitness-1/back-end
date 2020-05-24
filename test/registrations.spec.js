const request = require("supertest");
const { req } = require("./helpers"); // logged in request
const app = require("./../app");
const knex = require("./../database/db-config");
const Registration = require("./../models/Registration");
const User = require("./../models/User");

describe("testing registrations", () => {
  beforeAll(async () => {
    await knex.seed.run();
  });
  beforeEach(async () => {
    await User.query().delete();
  });
  afterAll(async (done) => {
    await Registration.query().delete();
    done();
  });
  it("POST /api/v1/registration", async () => {
    const response = await req("post", "/api/v1/registration", "client", {
      class_id: 1,
    });

    console.log(response.body);
  });
});
