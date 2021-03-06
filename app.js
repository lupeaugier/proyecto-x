var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");

// session
const session = require("express-session");

// cookies middleware
const rememberMeMiddleware = require("./middleware/rememberMeMiddleware");

// rutas
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var productRouter = require("./routes/product");
var cartRouter = require("./routes/cart");
var adminRouter = require("./routes/admin");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(session({ secret: "coquita" }));
app.use(rememberMeMiddleware);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

require("dotenv").config();

app.use("/", indexRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use ("/administracion", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).render("not-found");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
