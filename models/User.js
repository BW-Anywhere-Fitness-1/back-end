const jsonschema = require("jsonschema");
const Model = require("../database/Model");
const { dataType } = require("./../utils");
const ValidationError = require("../errors/ValidationError");

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
        first_name: { ...dataType.string, minimum: 2 },
        last_name: { ...dataType.string, minimum: 2 },
        email: { ...dataType.string, format: "email" },
        phone: {
          ...dataType.string,
          pattern: "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$",
        },
        gender: { ...dataType.string, gender: true },
      },
    };
  }

  validate(data) {
    const vSchema = {
      ...this.jsonSchema,
    };

    vSchema.properties = {
      ...vSchema.properties,
      password: {
        ...dataType.string,
        pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$",
      },
    };

    const v = this.validator.validate(data, vSchema);
    if (v.errors.length) {
      throw new ValidationError(v.errors);
    }
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
