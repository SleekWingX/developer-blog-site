const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to add a comment
router.post("/comments", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
