const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Route to get all posts and render the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get user's dashboard with their posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: { userId: req.session.userId },
            include: [User]
        });
        const posts = userPosts.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get a single post and its comments
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('post', {
                post,
                loggedIn: req.session.loggedIn
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
