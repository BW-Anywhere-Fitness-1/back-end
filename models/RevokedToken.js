const Model = require("../database/Model");
const { dataType } = require("./../utils");

class RevokedToken extends Model {
  constructor() {
    super();
    this.tableName = "authentication_codes";
    this.jsonSchema = {
      type: "object",
      required: ["token"],
      properties: {
        token: dataType.string,
      },
    };
  }
}

module.exports = new RevokedToken();
