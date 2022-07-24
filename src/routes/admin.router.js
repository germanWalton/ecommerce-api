const express = require("express");
const { Router } = express;
const router = Router();
const login = require("../middlewares/login.middleware");
const isAdmin = require("../middlewares/admin.middleware")
const controller = require("../controllers/admin.controller");
 router.use(login,isAdmin)

router.get("/", controller.root);

router.get("/users", controller.users);

router.get("/products", controller.products);

router.get("/pedidos", controller.orders);

router.get("/add/product", controller.formProduct);

router.post("/add/product", controller.addNewProduct);

router.get("/add/user", controller.formUser);

router.post("/add/user", controller.addNewUser )

module.exports = router;
