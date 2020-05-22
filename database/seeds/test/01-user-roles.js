exports.seed = function (knex) {
  return knex("user_roles").insert([
    { name: "Admin" },
    { name: "Client" },
    { name: "Instructor" },
  ]);
};
