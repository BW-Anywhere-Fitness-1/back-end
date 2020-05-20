const Model = require("../database/Model");
const { dataType } = require("./../utils");

class ClassesType extends Model {
  constructor() {
    super();
    this.tableName = "class_types";
    this.jsonSchema = {
      type: "object",
      required: ["name"],
      properties: {
        name: dataType.string,
      },
    };
  }
}

module.exports = new ClassesType();
