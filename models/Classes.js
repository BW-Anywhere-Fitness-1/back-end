const Model = require("../database/Model");
const jsonschema = require("jsonschema");
const { dataType } = require("./../utils");
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

class Classes extends Model {
  constructor() {
    super();
    this.tableName = "classes";
    this.validator.attributes.day = this.validateSchedule;
    this.jsonSchema = {
      type: "object",
      required: [
        "name",
        "type",
        "level",
        "start_time",
        "duration",
        "location",
        "attendees",
        "max_size",
      ],
      properties: {
        name: dataType.string,
        type: dataType.integer,
        start_time: { ...dataType.string, format: "time" },
        duration: { ...dataType.string, format: "time" },
        level: dataType.integer,
        location: dataType.string,
        attendees: dataType.integer,
        max_size: dataType.integer,
        schedule: {
          ...dataType.array,
          items: { ...dataType.string, day: true },
        },
        description: dataType.string,
      },
    };
  }

  related() {
    return this.query()
      .join("class_levels as l", "l.id", "classes.level")
      .join("class_types as t", "t.id", "classes.type")
      .select(
        "classes.id",
        "classes.name",
        "t.name as type",
        "classes.start_time",
        "classes.duration",
        "l.name as level",
        "classes.location",
        "classes.attendees",
        "classes.max_size",
        "classes.schedule",
        "classes.description",
        "classes.created_at"
      );
  }

  findAll() {
    return this.related();
  }

  findById(id) {
    return this.related().where("classes.id", id).first();
  }

  search(q) {
    return this.related()
      .where("classes.name", "like", `%${q}%`)
      .orWhere("classes.schedule", "like", `%${q}%`)
      .orWhereRaw("classes.start_time::text like ?", `%${q}%`)
      .orWhereRaw("classes.duration::text like ?", `%${q}%`)
      .orWhere("classes.location", "like", `%${q}%`)
      .orWhereRaw("classes.max_size::text like ?", `%${q}%`)
      .orWhere("t.name", "like", `%${q}%`)
      .orWhere("l.name", "like", `%${q}%`);
  }

  beforeCreate(payload) {
    return {
      ...payload,
      schedule: payload.schedule.join(" | "),
    };
  }

  beforeUpdate(payload) {
    return {
      ...payload,
      schedule: payload.schedule.join(" | "),
    };
  }

  validateSchedule(instance, schema, options, ctx) {
    if (typeof instance !== "string") return;
    if (typeof schema.day !== "boolean")
      throw new jsonschema.SchemaError('"day" expects a boolean', schema);
    if (!days.includes(instance)) {
      return "doest not match any day" + JSON.stringify(days);
    }
  }
}

module.exports = new Classes();
