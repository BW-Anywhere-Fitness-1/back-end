exports.up = function (knex) {
  return knex.schema.createTable("revoked_tokens", (table) => {
    table.increments();
    table.string("token");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("revoked_tokens");
};
