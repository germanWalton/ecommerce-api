const mongoose = require("mongoose");
const moment = require("moment");
const logger = require('../log/index')
const BaseModel = require('../models/base.model');


class Product extends BaseModel {
  constructor() {
    const schema = new mongoose.Schema({
      name: String,
      description: String,
      price: Number,
      thumbnail: String,
      code: String,
      stock: { type: Number, default: 0 },
      timestamp: {
        type: String,
        default: moment().format("DD/MM/YYYY HH:mm:ss"),
      },
    });

    super('products',schema)
  }

  async getByCode(code) { 
    const product = await this.model.findOne({ code: code });
    return product;
    
  }

  
}

module.exports = new Product();
