const { request } = require("./helpers");
const app = require("./../app");
const knex = require("./../database/db-config");
const Classes = require("./../models/Classes");

describe("testing classes", () => {
  beforeAll(async () => {
    await knex.seed.run();
  });
  afterAll(async (done) => {
    await Classes.query().delete();
    done();
  });
  it("GET /api/v1/classes should return 200 when login", async () => {
    const response = await request("get", "/api/v1/classes", "client");

    console.log(response.body);
  });
  it("POST /api/v1/classes", async () => {});
  it("GET /api/v1/classes/:id", async () => {});
  it("PUT /api/v1/classes/:id", async () => {});
  it("DELETE /api/v1/classes:id", async () => {});
  it("GET /api/v1/classes/search", async () => {});
});
