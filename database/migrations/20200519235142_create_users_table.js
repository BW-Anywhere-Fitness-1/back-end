exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table
      .integer("role_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("user_roles")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("phone").nullable();
    table.string("gender").nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
