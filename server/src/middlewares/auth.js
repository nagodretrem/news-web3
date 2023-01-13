const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const APIError = require("../utils/errors");

const createToken = async (user, res) => {
  const payload = {
    sub: user._id,
    name: user.name,
    role: user.role,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
    algorithm: "HS512",
  });

  return res.cookie("token", token).status(201).json({
    token,
    message: "User logged in successfully",
  });
};

const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new APIError("Token is required", 401);
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userInfo = await User.findById(decoded.sub).select(
      "_id name lastname email role balance"
    );

    if (!userInfo) {
      throw new APIError("Invalid Token", 401);
    }
    req.user = userInfo;
    next();
  } catch (error) {
    throw new APIError("Invalid Token", 401);
  }
};

module.exports = {
  createToken,
  verifyToken,
};
