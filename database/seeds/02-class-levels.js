exports.seed = function (knex) {
  return knex("class_levels").insert([
    { name: "Beginner" },
    { name: "Intermediate" },
    { name: "Advanced" },
  ]);
};
