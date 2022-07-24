const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");
const cartModel = require("../models/cart.model");
const messageModel = require("../models/message.model")

class ModelFactory {
  static getModel(modelName) {
    switch (modelName) {
      case "user":
        return userModel;
      case "cart":
        return cartModel;
      case "product":
        return productModel;
      case "order":
        return orderModel;
      case "message":
        return messageModel
      default:
        throw new Error("Model doesnt exit");
    }
  }
}

module.exports = ModelFactory;
