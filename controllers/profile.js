module.exports.home = (req, res, next) => {
  const data = {
    Name: req.user.fullName,
    Email: req.user.email,
    DOB: req.user.dateOfBirth,
    Phone_Number: req.user.phoneNumber,
    Address: req.user.address,
    City: req.user.city,
    State: req.user.state,
    ZIP_code: req.user.zipCode,
    Country: req.user.country,
    Secuirity:req.user.secuirityQuestions+" ? "+req.user.secuirityAnswear,
  }
  res.status(200).json({
    success: true,
    data,
  });
};
