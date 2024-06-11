const router = require('express').Router();
const User = require('../../models/User');

// GET login page
router.get('/login', (req, res) => {
    res.render('login'); // Ensure you have a 'login.hbs' file in your views directory
});

// GET signup page
router.get('/signup', (req, res) => {
    res.render('signup'); // Ensure you have a 'signup.hbs' file in your views directory
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

            res.status(200).json(newUser);
        });
    } catch (error) {
        res.status(500).json(error);
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
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ user: user, message: 'You are now logged in!' });
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// POST logout - log out a user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
