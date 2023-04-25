const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err.name)
  let status = err.status;
  let message = err.message;
  if(err.name === "MongoServerError" && err.code === 11000){
    status = 409;
    message = "Email in use"
  }
  res.status(status).json({ message });
};

module.exports = errorHandler;