const  HttpError  = require("../helpers/HttpError");
const {addSchema} = require('../schemas/contact-schema')

const validateBody = (req, res, next) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
  
    const requiredFields = ["name", "email", "phone"];
    const missingFields = requiredFields.filter((field) => !(field in req.body));
    if (missingFields.length > 0) {
      const message = `missing required ${missingFields.join(" and ")} field${
        missingFields.length > 1 ? "s" : ""
      }`;
      return next(HttpError(400, message));
    }
  
    next();
};

module.exports = {
  validateBody,
};









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


