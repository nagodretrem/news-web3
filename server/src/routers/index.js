const router = require("express").Router();

const auth = require("./authRoutes");
const post = require("./postRoute");
const user = require("./userRoute");

router.use(auth);
router.use(post);
router.use(user);

module.exports = router;
