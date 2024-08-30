const express = require('express');
const {
  saveTrip,
  listTrips,
  deleteTrip
} = require('../controllers/manageTrips.controllers'); 

const router = express.Router(); // Create a new Express router

// Route to save a trip
// When a POST request is made to '/save', the saveTrip function is called
router.post('/save', saveTrip);

// Route to list all saved trips
// When a GET request is made to '/list', the listTrips function is called
router.get('/list', listTrips);

// Route to delete a trip by ID
// When a DELETE request is made to '/delete/:id', the deleteTrip function is called
router.delete('/delete/:id', deleteTrip);

module.exports = router; 