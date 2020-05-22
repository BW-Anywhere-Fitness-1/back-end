const BaseController = require("./BaseController");
const Classes = require("./../models/Classes");

class ClassesController extends BaseController {
  constructor() {
    super(Classes);
  }

  async search(req, res, next) {
    try {
      const result = await Classes.search(req.query.q);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ClassesController();
