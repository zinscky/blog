module.exports.sendJsonResponse = function(res, status, success, payload, errors) {
  res.status(status).json({
    success: success,
    payload: payload,
    errors: errors
  });
};
