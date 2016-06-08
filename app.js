"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var path = require("path");
var mongoose = require("mongoose");
var dotenv = require("dotenv");

// DOTENV
dotenv.config();

// PORT
var port = process.env.PORT || 3000;

// Import API Modules
var users = require("./routes/users");
var login = require("./routes/login");
var articles = require("./routes/articles");

// MongoDB Connection
mongoose.connect(process.env.DB_HOST);

// App Init
var app = express();

// Morgan Logger
app.use(morgan("dev"));

// Static Path
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie Parser and session
app.use(cookieParser());

// API Routers
app.use("/api/v1/users", users);
app.use("/api/v1/login", login);
app.use("/api/v1/articles", articles);
//app.use("api/v1/login", login_api);
//app.use("api/v1/register", register_api);

// Start Listening
app.listen(port, function() {
  console.log("Server at: http://localhost:");
});
