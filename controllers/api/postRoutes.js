const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get the form for creating a new post
router.get('/new', withAuth, (req, res) => {
    res.render('createPost', { title: 'Create New Post' }); // Assumes you have a createPost.hbs view
});

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to add a comment
router.post('/comments', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId,
            postId: req.body.postId
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const result = await Comment.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId // ensures only the comment creator can delete their comment
            }
        });

        if (result > 0) {
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ message: 'No comment found with this id or you do not have permission to delete it' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId // ensures users can only update their own posts
            }
        });

        if (updatedPost[0] > 0) {
            res.status(200).json({ message: 'Post updated successfully' });
        } else {
            res.status(404).json({ message: 'No post found with this id' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId, // ensures users can only delete their own posts
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
