const { Validator } = require("jsonschema");
const knex = require("./db-config");
const ValidationError = require("../errors/ValidationError");
const DatabaseError = require("./../errors/DatabaseError");

class Model {
  constructor() {
    this.tableName = "";
    this.jsonSchema = {};
    this.validator = new Validator();
    this.relationMap = {};
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
      payload = await this.beforeCreate(payload);
      const result = await this.query().insert(payload).returning("*");

      return await this.afterCreate(result);
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  async update(id, payload) {
    this.$validate(payload);
    try {
      payload = await this.beforeUpdate(payload);
      const result = await this.query()
        .where({ id })
        .update(payload)
        .returning("*");
      return await this.afterUpdate(result);
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  async del(id) {
    try {
      const deleted = await this.query().where({ id }).del().returning("*");
      return await this.afterDelete(deleted);
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  async beforeCreate(data) {
    return data;
  }

  async afterCreate(data) {
    return data;
  }

  async beforeUpdate(data) {
    return data;
  }

  async afterUpdate(data) {
    return data;
  }

  $validate(data) {
    const v = this.validator.validate(data, this.jsonSchema);
    if (v.errors.length) {
      throw new ValidationError(v.errors);
    }
  }

  afterDelete(data) {
    return data;
  }

  $related() {}
}

module.exports = Model;
