exports.seed = function (knex) {
  return knex("class_types").insert([
    { name: "Yoga" },
    { name: "Boxing" },
    { name: "Pilates" },
    { name: "Weightlifting" },
  ]);
};
