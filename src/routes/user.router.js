const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/user.controller");
const login = require("../middlewares/login.middleware");
const isAdmin = require("../middlewares/admin.middleware");

router.use(login);

router.get("/", isAdmin, controller.root);

router.get("/current", controller.currentUser);

router.get("/:id", controller.userById);

router.delete("/:id", isAdmin, controller.deleteById);

module.exports = router;
