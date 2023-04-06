const joi = require("joi");

const addSchema = joi.object({
  name: joi.string().required().messages({
    "any.required": `"name" is required`,
  }),
  email: joi.string().required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`,
  }),
  phone: joi.string().required().messages({
    "any.required": `"phone" is required`,
    "string.empty": `"phone" cannot be empty`,
    "string.base": `"phone" must be string`,
  }),
}).and("name", "email", "phone");

  module.exports = {
    addSchema,
  }