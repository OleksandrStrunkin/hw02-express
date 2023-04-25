const  HttpError  = require("../helpers/HttpError");
const {updateSchema, updateFavoriteSchema, addSchema} = require("../models/contactsM")
const {registerSchema, loginSchema} = require("../models/users")

const validateContactBody = (req, res, next) => {
  const requiredFields = ["name", "email", "phone"];
  const missingFields = requiredFields.filter((field) => !(field in req.body));
  if (missingFields.length > 0) {
    const message = `missing required ${missingFields.join(" and ")} field${
      missingFields.length > 1 ? "s" : ""
    }`;
    return res.status(400).json({ message });
  }
  const { error } = addSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }

  next();
};

const validateUpdateBody = (req, res, next) => {
  if (!req.body) {
    return next(HttpError(400, "missing fields"));
  }

  const fields = Object.keys(req.body);
  if (fields.length === 0) {
    return next(HttpError(400, "missing fields"));
  }

  const { error } = updateSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }

  next();
};

const validateUpdateFavoriteBody = (req, res, next) => {
  if (!req.body) {
    return next(HttpError(400, "missing fields favorite"));
  }

  const fields = Object.keys(req.body);
  if (fields.length === 0) {
    return next(HttpError(400, "missing fields favorite"));
  }

  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }

  next();
};

const validateRegisterBody = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }
  next();
};
const validateLoginBody = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(HttpError(400, error.message));
  }
  next();
};



module.exports = {
  validateContactBody,
  validateUpdateBody,
  validateUpdateFavoriteBody,
  validateRegisterBody,
  validateLoginBody
};

