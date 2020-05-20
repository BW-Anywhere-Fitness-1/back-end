exports.up = function (knex) {
  return knex.schema.createTable("user_roles", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_roles");
};
