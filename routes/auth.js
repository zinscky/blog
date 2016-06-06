
var jwt = require("jsonwebtoken");

//==============================================================================
// Middleware to authenticate token
// Called before all api requests
//==============================================================================
module.exports = function(req, res, next) {
  var token = req.headers["x-access-token"];
  if(token) {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if(err) {
        return utils.sendResponse(res, 401, false, null, ["Malformed token"]);
      }
      req.token = decoded;
      next();
    });
  }
  else {
    return utils.sendResponse(res, 401, false, null, ["No token"]);
  }
};
