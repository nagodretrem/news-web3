const router = require("express").Router();
const multer = require("multer");
const upload = require("../middlewares/lib/upload");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const Post = require("../models/postModel");
const { verifyToken } = require("../middlewares/auth");

router.post("/post", verifyToken, upload, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      image: "public/uploads/" + req.savedImages[0],
      author: req.user._id,
    });

    return new Response(post, "Post Created").success(res);
  } catch (err) {
    APIError(err.message, 500, "Post Creation Failed").send(res);
  }
});

router.get("/post", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["name", "lastname"])
      .sort({ createdAt: -1 })
      .limit(20);

    return new Response(posts, "Posts").success(res);
  } catch (err) {
    APIError(err.message, 500, "Posts Fetch Failed").send(res);
  }
});

router.get("/post/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "author",
      ["name", "lastname"]
    );
    return new Response(post, "Post").success(res);
  } catch (err) {
    APIError(err.message, 500, "Post Fetch Failed").send(res);
  }
});

router.get("/profile/:_id", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params._id })
      .populate("_id", "slug")
      .sort({ createdAt: -1 })
      .limit(20);
    return new Response(posts, "Posts").success(res);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/post/:_id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, {
      $set: req.body,
    });

    return new Response(post, "Post Updated").success(res);
  } catch (err) {
    APIError(err.message, 500, "Post Update Failed").send(res);
  }
});

module.exports = router;
