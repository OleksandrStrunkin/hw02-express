const Joi = require("joi");

const {Schema, model} = require("mongoose");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const usersSchema = new Schema({
    email: {
      type: String,
      unique:true,
      required: [true, 'Email is required'],
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
    avatarUrl: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  }, {versionKey: false});

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})


const User = model("user", usersSchema);

module.exports = {
  User,
  loginSchema,
  registerSchema,
  emailSchema,
};