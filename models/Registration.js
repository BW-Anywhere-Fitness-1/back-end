const Model = require("../database/Model");
const { dataType } = require("../utils");
const Classes = require("./Classes");
const RegistrationError = require("../errors/RegistrationError");

class Registration extends Model {
  constructor() {
    super();
    this.tableName = "registrations";
    this.jsonSchema = {
      type: "object",
      required: ["student_id", "class_id"],
      properties: {
        student_id: dataType.integer,
        class_id: dataType.integer,
      },
    };
  }

  search() {
    return this.query()
      .whereRaw("registration.student_id::text like ?", `%${q}%`)
      .orWhereRaw("registration.class_id::text like ?", `%${q}%`);
  }

  async beforeCreate(payload) {
    const classes = await Classes.findById(payload.class_id);
    if (!classes)
      throw new RegistrationError("The specified class id does not exists.");

    if (classes.attendees === classes.max_size)
      throw new RegistrationError(
        "Unable to process the registration. Class max size reaches."
      );

    return payload;
  }

  async afterCreate(payload) {
    const classes = await Classes.findById(payload.class_id);
    await Classes.update(classes.id, {
      ...classes,
      attendees: classes.attendees++,
    });
  }
}

module.exports = new Registration();
