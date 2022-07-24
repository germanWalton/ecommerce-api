const mongoose = require("mongoose");
const moment = require("moment");
const BaseModel = require('../models/base.model');

class Order extends BaseModel {
  constructor() {
    const schema = new mongoose.Schema({
      userId: String,
      total: { type: Number, default: 0 },
      created: {
        type: Date,
        default: moment().format("DD/MM/YYYY HH:mm:ss"),
        send: Boolean,
      },
      items: { type: Array, default: [] },
      email:String
    });

    super('order',schema)
  }

  async updateSendOrder(id, send) {
    const order = await this.model.findById(id);

    order.send = send;

    await order.save();
  }
}


module.exports = new Order()


