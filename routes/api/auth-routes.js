const express = require("express");
const ctrl = require('../../controllers/auth-controllers')
const router = express.Router();
const { validateRegisterBody, validateLoginBody } = require('../../utils/validateBody');
const errorHandler = require("../../helpers/ErrorHandler");
const authenticate = require("../../utils/authenticate")


router.post("/register", validateRegisterBody, ctrl.register);

router.post("/login", validateLoginBody, ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout)

router.use(errorHandler)

module.exports = router;