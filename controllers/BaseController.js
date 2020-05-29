class BaseController {
  constructor(model) {
    this.model = model;
  }

  async index(req, res, next) {
    try {
      const result = await this.model.findAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const classes = await this.model.findById(req.params.id);
      res.json(classes);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const reqBody = await this.beforeCreate(req);
      const created = await this.model.insert(reqBody);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const updated = await this.model.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const deleted = await this.model.del(req.params.id);
      res.json(deleted);
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const result = await this.model.search(req.query.q);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async beforeCreate(req) {
    return req.body;
  }
}

module.exports = BaseController;
