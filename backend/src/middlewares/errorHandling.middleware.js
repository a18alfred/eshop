const CustomError = require("../utils/error.util");

module.exports = (err, _req, res, _next) => {
  if (err instanceof CustomError) {
    // Handle custom error
    const errStatus = err.status || 500;
    const errMessage = err.message || "Что-то пошло не так";
    return res.status(errStatus).json({
      status: errStatus,
      message: errMessage,
    });
  } else {
    // Handle other error
    console.log(err);
    const errStatus = err.status || 500;
    const errMessage = err.message || "Что-то пошло не так";
    return res.status(errStatus).json({
      status: errStatus,
      message: errMessage,
    });
  }
};
