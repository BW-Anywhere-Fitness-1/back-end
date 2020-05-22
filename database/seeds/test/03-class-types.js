exports.seed = function (knex) {
  return knex("class_types").insert([
    { name: "Yoga" },
    { name: "Martial Art" },
    { name: "Pilates" },
    { name: "Weightlifting" },
  ]);
};
