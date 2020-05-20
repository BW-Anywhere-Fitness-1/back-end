exports.up = function (knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments();
    table.string("name").notNullable();
    table
      .integer("type")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("class_levels")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.time("start_time").notNullable();
    table.string("duration").notNullable();
    table
      .integer("level")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("class_levels")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("location").notNullable();
    table.integer("attendees").notNullable().default(0);
    table.integer("max_size").notNullable();
    table.integer("schedules").notNullable();
    table.text("description").nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("classes");
};
