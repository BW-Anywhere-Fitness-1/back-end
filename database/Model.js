const { Validator } = require("jsonschema");
const knex = require("./db-config");
const ValidationError = require("../errors/ValidationError");
const DatabaseError = require("./../errors/DatabaseError");

class Model {
  constructor() {
    this.tableName = "";
    this.jsonSchema = {};
    this.validator = new Validator();
  }

  query() {
    return knex(this.tableName);
  }

  async findAll() {
    try {
      const result = await this.query();
      return result;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  async findById(id) {
    try {
      const result = await this.query().where({ id }).first();
      return result;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  async insert(payload) {
    this.$validate(payload);
    try {
      payload = this.beforeCreate(payload);
      const result = await this.query().insert(payload).returning("*");
      return result;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  async update(id, payload) {
    this.$validate(payload);
    try {
      const result = await this.query()
        .where({ id })
        .update(payload)
        .returning("*");
      return result;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  async del(id) {
    try {
      await this.query().where({ id }).del();
      return id;
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  beforeCreate(data) {
    return data;
  }

  $validate(data) {
    const v = this.validator.validate(data, this.jsonSchema);
    if (v.errors.length) {
      throw new ValidationError(v.errors);
    }
  }
}

module.exports = Model;
