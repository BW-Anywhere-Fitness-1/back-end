const request = require("supertest");
const { req } = require("./helpers"); // logged in request
const app = require("./../app");
const knex = require("./../database/db-config");
const Registration = require("./../models/Registration");
const Classes = require("./../models/Classes");

describe("testing registrations", () => {
  beforeAll(async () => {
    await knex.seed.run();
  });
  beforeEach(async () => {
    //await User.query().delete();
  });
  afterAll(async (done) => {
    await Registration.query().delete();
    done();
  });
  it("GET /api/v1/registrations should return 200", async () => {
    const response = await req("get", "/api/v1/registrations", "client");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveLength(4);
  });
  it("POST /api/v1/registrations should return 201", async () => {
    const response = await req("post", "/api/v1/registrations", "client", {
      class_id: 1,
    });

    const classes = await Classes.findById(1);

    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeTruthy();
    expect(classes.attendees).toBe(1);
  });
  it("POST /api/v1/registrations should return 403 when not logged in", async () => {
    const response = await request(app).post("/api/v1/registrations").send({
      class_id: 1,
    });

    expect(response.status).toBe(403);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBeTruthy();
  });
  it("DELETE /api/v1/registrations should return 200 when ok", async () => {
    const registration = await Registration.findById(1);
    const classes = await Classes.findById(registration.class_id);
    const expectedAttendees = classes.attendees - 1;

    const response = await req(
      "delete",
      `/api/v1/registrations/${registration.id}`,
      "client"
    );

    const registrations = await Registration.findAll();

    const updatedClass = await Classes.findById(response.body[0].class_id);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body[0].id).toBe(1);
    expect(registrations).toHaveLength(4);
    expect(updatedClass.attendees).toEqual(expectedAttendees);
  });
});
