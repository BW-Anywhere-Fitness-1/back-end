const { Validator } = require("jsonschema");
const knex = require("./db-config");
const ValidationError = require("../errors/ValidationError");

class Model {
  constructor() {
    this.tableName = "";
    this.jsonSchema = {};
    this.validator = new Validator();
  }

  query() {
    return knex(this.tableName);
  }

  findAll() {
    return this.query();
  }

  findById(id) {
    return this.query().where({ id }).first();
  }

  insert(payload) {
    const v = this.validator.validate(payload, this.jsonSchema);
    if (v.errors.length) {
      throw new ValidationError(v.errors);
    }
    return this.query()
      .insert(payload)
      .then((ids) => this.findById(ids[0]));
  }

  update(id, payload) {
    const v = this.validator.validate(payload, this.jsonSchema);
    if (v.errors.length) {
      throw new ValidationError(v.errors);
    }
    return this.query()
      .where({ id })
      .update(payload)
      .then(() => this.findById(id));
  }

  async del(id) {
    await this.query().where({ id }).del();
    return id;
  }
}

module.exports = Model;
