const Model = require("../database/Model");
const { dataType } = require("./../utils");

class ClassesInstructor extends Model {
  constructor() {
    super();
    this.tableName = "classes_instructors";
    this.jsonSchema = {
      type: "object",
      required: ["user_id", "class_id"],
      properties: {
        user_id: dataType.integer,
        class_id: dataType.integer,
      },
    };
  }
}

module.exports = new ClassesInstructor();
