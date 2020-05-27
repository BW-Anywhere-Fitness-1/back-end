const request = require("supertest");
const app = require("../../app");
const { userData } = require("./index");

exports.authCode = async (email) => {
  await request(app).post("/api/v1/auth/auth-code").send({ email }).expect(200);

  const response = await request(app).get(
    `/api/v1/auth/auth-code?email=${email}`
  );

  expect(response.status).toBe(200);
  expect(response.type).toBe("application/json");
  expect(response.body.email).toBe(email);
  expect(response.body.code).toBeTruthy();

  return response.body;
};
