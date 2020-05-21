exports.dataType = {
  string: { type: "string" },
  integer: { type: "integer" },
  boolean: { type: "boolean" },
  number: { type: "number" },
  object: { type: "object" },
  array: { type: "array" },
  nil: { type: "null" },
  url: { type: "string" },
  phone: { type: "string" },
};

exports.generateAuthToken = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
