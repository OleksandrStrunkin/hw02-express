const express = require("express");
const ctrl = require('../../controllers/contacts-controllers')
const router = express.Router();
const { validateBody, validateUpdateBody } = require('../../utils/validateBody')


router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getIdContact);

router.post("/", validateBody, ctrl.addContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", validateUpdateBody, ctrl.updateContact);

module.exports = router;
