module.exports.validationErrors = {
  username: {
    invalid: "Username is not valid. It must be atleast 3 characters " +
      "long and less than 20 characters. It must contain only letters, " +
      "numbers and underscores.",
    required: "Username is required."
  },
  email: {
    invalid: "This is not a valid Email.",
    required: "Email is required"
  },
  password: {
    invalid: "Password is not valid. It must contain 8 to 25 characters. All special " +
      "characters are allowed. It must not contain any whitespaces like blank spaces.",
    required: "Password is required.",
    unmatched: "Passwords did not match."
  },
  firstname: "First name must contain only letters.",
  lastname: "Last name must contain only letters."
}
