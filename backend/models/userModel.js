const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.statics.signUp = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Enter a valid email address");
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("User with the specified email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const user = await this.findOne({ email: email });
  if (!user) {
    throw Error("email or password incorrect");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("email or password incorrect");
  }

  return user;
};
module.exports = mongoose.model("user", userSchema);
