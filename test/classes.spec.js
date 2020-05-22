const request = require("supertest");
const { req, classSample, badClassSample } = require("./helpers"); // logged in request
const app = require("./../app");
const knex = require("./../database/db-config");
const Classes = require("./../models/Classes");
const User = require("./../models/User");
const ClassType = require("./../models/ClassesType");

describe("testing classes", () => {
  beforeAll(async () => {
    await knex.seed.run();
  });
  beforeEach(async () => {
    await User.query().delete();
  });
  afterAll(async (done) => {
    await Classes.query().delete();
    done();
  });
  // index endpoint
  it("GET /api/v1/classes should return 200 when logged in", async () => {
    const response = await req("get", "/api/v1/classes", "client");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveLength(3);
  });
  it("GET /api/v1/classes should return 403 when not logged in", async () => {
    const response = await request(app).get("/api/v1/classes");

    expect(response.status).toBe(403);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBeTruthy();
  });
  // create endpoint
  it("POST /api/v1/classes should return 201 when logged in as instructor and have valid body", async () => {
    const response = await req(
      "post",
      "/api/v1/classes",
      "instructor",
      classSample
    );

    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    expect(response.body[0].schedule).toEqual(classSample.schedule.join(" | "));
  });
  it("POST /api/v1/classes should return 403 when logged in as client", async () => {
    const response = await req(
      "post",
      "/api/v1/classes",
      "client",
      classSample
    );

    expect(response.status).toBe(403);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBeTruthy();
  });
  it("POST /api/v1/classes should return 400 when logged in as instructor but request body has not valid", async () => {
    const response = await req(
      "post",
      "/api/v1/classes",
      "instructor",
      badClassSample
    );

    expect(response.status).toBe(400);
    expect(response.type).toBe("application/json");
    expect(response.body.fields).toHaveLength(12);
  });
  it("POST /api/v1/classes should return 403 when not logged in", async () => {
    const response = await request(app).post("/api/v1/classes");

    expect(response.status).toBe(403);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBeTruthy();
  });
  // show endpoint
  it("GET /api/v1/classes/:id should return 200", async () => {
    const classes = await Classes.findAll().first();
    const response = await req(
      "get",
      `/api/v1/classes/${classes.id}`,
      "client"
    );

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.name).toEqual(classes.name);
  });
  it("GET /api/v1/classes/:id should return 403 when not logged in", async () => {
    const response = await request(app).get("/api/v1/classes/2");

    expect(response.status).toBe(403);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBeTruthy();
  });
  // update endpoint
  it("PUT /api/v1/classes/:id should return when logged in as instructor and have valid body", async () => {
    const classes = await Classes.findAll().first();

    const response = await req(
      "put",
      `/api/v1/classes/${classes.id}`,
      "instructor",
      {
        ...classes,
        type: 4,
        level: 2,
        name: "Abs class",
        duration: "00:30:00",
        schedule: classes.schedule.split("|").map((day) => day.trim()),
      }
    );

    const updatedClass = await Classes.findById(classes.id);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(updatedClass.type).toEqual("Weightlifting");
    expect(updatedClass.name).toMatch(/Abs class/);
  });
  it("PUT /api/v1/classes/:id should return 403 when logged in as client", async () => {
    const classes = await Classes.findAll().first();
    const response = await req(
      "put",
      `/api/v1/classes/${classes.id}`,
      "client",
      classes
    );

    expect(response.status).toBe(403);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBeTruthy();
  });
  it("PUT /api/v1/classes/:id should return 403 when not logged in", async () => {
    const response = await request(app).put("/api/v1/classes/2");

    expect(response.status).toBe(403);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBeTruthy();
  });
  // Delete endpoint
  it("DELETE /api/v1/classes:id should return 200 when logged in as instructor", async () => {
    const classes = await Classes.findAll().first();
    const response = await req(
      "delete",
      `/api/v1/classes/${classes.id}`,
      "instructor"
    );

    const deleteClass = await Classes.findById(classes.id);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.id).toEqual(classes.id);
    expect(deleteClass).toBeUndefined();
  });
  it("DELETE /api/v1/classes:id should return 403 when logged in as client", async () => {
    const classes = await Classes.findAll().first();
    const response = await req(
      "delete",
      `/api/v1/classes/${classes.id}`,
      "client"
    );

    expect(response.status).toBe(403);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBeTruthy();
  });
  it("DELETE /api/v1/classes/:id should return 403 when not logged in", async () => {
    const response = await request(app).delete("/api/v1/classes/2");

    expect(response.status).toBe(403);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBeTruthy();
  });
  // search endpoint
  it("GET /api/v1/classes/search should return 200", async () => {
    const response = await req("get", "/api/v1/search/classes?q=Me", "client");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveLength(2);
  });
  it("GET /api/v1/classes/search return 403 when not logged in", async () => {
    const response = await request(app).get("/api/v1/search/classes?q=Me");

    expect(response.status).toBe(403);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBeTruthy();
  });
});
