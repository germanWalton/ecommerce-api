const ModelFactory = require('../models/factory.model');
const messageModel = ModelFactory.getModel('message');



const create = async (obj) => {
  return await messageModel.save(obj)
}


module.exports = {create}