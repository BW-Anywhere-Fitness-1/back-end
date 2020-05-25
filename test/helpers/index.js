exports.userData = {
  role_id: 2,
  first_name: "Dan",
  last_name: "Joe",
  email: "dan.joe@fakeGmail.com",
  password: "@dmin859N",
  gender: "male",
  phone: "(336)675-0468",
};

exports.classSample = {
  name: "Boxing",
  type: 2,
  start_time: "15:00:00",
  duration: "00:45:00",
  level: 1,
  location: "600 Deer Field Trace, Mebane, NC 27302",
  attendees: 5,
  max_size: 1,
  schedule: ["Monday", "Wednesday", "Thursday"],
  description: "Martial art for beginner",
};

exports.badClassSample = {
  name: 1,
  type: "Boxing",
  start_time: "3:00 am",
  duration: "30min",
  level: "Beginner",
  location: 1,
  attendees: "05",
  max_size: "10",
  schedule: ["foo", "bar", "bar"],
  description: 5,
};

exports.authCode = require("./auth-code").authCode;
exports.login = require("./login");
exports.req = require("./request");
