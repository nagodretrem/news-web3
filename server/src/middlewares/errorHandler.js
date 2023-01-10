const APIError = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: "Something went wrong" });
};

module.exports = errorHandler;
