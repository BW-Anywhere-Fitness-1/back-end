const request = require("supertest");
const app = require("../../app");
const AuthCode = require("../../models/AuthenticationCode");
const { userData } = require("./index");

exports.client = async () => {
  const payload = {
    ...userData,
    role_id: 2,
  };

  await request(app).post("/api/v1/auth/signup").send(payload).expect(201);

  return await login();
};

exports.instructor = async (credentials) => {
  await request(app)
    .post("/api/v1/auth/auth-code")
    .send({ email: userData.email })
    .expect(200);

  const authCode = await AuthCode.query()
    .where("email", credentials.email)
    .first();

  const payload = {
    ...userData,
    role_id: 3,
    authCode: authCode.code,
  };

  await request(app).post("/api/v1/auth/signup").send(payload).expect(201);

  return await login(credentials);
};

exports.login = async (payload) => {
  const credentials = payload || {
    email: userData.email,
    password: userData.password,
  };
  return await request(app).post("/api/v1/auth/login").send(credentials);
};
