const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide your full name"],
    match: [/^[A-Za-z]{1,50}$/, "Please provide a valid name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Please provide Date of birth"],
    match: [
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
      "Please provide a valid date of birth",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    match: [/^(?=.*[A-Z])(?=.*\d).{8,}$/, "Please provide a valid password"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please provide phone number"],
    match: [/^\d{10}$/, "Please provide a valid phone number"],
  },
  secuirityQuestions: {
    type: String,
    required: [true, "Please provide secuirity question"],
    match: [/^.{1,100}$/, "Please provide a valid secuirity question"],
  },
  secuirityAnswear: {
    type: String,
    required: [true, "Please provide secuirity answear"],
    match: [/^.{1,100}$/, "Please provide a valid secuirity answea"],
  },
  address: {
    type: String,
    required: [true, "Please provide address"],
    match: [/^.{1,100}$/, "Please provide a valid address"],
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
    match: [/^[A-Za-z]{1,100}$/, "Please provide a valid city"],
  },
  state: {
    type: String,
    required: [true, "Please provide state"],
    match: [/^[A-Za-z]{1,100}$/, "Please provide a valid state"],
  },
  zipCode: {
    type: String,
    required: [true, "Please provide zipCode"],
    match: [/^\d{6}$/, "Please provide a valid zipCode"],
  },
  country: {
    type: String,
    required: [true, "Please provide country"],
    match: [/^[A-Za-z]{1,100}$/, "Please provide a valid country"],
  },
});

// hash password before saving to database
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//compare password
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
