const router = require('express').Router();
const User = require('../../models/User');

//

// POST signup - create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.json(newUser);  ;
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
            return res.status(400).json('error')
        }

        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            return res.status(400).json('error')
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json(user);  
        });
    } catch (error) {
        console.error('Login error:', error);
        
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
