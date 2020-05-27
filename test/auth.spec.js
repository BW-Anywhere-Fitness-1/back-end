const request = require("supertest");
const app = require("./../app");
const User = require("./../models/User");
const AuthCode = require("./../models/AuthenticationCode");
const knex = require("./../database/db-config");
const {
  authCode,
  userData,
  login,
  req,
  instructor,
  client,
} = require("./helpers");

describe("testing authentication", () => {
  beforeAll(async () => {
    await knex.seed.run();
  });
  beforeEach(async () => {
    //await User.query().delete();
    //await AuthCode.query().delete();
  });
  afterAll(async (done) => {
    done();
  });

  describe("signup", () => {
    it("POST /api/v1/auth/signup Client: should return 201 when ok", async () => {
      const payload = {
        ...userData,
        role_id: 2,
        email: `1246${userData.email}`,
      };

      const response = await request(app)
        .post("/api/v1/auth/signup")
        .send(payload);

      expect(response.status).toBe(201);
      expect(response.type).toBe("application/json");
      expect(response.body.email).toBe(payload.email);
      expect(response.body.password).not.toBeTruthy();
    });

    it("POST /api/v1/auth/signup Instructor: should return 201 when ok", async () => {
      const email = `1245${userData.email}`;
      const code = (await authCode(email)).code;

      const payload = {
        ...userData,
        role_id: 3,
        authCode: code,
        email,
      };

      const response = await request(app)
        .post("/api/v1/auth/signup")
        .send(payload);

      expect(response.status).toBe(201);
      expect(response.type).toBe("application/json");
      expect(response.body.email).toBe(payload.email);
      expect(response.body.password).not.toBeTruthy();
    });

    it("POST /api/v1/auth/signup Instructor: should return 403 when not one time authentication", async () => {
      const email = `1245${userData.email}`;
      const code = (await authCode(email)).code;

      const payload = {
        ...userData,
        role_id: 3,
        authCode: code,
        email: "dann",
      };

      const response = await request(app)
        .post("/api/v1/auth/signup")
        .send(payload);

      expect(response.status).toBe(403);
      expect(response.type).toBe("application/json");
      expect(response.body.message).toBe("Authentication code doest not found");
    });

    it("POST /api/v1/auth/signup Instructor: should return 401 when validation failed", async () => {
      const email = `1245${userData.email}`;
      const code = (await authCode(email)).code;

      const { first_name, ...rest } = userData;

      const payload = {
        ...rest,
        role_id: 3,
        authCode: code,
        email,
        last_name: 13,
        password: "ad1251258",
      };

      const response = await request(app)
        .post("/api/v1/auth/signup")
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.type).toBe("application/json");
      expect(response.body.message).toBe("Validation error");
      expect(response.body.fields).toHaveLength(3);
    });

    it("GET /api/v1/auth/user-roles should return 200", async () => {
      const response = await request(app).get("/api/v1/auth/user-roles");

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toHaveLength(3);
    });
  });

  describe("login", () => {
    it("POST /api/v1/auth/login Client: should return 200", async () => {
      const response = await login(client);

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body.access_token).toBeTruthy();
      expect(response.body.displayName).toBeTruthy();
    });

    it("POST /api/v1/auth/login Instructor: should return 200", async () => {
      const response = await login(instructor);

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body.access_token).toBeTruthy();
      expect(response.body.displayName).toBeTruthy();
    });

    it("POST /api/v1/auth/login Instructor: should return 403 when bad credentials", async () => {
      const response = await login({
        email: "foo.bar@fake.com",
        password: "145239",
      });

      expect(response.status).toBe(403);
      expect(response.type).toBe("application/json");
      expect(response.body.access_token).not.toBeTruthy();
      expect(response.body.displayName).not.toBeTruthy();
      expect(response.body.message).toMatch("Invalid credentials");
    });
  });

  describe("logout", () => {
    it("DELETE /api/v1/auth/logout", async () => {
      const response = await req("delete", "/api/v1/auth/logout", "client");

      expect(response.status).toBe(200);
    });
  });
});
