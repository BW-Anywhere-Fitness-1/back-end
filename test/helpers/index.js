exports.userData = {
  role_id: 1,
  first_name: "Dan",
  last_name: "Joe",
  email: "dan.joe@fakeGmail.com",
  password: "@dmin859N",
  gender: "male",
  phone: "(336)675-0468",
};

exports.authCode = require("./auth-code").authCode;
exports.login = require("./login");
exports.req = require("./request");
