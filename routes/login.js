var express = require("express");
var router = express.Router();
var User = require("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

require("dotenv").config();

//======================================
// LOGIN
//======================================
router.post("/", function(req, res) {
  User.findOne({username: req.body.username}, function(err, result) {
    if(err) throw err;
    if(result) {
      if(bcrypt.compareSync(req.body.password, result.password)) {
        // Login Success
        var payload = {
          username: result.username,
          email: result.email,
          name: result.name.first + " " + result.name.last,
          user_id: result._id
        };
        var token = jwt.sign(payload, process.env.SECRET, {expiresIn: 1000*60*60*24});

        res.cookie("access-token", token, {maxAge: 300000, httpOnly: true});
        
        res.status(200).json({
          success: true,
          message: "You are successfully logged in.",
          token: token,

        });
      } else { // Password didnt match
         res.status(200).json({
           success: false,
           message: "Password incorrect"
         });
      }
    } else { // User doesn't exist
        res.status(200).json({
          success: false,
          message: "User doesn't exist."
        });
    }
  });
});

module.exports = router;
