const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to update a post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // ensures users can only update their own posts
      },
    });

    if (updatedPost[0] > 0) {
      res.status(200).json({ message: "Post updated successfully" });
    } else {
      res.status(404).json({ message: "No post found with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a post via POST
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id, // ensures users can only delete their own posts
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
