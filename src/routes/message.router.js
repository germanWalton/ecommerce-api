const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/message.controller");
const login = require("../middlewares/login.middleware");

router.use(login)

router.get("/", controller.getAllMessages)

router.get("/:id", controller.getMessageById)

router.post("/", controller.saveMessage)

router.delete("/:id", controller.deleteMessageById)

router.put("/:id", controller.updateMessageById)


module.exports = router