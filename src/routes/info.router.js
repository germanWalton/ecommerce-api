const express = require("express");
const { fork } = require("child_process");
const { Router } = express;
const router = Router();
const controller = require('../controllers/info.controller')

router.get("/", controller.info);

module.exports = router