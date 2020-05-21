exports.up = function (knex) {
  return knex.schema.createTable("class_levels", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("class_levels");
};
