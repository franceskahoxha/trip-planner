// Import required modules and route handlers
const express = require('express');
const dotenv = require('dotenv');
const tripRoutes = require('./routes/getTrips.routes.js'); // Import routes for searching trips
const tripManagerRoutes = require('./routes/manageTrips.routes.js'); // Import routes for managing trips

// Load environment variables from .env file
dotenv.config();

const app = express(); // Initialize an Express application

// Parse incoming JSON requests and populate req.body
app.use(express.json());

// Configure endpoint routes
app.use('/search-trips', tripRoutes); // Set up routes for searching trips
app.use('/trip-manager', tripManagerRoutes); // Set up routes for managing trips

// Basic route to return the version of the API
app.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

// Start the server on the specified port or default to port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
