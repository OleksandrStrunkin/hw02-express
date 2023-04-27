const HttpError = require("../helpers/HttpError");
const { ctrlWrapper } = require("../utils/ctrlWrapper");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;

const { User } = require("../models/users");

const register = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });
  if (!result) {
    throw HttpError(404, `Contact with not found`);
  }

  res.status(201).json({
    email: result.email,
    subscription: "starter",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});
  await User.findByIdAndUpdate(user._id, {token})
  res.json({
    token,
    user:{
      email,
      subscription: "starter"
    }
  });
};

const getCurrent = async(req, res)=>{
  const {name, email}= req.user;

  res.json({
    name,
    email,
  })
}
const logout = async(req, res)=>{
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ""});

  res.status(204).send();
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout)
};
