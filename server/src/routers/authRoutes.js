const router = require("express").Router();
const authValidation = require("../middlewares/validations/authValidation");
const { login, register, me } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/auth");

router.post("/login", authValidation.login, login);

router.post("/register", authValidation.register, register);

router.get("/me", verifyToken, me);

module.exports = router;
