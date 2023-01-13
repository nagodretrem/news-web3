const router = require("express").Router();
const User = require("../models/userModel");
const APIError = require("../utils/errors");
const Response = require("../utils/response");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log("users", users);
    return new Response(users, "Users").success(res);
  } catch (err) {
    APIError(err.message, 500, "Users Fetch Failed").send(res);
  }
});

router.patch("/user/:_id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params._id, {
      $set: req.body,
    });
    return new Response(user, "User Updated").success(res);
  } catch (err) {
    APIError(err.message, 500, "User Update Failed").send(res);
  }
});

module.exports = router;
