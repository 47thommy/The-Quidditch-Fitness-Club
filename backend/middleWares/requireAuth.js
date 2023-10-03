const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: "no authorization token available" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRETE);
    req.user = User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ message: "invalid token" });
  }
};

module.exports = requireAuth;
