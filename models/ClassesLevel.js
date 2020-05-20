const Model = require("../database/Model");
const { dataType } = require("./../utils");

class ClassesLevel extends Model {
  constructor() {
    super();
    this.tableName = "class_levels";
    this.jsonSchema = {
      type: "object",
      required: ["name"],
      properties: {
        name: dataType.string,
      },
    };
  }
}

module.exports = new ClassesLevel();
