"user strict";

var validator = require("validator");
var messages = require("./stringResources.en")

module.exports.validateUser = function(newUser, confirmPassword) {
  var errors = [];

  /**
  ** Check Username
  ** Username not defined or passed
  */
  if(!newUser.username) {
    errors.push({
      field: "username",
      message: messages.validationErrors.username.required
    });
  }
  else {
    /**
    ** Username is defined.
    ** Check if it meets the required criteria
    ** Length betwee 3 - 20
    ** Only contains letters numbers and underscores
    ** Regular expression to check the validity.
    */
    if(!/^[a-z0-9_]{3,20}$/.test(newUser.username)) {
      errors.push({
        field: "username",
        message: messages.validationErrors.username.invalid
      });
    }
  }

  /**
  ** Check Email
  ** Email not defined or passed
  */
  if(!newUser.email) {
    errors.push({
      field: "email",
      message: messages.validationErrors.email.required
    });
  }
  else {
    /**
    ** Email is defined.
    ** Check if its a valid Email
    */
    if(!validator.isEmail(newUser.email)) {
      errors.push({
        field: "email",
        message: messages.validationErrors.email.invalid
      });
    }
  }

  /**
  ** Check Password
  ** Password not defined or passed
  */
  if(!newUser.password) {
    errors.push({
      field: "password",
      message: messages.validationErrors.password.required
    });
  }
  else {
    /**
    ** Password is defined.
    ** Check if it meets the required criteria
    ** Length between 8 - 25
    ** Must not contain whitespaces
    ** Regular expression to check the validity.
    */
    if(!/[^\s]{8,25}$/.test(newUser.password)) {
      errors.push({
        field: "password",
        message: messages.validationErrors.password.invalid
      });
    }
  }

  /**
  ** Check Confirm Password
  ** Confirm Password not defined or passed
  */
  if(!confirmPassword) {
    errors.push({
      field: "confirmPassword",
      message: messages.validationErrors.password.unmatched
    });
  }
  else {
    /**
    ** Check Confirm Password
    ** If it matches with the password
    */
    if(confirmPassword !== newUser.password) {
      errors.push({
        field: "confirmPassword",
        message: messages.validationErrors.password.unmatched
      });
    }
  }

  /**
  ** Check First Name
  ** If defined then check if its valid
  */
  if(newUser.name.first) {
    if(!validator.isAlpha(newUser.name.first)) {
      errors.push({
        field: "firstname",
        message: messages.validationErrors.firstname
      });
    }
  }

  /**
  ** Check Last Name
  ** If defined then check if its valid
  */
  if(newUser.name.last) {
    if(!validator.isAlpha(newUser.name.last)) {
      errors.push({
        field: "lastname",
        message: messages.validationErrors.lastname
      });
    }
  }
  return errors;
};
