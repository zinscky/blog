"use strict";

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var userSchema = mongoose.Schema({
  username: {type: String, index: true, unique: true, required: true},
  email: {type: String, index: true, unique: true, required: true},
  name: {
    first: {type: String, default: ""},
    last: {type:String, default: ""}
  },
  password: {type: String, required: true},
  created: {type: Date, default: Date.now}
});

var User = module.exports = mongoose.model("User", userSchema);

// Create New User
module.exports.createNewUser = function(newUser, done) {
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);
  newUser.password = bcrypt.hashSync(newUser.password, salt);

  User.create(newUser, function(err, user) {
    if(err) return done(err, false);
    return done(false, user);
  });
};

// Get User By ID
module.exports.getUserById = function(user_id, done) {
  User.findById(user_id, function(err, user) {
    if(err) return done(err, false);
    return done(false, user);
  });
};

// Get All Users
module.exports.getAllUsers = function(done) {
  User.find({}, function(err, users) {
    if(err) return done(err, false);
    done(false, users);
  });
};
