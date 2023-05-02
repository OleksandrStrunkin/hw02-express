const HttpError = require("../helpers/HttpError");
const { ctrlWrapper } = require("../utils/ctrlWrapper");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;

const jimp = require("jimp")

const path = require("path")
const fs = require("fs/promises");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const gravatar = require("gravatar")

const { User } = require("../models/users");

const register = async (req, res) => {
  const {email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarUrl = gravatar.url(email);

  const result = await User.create({ ...req.body, password: hashPassword, avatarUrl });
  if (!result) {
    throw HttpError(404, `Contact with not found`);
  }

  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    }
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

const updateAvatar = async(req, res)=>{
  const {_id} = req.user;
  const {path: tempUpload, filename} = req.file;

  const avatarName = `${_id}_${filename}`
  
  jimp.read(tempUpload)
  .then(image => {
    return image.resize(250, 250)
  })
  .then(image => {
    return image.write(result)
  })
  .catch(err => {
    console.error(err);
  });

  const result = path.join(avatarsDir, avatarName);

  await fs.rename(tempUpload, result);
  const avatarUrl = path.join("avatar", avatarName);
  await User.findByIdAndUpdate(_id, {avatarUrl})

  res.json({avatarUrl})
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar)
};
