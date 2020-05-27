const BaseController = require("./BaseController");
const ClassesLevel = require("../models/ClassesLevel");

class ClassesLevelController extends BaseController {
  constructor() {
    super(ClassesLevel);
  }
}

module.exports = new ClassesLevelController();
