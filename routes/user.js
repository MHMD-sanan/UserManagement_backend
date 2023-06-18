const { login } = require("../controllers/login");
const { register } = require("../controllers/register");
const { home } = require("../controllers/profile");
const { auth } = require("../middleware/auth");

const router = require("express").Router();

router.post("/login", login);

router.post("/register", register);

router.get("/",auth ,home);

module.exports = router;
