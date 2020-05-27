const bcrypt = require("bcrypt");

exports.seed = (knex) => {
  return knex("users").insert([
    {
      role_id: 2,
      first_name: "Foo",
      last_name: "Bar",
      email: "foo.bar@fakeGmail.com",
      password: bcrypt.hashSync("@dmin859N", 10),
      gender: "male",
      phone: "(336)675-0468",
    },
    {
      role_id: 2,
      first_name: "Dan",
      last_name: "Joe",
      email: "dan.joe@fakeGmail.com",
      password: bcrypt.hashSync("@dmin859N", 10),
      gender: "male",
      phone: "(336)675-0468",
    },
    {
      role_id: 3,
      first_name: "Bob",
      last_name: "Alice",
      email: "bob.alice@fakeGmail.com",
      password: bcrypt.hashSync("@dmin859N", 10),
      gender: "male",
      phone: "(336)675-0468",
    },
  ]);
};
