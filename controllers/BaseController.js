class BaseController {
  constructor(model) {
    this.model = model;
  }

  async index(req, res, next) {
    try {
      const classes = await this.model.findAll();
      res.json(classes);
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
      const classes = await this.model.insert(req.body);
      res.json(classes);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const classes = await this.model.update(req.params.id, req.body);
      res.json(classes);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      await this.model.del(req.params.id);
      res.json({ id: req.params.id });
    } catch (error) {
      next(error);
    }
  }
}
