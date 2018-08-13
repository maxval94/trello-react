const createError = require("http-errors");
const express = require("express");
const expressValidator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");

const config = require("./config");
const mongoose = require("./db");
const { auth } = require("./routes/api/modules/auth");
const indexRouter = require("./routes/index");
const graphQLRouter = require("./routes/api");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(expressValidator());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: config.get("session:secret"),
    key: config.get("session:key"),
    cookie: config.get("session:cookie"),
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: true,
    resave: true
  })
);
app.use(express.static(path.join(__dirname, "public")));

// Configure the strategy for use by Passport.
auth(passport);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

// Apply GraphQL middleware
graphQLRouter.applyMiddleware({ app });
app.use("/graphql", () => {});

app.all("*", (req, res) => {
  res.json({ all: true });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
