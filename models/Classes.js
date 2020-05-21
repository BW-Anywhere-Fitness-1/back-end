const Model = require("../database/Model");
const { dataType } = require("./../utils");

class Classes extends Model {
  constructor() {
    super();
    this.tableName = "classes";
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
        schedule: { ...dataType.array, items: dataType.string },
        description: dataType.string,
      },
    };
  }
}

module.exports = new Classes();
