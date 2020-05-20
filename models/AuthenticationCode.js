const Model = require("../database/Model");
const { dataType } = require("./../utils");

class AuthenticationCode extends Model {
  constructor() {
    super();
    this.tableName = "authentication_codes";
    this.jsonSchema = {
      type: "object",
      required: ["code"],
      properties: {
        code: dataType.integer,
      },
    };
  }
}

module.exports = new AuthenticationCode();
