const BaseController = require("./BaseController");
const Classes = require("./../models/Classes");

class ClassesController extends BaseController {
  constructor() {
    super(Classes);
  }
}

module.exports = new ClassesController();
