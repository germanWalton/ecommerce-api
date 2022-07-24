(async () => {
  const args = require("./args/yargs");
  const express = require("express");
  const compression = require("compression");
  const path = require("path");
  const app = express();
  const http = require("http");
  const mongoose = require("mongoose");
  const swaggerMiddleware = require("./middlewares/swagger.middleware")

  //socket io
  const { Server } = require("socket.io");
  const server = http.createServer(app);
  const io = new Server(server)

  const { engine } = require("express-handlebars");
  const cors = require("cors");
  // middlewares
  const cookieParser = require("cookie-parser");
  const session = require("express-session");
  // session store
  const MongoStore = require("connect-mongo");
  const config = require("./config");
  // routers
  const homeRouter = require("./routes/home.route");
  const cartRouter = require("./routes/cart.route");
  const productRouter = require("./routes/products.route");
  const userRouter = require("./routes/user.route");
  const adminRouter = require("./routes/admin.route");
  const notificationRouter = require("./routes/notifications.route");
  const infoRouter = require("./routes/info.router.js")
  // passport
  const passport = require("passport");
  const flash = require("express-flash");
  const initializePassport = require("./passport/local");

  //log4js
  const logger = require("./log/index");

  const PORT = args.port;

  const { HOSTNAME, SCHEMA, DATABASE, USER, PASSWORD, OPTIONS } =
    config.mongoConfig;

  initializePassport(passport);
  swaggerMiddleware(app)

  app.set("view engine", "hbs");
  app.engine(
    "hbs",
    engine({
      layoutsDir: path.join(__dirname, "../views/layouts"),
      extname: "hbs",
      defaultLayout: "index",
    })
  );

  mongoose
    .connect(
      `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`
    )
    .then(() => {
      logger.info("Connected to mongo");
    });

  app.use((req, res, next) => {
    logger.info(`Request recived ${req.method} method at ${req.url}`);
    next();
  });

  // configurar CORS
  const corsCallback = (req, cb) => {
    const origin = req.header("Origin");
    const allowedHosts = ["http://localhost:3000", "http://localhost:8080"];

    if (allowedHosts.includes(origin)) {
      cb(null, { origin: true });
    } else {
      cb(null, { origin: false });
    }
  };
  app.use(cors(corsCallback));

  //json middlewares -> req.body {}
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(flash());
  app.use(cookieParser("Esto es un secreto")); //req.cookies = {}
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,

      store: new MongoStore({
        mongoUrl: `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`,
        ttl: 10 * 60,
        expires: 1000 * 1 * 60,
        autoRemove: "native",
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/static", express.static(path.join(__dirname, "../public")));
  app.use("/", compression(), homeRouter);
  app.use("/admin", compression(), adminRouter);
  app.use("/info", compression(), infoRouter);


  app.use("/api/cart", compression(), cartRouter);
  app.use("/api/products", compression(), productRouter);
  app.use("/api/user", compression(), userRouter);
  app.use("/api/sms", compression(), notificationRouter);

  //log4js
  app.get("*", (req, res) => {
    logger.warn(`Request received ${req.method}`);
    logger.warn(`The route http://localhost:${PORT}${req.path} doesn't exist`);
    res.send("not found");
  });



  //socket

  const Message = require("./models/message.model");

  io.on("connection", async (socket) => {
    // cuando una nueva conexión llega al server
    logger.info(`an user connected ${socket.id}`);

    // envío de mensajes
    socket.emit("Messages", await Message.readMessages());

    socket.on("Msg", async (message) => {
      // guardo el mensaje
      await Message.saveMessage(message);
      // renderizo los mensajes
      io.sockets.emit("Messages", await Message.readMessages());
    });
  });

  server.listen(PORT, () =>
  logger.info(`worker with pid ${process.pid} listening on https://localhost:${PORT}`)

);
  // module.exports = {
  //   app,
  //   server,
  // };
})();
