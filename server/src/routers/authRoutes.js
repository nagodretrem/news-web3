const router = require("express").Router();
const authValidation = require("../middlewares/validations/authValidation");
const {
  login,
  register,
  auth,
  logout,
} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/auth");

router.post("/login", authValidation.login, login);

router.post("/register", authValidation.register, register);

router.get("/auth", verifyToken, auth);

router.post("/logout", logout);

module.exports = router;
