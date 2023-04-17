const express = require("express");
const ctrl = require('../../controllers/contacts-controllers')
const router = express.Router();
const { validateBody, validateUpdateBody, validateUpdateFavoriteBody } = require('../../utils/validateBody');


router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getIdContact);

router.post("/", validateBody, ctrl.addContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", validateUpdateBody, ctrl.updateContact);

router.patch("/:id/favorite", validateUpdateFavoriteBody, ctrl.updateStatusContact);

module.exports = router;
