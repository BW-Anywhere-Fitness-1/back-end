const request = require("supertest");
const app = require("../../app");
const AuthCode = require("../../models/AuthenticationCode");
const { userData } = require("./index");

exports.authCode = async () => {
  await request(app)
    .post("/api/v1/auth/auth-code")
    .send({ email: userData.email })
    .expect(200);

  return await AuthCode.query().where("email", userData.email).first();
};
