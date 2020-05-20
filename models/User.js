const jsonschema = require("jsonschema");
const Model = require("../database/Model");
const { dataType } = require("./../utils");

class User extends Model {
  constructor() {
    super();
    this.tableName = "users";
    this.validator.attributes.gender = this.validateGender;
    this.jsonSchema = {
      type: "object",
      required: ["role_id", "first_name", "last_name", "email", "password"],
      properties: {
        role_id: dataType.integer,
        first_name: { ...dataType.string, minLength: 2 },
        last_name: { ...dataType.string, minLength: 2 },
        email: { ...dataType.string, format: "email" },
        password: { ...dataType.string, minLength: 8 },
        phone: {
          ...dataType.string,
          pattern: "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$",
        },
        gender: { ...dataType.string, gender: true },
      },
    };
  }

  validateGender(instance, schema, options, ctx) {
    const genderArr = ["male", "female", "non-binary"];
    if (typeof instance != "string") return;
    if (typeof schema.gender != "boolean")
      throw new jsonschema.SchemaError('"gender" expects a boolean', schema);
    if (!genderArr.includes(instance)) {
      return "does not match any gender" + JSON.stringify(genderArr);
    }
  }
}

module.exports = new User();
