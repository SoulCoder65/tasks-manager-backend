const { logErrorToFile } = require("../utils/errorLogger");

const errorHandler = (err, req, res, next) => {
  logErrorToFile(err);

  // Send a response to the client
  res.status(500).json({
    error: {
      message: "Internal Server Error",
    },
  });
};

module.exports = errorHandler;
github-personal-final