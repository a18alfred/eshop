module.exports = (_req, _res, next) => {
  const error = new Error("Адрес не существует");
  error.status = 404;
  next(error);
};
