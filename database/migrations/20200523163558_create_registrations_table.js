exports.up = function (knex) {
  return knex.schema.createTable("registrations", (table) => {
    table.increments();
    table
      .integer("student_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("cascade")
      .onUpdate("cascade");
    table
      .integer("class_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("classes")
      .onDelete("cascade")
      .onUpdate("cascade");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("registrations");
};
