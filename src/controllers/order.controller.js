const logger = require("../log/index");
const service = require('../services/order.service')
const nodemailer = require("../notifications/mail")

const sendOrder = async (req, res) => {
  const {email, items } = req.body
  try {
   const order = await service.create({ email, items });
    await nodemailer.send(items,email)
    res.status(200).send(order)
  } catch (e) {
    logger.error(e);
    res.status(500).send({ error: e.message });
  }
};



module.exports = {
  sendOrder
};
