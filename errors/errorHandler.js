const ValidationError = require("./ValidationError");
const knex = require("knex");

function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(400).json({
      message: "Validation error",
      fields: err.data,
    });
    return false;
  }
  console.log(err);
  res
    .status(err.status || 500)
    .json({ message: "An unexpected error occurred." });
}

module.exports = errorHandler;
