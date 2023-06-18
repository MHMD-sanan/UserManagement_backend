const User = require("../model/user");

module.exports.register = async (req, res, next) => {
  const {
    fullName,
    email,
    dateOfBirth,
    password,
    phoneNumber,
    secuirityQuestions,
    secuirityAnswear,
    address,
    city,
    state,
    zipCode,
    country,
  } = req.body;
  try {
    const user = await User.create({
      fullName,
      email,
      dateOfBirth,
      password,
      phoneNumber,
      secuirityQuestions,
      secuirityAnswear,
      address,
      city,
      state,
      zipCode,
      country,
    });

    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
    user
  });
};
