const ModelFactory = require('../models/factory.model');
const messageModel = ModelFactory.getModel('message');


const getMessages = async () => {
  return await messageModel.getAll();
};

const geyById = async (id) => {
  return await messageModel.getById(id);
};

const save = async (obj) => {
  return await messageModel.save(obj)
};

const update = async (msgId, obj) => {
  return await messageModel.update(msgId, obj);
};

const deleteById = async (id) => {
  return await messageModel.deleteById(id);
};

module.exports = { getMessages, geyById, save, update, deleteById };