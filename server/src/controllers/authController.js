const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");

const login = async (req, res) => {
  console.log(login);
  const user = await User.findOne({ email: req.body.email });
  const passwordCheck = await bcrypt.compare(req.body.password, user.password);

  if (!user || !passwordCheck) {
    throw new APIError("Email or password is incorrect", 401);
  }

  createToken(user, res);
};

const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await User.findOne({ email });
  if (userCheck) {
    throw new APIError("User already exists", 400);
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create(req.body);
    return new Response(user).created(res);
  } catch (error) {
    throw new APIError("User failed to register", 400);
  }
};

const me = async (req, res) => {
  return new Response(req.user).success(res);
};

module.exports = {
  login,
  register,
  me,
};
