const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");


router.get("/", controller.root);

router.get("/current", controller.currentUser);

router.get("/:id", controller.userById);

router.delete("/:id",controller.deleteById)

module.exports = router;
