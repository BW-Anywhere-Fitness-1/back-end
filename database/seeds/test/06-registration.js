exports.seed = (knex) => {
  return knex("registrations").insert([
    { student_id: 1, class_id: 1 },
    { student_id: 1, class_id: 2 },
    { student_id: 1, class_id: 3 },
    { student_id: 2, class_id: 3 },
  ]);
};
