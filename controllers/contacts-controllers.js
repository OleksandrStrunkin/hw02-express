const contacts = require("../models/contacts");
const HttpError  = require("../helpers/HttpError");
const { ctrlWrapper } = require('../utils/ctrlWrapper')
const {updateSchema} = require('../schemas/update-schema')

const getAllContacts = async (req, res) => {
          const result = await contacts.listContacts();
          res.json(result);
      }

const getIdContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, `Book with ${id} not found`);
    }
    res.json({
      message: "Delete success",
    });
}

const updateContact = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, `"message": "missing fields"`);
  }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.status(201).json(result);
    res.json(result);
}

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getIdContact: ctrlWrapper(getIdContact),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
}