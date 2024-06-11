require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { sequelize } = require('./config/config');
const SessionModel = require('./models/session')(sequelize);
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure Sequelize store for sessions
const myStore = new SequelizeStore({
    db: sequelize,
    model: SessionModel  // Use the SessionModel you defined and imported
});

// Set up Handlebars.js as your templating engine
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up session with Sequelize store
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: myStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000  // 30 minutes
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

// Function to initialize the server
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Ensure the session model is properly initialized before syncing
        await sequelize.sync();  // Sync all models
        console.log("All models were synchronized successfully.");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start the server:', err);
    }
}

startServer();
