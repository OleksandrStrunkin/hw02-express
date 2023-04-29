const express = require("express");
const ctrl = require('../../controllers/contacts-controllers')
const router = express.Router();
const { validateContactBody, validateUpdateBody, validateUpdateFavoriteBody } = require('../../utils/validateBody');
const authenticate = require("../../utils/authenticate");


router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:id", authenticate, ctrl.getIdContact);

router.post("/", authenticate, validateContactBody, ctrl.addContact);

router.delete("/:id", authenticate, ctrl.deleteContact);

router.put("/:id", authenticate, validateUpdateBody, ctrl.updateContact);

router.patch("/:id/favorite", authenticate, validateUpdateFavoriteBody, ctrl.updateStatusContact);

module.exports = router;
