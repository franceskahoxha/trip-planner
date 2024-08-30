const express = require('express'); 
const { getTrips } = require('../controllers/getTrips.controllers');

const router = express.Router(); // Create a new Express router

// Define a GET route for '/' that handles searching trips
router.get('/', getTrips); // When a GET request is made to this route, the getTrips function is called

module.exports = router; 
