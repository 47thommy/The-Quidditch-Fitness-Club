const User = require("../models/userModel");

const login = (req, res) => {
  res.json({ message: "Login" });
};

const signup = (req, res) => {
  res.json({ message: "login" });
};

module.exports = {
  login,
  signup,
};
