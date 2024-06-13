const router = require('express').Router();
const User = require('../../models/User');

// GET login page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });  // Passing title for consistency
});

// GET signup page
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });  // Passing title for consistency
});

// POST signup - create a new user
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            // Redirect to the dashboard page after successful signup
            res.redirect('/dashboard');
        });
    } catch (error) {
        console.error('Signup error:', error);
        // If there's an error, you might want to handle it differently
        res.status(500).render('signup', { message: 'Failed to create an account, please try again.', title: 'Sign Up' });
    }
});

// POST login - authenticate a user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!user) {
            return res.status(400).render('login', { message: 'No user account found!', title: 'Login' });
        }

        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            return res.status(400).render('login', { message: 'Incorrect password!', title: 'Login' });
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.redirect('/dashboard');  // Redirect to dashboard
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).render('login', { message: 'Unexpected error occurred. Please try again.', title: 'Login' });
    }
});

// POST logout - log out a user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.redirect('/');  // Redirect to the home page after logout
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
