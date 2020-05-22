const Model = require("../database/Model");
const jsonschema = require("jsonschema");
const { dataType } = require("./../utils");
const ClassesInstructor = require("./ClassesInstructor");

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

  beforeCreate(payload) {
    return {
      ...payload,
      schedule: payload.schedule.join(" | "),
    };
  }

  validateSchedule(instance, schema, options, ctx) {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    if (typeof instance !== "string") return;
    if (typeof schema.day !== "boolean")
      throw new jsonschema.SchemaError('"day" expects a boolean', schema);
    if (!days.includes(instance)) {
      return "doest not match any day" + JSON.stringify(days);
    }
  }
}

module.exports = new Classes();
