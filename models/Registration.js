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
    const classes = await Classes.query()
      .where("id", payload[0].class_id)
      .first();
    const data = {
      ...classes,
      schedule: classes.schedule.split("|").map((day) => day.trim()),
      attendees: classes.attendees + 1,
    };

    Classes.update(classes.id, data)
      .then((res) => {
        if (!res[0].id)
          throw new Registration(
            "Unable to process registration. Unknown error."
          );
        return res;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = new Registration();
