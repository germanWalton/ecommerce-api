const mongoose = require("mongoose");
const moment = require("moment");
const { schema, normalize } = require("normalizr");
const faker = require("faker");
const logger = require("../log/index");
const BaseModel = require("./base.model");

class Message extends BaseModel {
  constructor() {
    const schema = new mongoose.Schema({
      author: {
        email: { type: String, default: faker.internet.email() },
        name: { type: String, default: faker.name.firstName() },
        lastName: { type: String, default: faker.name.lastName() },
        age: { type: Number, default: faker.datatype.number() },
        alias: { type: String, default: faker.internet.userName() },
        avatar: { type: String, defualt: faker.internet.avatar() },
      },
      text: String,
      date: { type: String, default: moment().format("DD/MM/YYYY HH:mm:ss") },
    });
    super("messages", schema);
  }

 

  async readMessages() {
    const author = new schema.Entity("authors", {}, { idAttribute: "email" });
    const message = new schema.Entity("messages", {
      author: author,
    });
    const data = new schema.Entity("data", {
      messages: [message],
    });
    const dbMessages = await this.model.find({});

    const normalizeData = normalize(
      {
        id: "messages",
        messages: dbMessages.map((d) => {
          return {
            author: d.author,
            text: d.text,
            id: d._id.toString(),
            date: d.date,
          };
        }),
      },
      data
    );

    logger.info(normalizeData);
    return normalizeData;
  }
}

module.exports = new Message();
