const ValidationError = require("./ValidationError");
const DatabaseError = require("./DatabaseError");

const knex = require("knex");

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).json({
      message: err.message || "Validation error",
      fields: err.data,
    });
    return false;
  }
  // if (err instanceof DatabaseError) {
  //   const message = err.message.split("-")[0].trim();
  //   return res.status(500).json({ message });
  // }
  console.log(err);
  res
    .status(err.status || 500)
    .json({ message: "An unexpected error occurred." });
};
