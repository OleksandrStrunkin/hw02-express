const contacts = require("../models/contacts");
const HttpError  = require("../helpers/HttpError");
const { ctrlWrapper } = require('../utils/ctrlWrapper')
const {updateSchema} = require('../schemas/update-schema')

const { Contact, updateFavoriteSchema } = require("../models/contactsM")


const getAllContacts = async (req, res) => {
          const result = await Contact.find();
          res.json(result);
      }

const getIdContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, `Book with ${id} not found`);
    }
    res.json({
      message: "Delete success",
    });
}

const updateContact = async (req, res) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, `"message": "missing fields"`);
  }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.status(201).json(result);
    res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, `"message": "missing fields favorite"`);
  }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
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
  updateStatusContact: ctrlWrapper(updateStatusContact),
}