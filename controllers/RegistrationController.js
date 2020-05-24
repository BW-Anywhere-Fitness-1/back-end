const BaseController = require("./BaseController");
const Registration = require("../models/Registration");

class RegistrationController extends BaseController {
  constructor() {
    super(Registration);
  }

  async beforeCreate(req) {
    return {
      student_id: req.user.id,
      ...req.body,
    };
  }
}

module.exports = new RegistrationController();
