const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login?message=Please log in to view that resource');
    } else {
        next();
    }
};

module.exports = withAuth;