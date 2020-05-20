const Model = require("../database/Model");
const { dataType } = require("./../utils");

class AuthenticationCode extends Model {
  constructor() {
    super();
    this.tableName = "authentication_codes";
    this.jsonSchema = {
      type: "object",
      required: ["name"],
      properties: {
        name: dataType.string,
      },
    };
  }
}

module.exports = new AuthenticationCode();
