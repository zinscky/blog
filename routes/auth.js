
var jwt = require("jsonwebtoken");
var utils = require("../utils/utility");

//==============================================================================
// Middleware to authenticate token
// Called before all api requests
//==============================================================================
module.exports = function(req, res, next) {
  var token = req.cookies["access-token"];
  if(token) {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if(err) {
        return utils.sendJsonResponse(res, 401, false, null, ["Malformed token"]);
      }
      req.token = decoded;
      next();
    });
  }
  else {
    return utils.sendJsonResponse(res, 401, false, null, ["No token"]);
  }
};
