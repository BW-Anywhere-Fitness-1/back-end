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
  it("GET /api/v1/registrations should return 200", async () => {
    await req("post", "/api/v1/registrations", "client", {
      class_id: 1,
    });

    const response = await req("get", "/api/v1/registrations", "client");

    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    //expect(response.body).toHaveLength(3);
  });
  it("POST /api/v1/registrations should return 200", async () => {
    const response = await req("post", "/api/v1/registrations", "client", {
      class_id: 1,
    });

    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeTruthy();
  });
  it("POST /api/v1/registrations should return 403 when not logged in", async () => {
    const response = await request(app).get("/api/v1/registrations").send({
      class_id: 1,
    });

    expect(response.status).toBe(403);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBeTruthy();
  });
});
