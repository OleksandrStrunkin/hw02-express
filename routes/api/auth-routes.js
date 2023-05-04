const express = require("express");
const ctrl = require('../../controllers/auth-controllers')
const router = express.Router();
const { validateRegisterBody, validateLoginBody, validateEmail } = require('../../utils/validateBody');
const errorHandler = require("../../helpers/ErrorHandler");
const authenticate = require("../../utils/authenticate");
const upload =require("../../utils/upload")


router.post("/register", validateRegisterBody, ctrl.register);

router.post("/login", validateLoginBody, ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", validateEmail, ctrl.resendVerifyEmail)

router.use(errorHandler);

module.exports = router;