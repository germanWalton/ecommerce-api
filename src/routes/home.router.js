const Router = require("express").Router;
const login = require("../middlewares/login.middleware");
const router = Router();
const controller = require("../controllers/home.controller");

router.get("/", login, controller.root);

router.get("/login", controller.loginForm);

router.get("/register", controller.registerForm);

router.post("/login", controller.login);

router.post("/register", controller.register);

router.get("/logout", login, controller.logout);

router.get("/cart", login, controller.cart);

router.get("/order", login, controller.order);


module.exports = router;
