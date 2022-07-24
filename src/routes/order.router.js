const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/order.controller");
const login = require("../middlewares/login.middleware");

router.use(login)



router.post("/", controller.sendOrder)


module.exports = router