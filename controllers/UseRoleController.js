const BaseController = require("./BaseController");
const UserRole = require("../models/UserRole");

class UserRoleController extends BaseController {
  constructor() {
    super(UserRole);
  }
}

module.exports = new UserRoleController();
