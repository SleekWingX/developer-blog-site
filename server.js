const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./config/config');
const User = require('./models/User'); // Ensure User model is correctly used

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js as your templating engine
app.engine('hbs', require('express-handlebars')({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up session with Sequelize store
app.use(session({
    secret: 'super secret',
    store: new SequelizeStore({
        db: sequelize,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        // Session expires after 30 minutes of inactivity
        expires: 30 * 60 * 1000
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const homeRoutes = require('./controllers/homeRoutes');
const userRoutes = require('./controllers/api/userRoutes');
const postRoutes = require('./controllers/api/postRoutes');

// Use routes
app.use('/', homeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
