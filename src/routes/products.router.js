const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/products.controller");
const login = require("../middlewares/login.middleware");
const isAdmin = require("../middlewares/admin.middleware");

router.use(login)

router.get("/", controller.getAllProducts);

router.get("/:id", controller.getProductById);

router.post("/", isAdmin, controller.saveProduct);

router.put("/:id", isAdmin, controller.updateProductById);

router.delete("/:id", isAdmin, controller.deleteProductById);

module.exports = router;
