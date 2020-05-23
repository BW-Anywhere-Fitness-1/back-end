const BaseController = require("./BaseController");
const Registration = require("../models/Registration");

class RegistrationController extends BaseController {
  constructor() {
    super(Registration);
  }
}

module.exports = new RegistrationController();
