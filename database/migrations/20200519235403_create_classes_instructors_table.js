exports.up = function (knex) {
  return knex.schema.createTable("classes_instructors", (table) => {
    table.increments();
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("class_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("classes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("classes_instructors");
};
