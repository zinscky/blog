"use strict";

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var validator = require("../utils/myValidator");
var jwt = require("jsonwebtoken");
var utils = require("../utils/utility");

require("dotenv").config();

//==============================================================================
// Create a new User.
// POST - api/v1/users
//==============================================================================
router.post("/", function(req, res) {
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.name.first = req.body.firstname;
  newUser.name.last = req.body.lastname;
  newUser.email = req.body.email;

  var validationErrors = validator.validateUser(newUser, req.body.confirmPassword);

  if(validationErrors.length > 0) {
    res.status(400); // Bad request, since input validtion failed
    return res.json({
      success: false,
      payload: null,
      errors: validationErrors
    });
  }


  User.createNewUser(newUser, function(err, result) {
    if(err) {
      if(err.name === "MongoError" && err.code === 11000) { // User already exists
        res.status(500);
        res.json({
          success: false,
          payload: null,
          errors: ["User already exists!"]
        });
      }
      else { // Some internal server error
        res.status(500).json({
          success: false,
          payload: null,
          errors: err
        });
      }
    } else { // User created sucessfully
      res.status(201);
      res.json({
        success: true,
        payload: result,
        errors: null
      });
    }
  });
});

//==============================================================================
// Get All Users.
// GET - api/v1/users
//==============================================================================
router.get("/", require("./auth"), function(req, res) {
  User.getAllUsers(function(err, users) {
    if(err) throw err;
    res.set("jwt", JSON.stringify(req.token));
    utils.sendJsonResponse(res, 200, true, users, null);
  });
});

module.exports = router;
