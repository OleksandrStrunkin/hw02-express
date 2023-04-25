const Joi = require("joi");

const {Schema, model} = require("mongoose");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const usersSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      unique:true,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    token: {
      type: String,
      default: ""
    },
  }, {versionKey: false});

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})



const User = model("user", usersSchema);

module.exports = {
  User,
  loginSchema,
  registerSchema,
};