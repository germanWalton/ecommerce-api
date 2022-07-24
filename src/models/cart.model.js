const mongoose = require("mongoose");
const { Types } = require("mongoose")
const moment = require("moment");
const Product = require('./product.model');
const BaseModel = require('../models/base.model');



class Cart extends BaseModel {
  constructor() {
    const schema = new mongoose.Schema({
      products:{type: Array, default:[]},
      timestamp: {
        type: String,
        default: moment().format("DD/MM/YYYY HH:mm:ss")
      },
      userId:String,
    })

    super('carts',schema)
  }

  async addToCart(cartId, productId) {
    const product = await Product.getById(productId);
    const cart = await this.model.updateOne({ _id: cartId }, { $push: {products: product } })
    return cart;
  }


  async getCartProductsById(id) {
    const cartProducts = await this.model.findById(id);
    return cartProducts.products;
  }

  
  async deleteCartProductById(cartId, cod_prod) {
    
   await this.model.updateMany({ _id: cartId }, { $pull: { products: { code:cod_prod } } }) 
    
  }

  

  async getByUser(id) { 
    const cart =  await this.model.findOne({ userId: id }).lean()
    
    if (!cart) {
      return {}
    }

    return {
      id: cart._id.toString(),
      userId: cart.userId,
      products: cart.products
    }
  }
  async emptyCartByUser(userId) { 
    const cart =  await this.model.findOne({ userId })

    cart.products = []

    await cart.create()
  }

  
}

module.exports = new Cart();
