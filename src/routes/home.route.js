const Router = require("express").Router;
const auth = require("../middlewares/auth.middleware");
const router = Router();
const controller = require("../controllers/home.controller");

router.get("/", auth, controller.root);

router.get("/login", controller.loginForm);

router.get("/register", controller.registerForm);

router.post("/login", controller.login);

router.post("/register", controller.register);

router.get("/logout", auth, controller.logout);

router.get("/cart", auth, controller.cart);

router.get("/order", auth, controller.order);


module.exports = router;
