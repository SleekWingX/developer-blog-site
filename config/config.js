const Sequelize = require('sequelize');

// Check that necessary environment variables are not undefined
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST || 'localhost'; // Default to 'localhost' if not specified
const dbPort = process.env.DB_PORT || 5432; // Default PostgreSQL port is 5432

if (!dbName || !dbUser || !dbPassword) {
    console.error('Database configuration error: Missing environment variables');
    process.exit(1); // Stop the process if critical configuration is missing
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres',
    port: dbPort,
    dialectOptions: process.env.NODE_ENV === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: true // Ensure you have the necessary certificates if your database requires SSL
      }
    } : {},
    logging: process.env.NODE_ENV === 'development' ? console.log : false // Enable detailed logging in development
});

module.exports = { sequelize };
