const logger = require("../log/index");
const service = require('../services/message.service')

const getAllMessages = async (req, res) => {
  try {
    res.send(await service.getMessages());
  } catch (e) {
    logger.error(e);
    res.status(500).send({ error: e.message });
  }
};

const getMessageById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  try {
    res.send(await service.geyById(id));
  } catch (e) {
    logger.error(e);
    res.status(404).send({ error: "Message not found" });
  }
};

const saveMessage = async (req, res) => {
  const { body } = req;
  try {
    res.status(201).send(await service.save(body));
  } catch (e) {
    logger.error(e);
    res.status(500).send({ error: e.message });
  }
};

const updateMessageById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await service.update(id, body);
    res.sendStatus(201);
  } catch (e) {
    logger.error(e);
    res.status(404).send({ error: "Message not found" });
  }
};

const deleteMessageById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  try {
    await service.deleteById(id);
    res.sendStatus(202);
  } catch (e) {
    logger.error(e);
    res.status(404).send({ error: "Message not found" });
  }
};

module.exports = {
  getAllMessages,
  getMessageById,
  saveMessage,
  updateMessageById,
  deleteMessageById,
};
