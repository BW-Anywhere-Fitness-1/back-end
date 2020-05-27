const request = require("supertest");
const app = require("../../app");
const { login } = require("./login");
const { client, instructor } = require("./");

module.exports = async (method, url, user, data) => {
  const credentials = user === "client" ? client : instructor;
  const auth = await login(credentials);
  expect(auth.status).toBe(200);

  let response;

  if (data) {
    response = await request(app)
      [method](url)
      .send(data)
      .set("Authorization", `Bearer ${auth.body.access_token}`);
  } else {
    response = await request(app)
      [method](url)
      .set("Authorization", `Bearer ${auth.body.access_token}`);
  }

  return response;
};
