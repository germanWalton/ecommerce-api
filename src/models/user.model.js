const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const BaseModel = require('../models/base.model');


class User extends BaseModel{
  constructor() {
    const schema = new mongoose.Schema({
      email: String,
      name: String,
      lastname: String,
      direction: String,
      age: Number,
      phone: String,
      avatar:String,
      password: String,
      isAdmin:{ type: Boolean, default: false}
    });

    super('users',schema)
  }



  async create(obj) {
    obj.password = await bcrypt.hash(obj.password, 10);
   return await this.model.create(obj);

  }

  async existsByEmail(email) {
    return await this.model.exists({ email });
  }


  async getByEmail(email) {
    const user = await this.model.findOne({ email });
    return {
      id:user._id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      direction: user.direction,
      age: user.age,
      phone: user.phone,
      avatar:user.avatar
      
    }
  }

 
  async isPasswordValid(email,password) {
    const user = await this.model.findOne({ email });
    
    return await bcrypt.compare(password, user.password);

  }
  

}

module.exports = new User();
