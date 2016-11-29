var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var passport = require("passport");

var home = require("./routes/home");
var web = require("./routes/web");
var user = require("./routes/user");
var auth = require("./routes/auth");
var message = require("./routes/message");
var rating = require("./routes/rating");
var payment = require("./routes/payment");

var app = express();

var allowCrossDomain = function (req, res, next) {
  var allowedOrigins = [
    "http://localhost:3000"
  ];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1)
    res.setHeader("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, authorization");
  // res.header("Access-Control-Allow-Credentials", true);
  next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(allowCrossDomain);

app.use("/", home);
app.use("/", web);
app.use("/", auth);
app.use("/users", user);
app.use("/messages", message);
app.use("/ratings", rating);
app.use("/payment", payment);

function redirectRouterUnmatched(req, res, next) {
  res.sendFile("/index.html", { root: "./" });
}

app.use(redirectRouterUnmatched);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("App error 404");
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}
else
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });

module.exports = app;
