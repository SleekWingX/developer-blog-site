const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

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
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get the form to edit an existing post
router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: {
                        model: User
                    }
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('editPost', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get user's dashboard with their posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [User]
        });
        const posts = userPosts.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
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
                logged_in: req.session.logged_in
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get the form for creating a new post
router.get('/dashboard/new', withAuth, (req, res) => {
    res.render('createPost', { title: 'Create New Post' }); // Assumes you have a createPost.hbs view
});

router.get('/login', (req, res) => {
    // if user is logged in re-route them to the dashboard
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
      }
    res.render('login'); // Assumes you have a createPost.hbs view
});

router.get('/signup', (req, res) => {
    res.render('signup'); // Assumes you have a createPost.hbs view
});




module.exports = router;
