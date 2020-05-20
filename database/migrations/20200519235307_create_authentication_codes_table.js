exports.up = function (knex) {
  return knex.schema.createTable("authentication_codes", (table) => {
    table.increments();
    table.string("code");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("authentication_codes");
};
