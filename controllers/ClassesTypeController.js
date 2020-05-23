const BaseController = require("./BaseController");
const ClassesType = require("../models/ClassesType");

class ClassesTypeController extends BaseController {
  constructor() {
    super(ClassesType);
  }
}

module.exports = new ClassesTypeController();
