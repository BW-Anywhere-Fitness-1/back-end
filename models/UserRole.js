const Model = require("../database/Model");
const { dataType } = require("./../utils");

class UserRole extends Model {
  constructor() {
    super();
    this.tableName = "user_roles";
    this.jsonSchema = {
      type: "object",
      required: ["name"],
      properties: {
        name: dataType.string,
      },
    };
  }
}

module.exports = new UserRole();
