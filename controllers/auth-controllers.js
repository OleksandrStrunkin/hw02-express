const HttpError = require("../helpers/HttpError");
const { ctrlWrapper } = require("../utils/ctrlWrapper");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const {nanoid} = require("nanoid");
const sendEmail = require("../helpers/sendEmail")

const jwt = require("jsonwebtoken");
const {SECRET_KEY, BASE_URL} = process.env;

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

  const verificationToken = nanoid();

  const result = await User.create({ ...req.body, password: hashPassword, avatarUrl, verificationToken });

  const verifyEmail ={
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}"> Click verify email</a>`
  }

  await sendEmail(verifyEmail);

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
  
  if (!user.verify) {
    throw HttpError(401, "Email not verify");
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

const verify = async(req, res) =>{
  const {verificationToken} = req.params;
  const user = await User.findOne({verificationToken});
  if (!user) {
    throw HttpError(404, 'User not found')
  }
  await User.findByIdAndUpdate(user._id, {verify:true, verificationToken: ""});

  res.json({
    message: "Verification successful"
  })
}

const resendVerifyEmail=async (req, res) =>{
  const {email} = req.body;
  const user = await User.findOne({email});
  if (!user) {
    throw HttpError (400, "missing required field email")
    
  }
  if(user.verify){
    throw HttpError (400, "Verification has already been passed")
  }

  const verifyEmail ={
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}"> Click verify email</a>`
  }

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent"
  })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail)
};
