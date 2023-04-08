const  HttpError  = require("../helpers/HttpError");
const {addSchema} = require('../schemas/contact-schema');
const { updateSchema } = require("../schemas/update-schema");

const validateBody = (req, res, next) => {
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



module.exports = {
  validateBody,
  validateUpdateBody,
};




// const validateUpdateBody = (req, res, next) => {
//   const { error } = updateSchema.validate(req.body);
//   if (error) {
//     return next(HttpError(400, error.message));
//   }

//   const fields = Object.keys(req.body);
//   if (fields.length === 0) {
//     return next(HttpError(400, "No fields provided to update"));
//   }

//   next();
// };




// const HttpError  = require("../helpers/HttpError");

// const validateBody = schema =>{
//     const func = async (req, res, next)=>{
//         const { error } = schema.validate(req.body);
//     if (error) {
//       next(HttpError(400, error.message));
//     }
//     next();
//     }
//     return func
// };

// module.exports = {
//     validateBody,
// }


