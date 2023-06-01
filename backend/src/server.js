const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const indexRoute = require('./routes/index.route');
const startServer = require('./startServer');
const errorHandlingMiddleware = require('./middlewares/errorHandling.middleware');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const path = require('path');
require('dotenv').config();

const app = express();

// Body parser middleware to parse JSON seederData
app.use(express.json());

// Body parser middleware to parse URL-encoded seederData
app.use(express.urlencoded({extended: true}));

// CORS middleware to enable Cross-Origin Resource Sharing
app.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN_CLIENT, // Set the allowed origin from environment variable
    })
);

// Cookie parser middleware to parse cookies
app.use(cookieParser());

// Serve static files from the "assets" directory
// Example: http://localhost:5000/assets/[file_name].[png|jpg|jpeg|webp|svg]
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.use(indexRoute); // Mount index route

// Not found middleware to handle 404 routes
app.use(notFoundMiddleware);

// Error handling middleware
app.use(errorHandlingMiddleware);

// Start server: set port, connect to the database, and sync models
startServer(app);

// Export the app (optional, if needed for testing or other purposes)
module.exports = app;