let savedTrips = []; // Local storage for trips, using an in-memory array for simplicity

/**
 * Save a trip to the local storage.
 * This function is used as an API endpoint handler to save a trip.
 * It expects the trip data to be sent in the request body.
 */
exports.saveTrip = (req, res) => {
  const trip = req.body; // Extract trip data from the request body

  // Basic validation to ensure necessary fields are provided
  if (!trip || !trip.id || !trip.origin || !trip.destination) {
    return res.status(400).json({ error: 'Invalid trip data' }); // Return an error if validation fails
  }

  // Save the trip to the local storage
  savedTrips.push(trip);
  res.status(201).json({ message: 'Trip saved successfully', trip }); // Return a success response with the saved trip
};

/**
 * List all saved trips.
 * This function is used as an API endpoint handler to return all trips stored in local storage.
 */
exports.listTrips = (req, res) => {
  res.json(savedTrips); // Return the array of saved trips as a JSON response
};

/**
 * Delete a trip by its ID.
 * This function is used as an API endpoint handler to delete a specific trip from local storage.
 * It expects the trip ID to be provided as a URL parameter.
 */
exports.deleteTrip = (req, res) => {
  const { id } = req.params; // Extract the trip ID from the URL parameters

  // Find the index of the trip with the matching ID
  const index = savedTrips.findIndex(trip => trip.id === id);
  
  // If the trip is not found, return a 404 error
  if (index === -1) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  // Remove the trip from the array
  savedTrips.splice(index, 1);
  res.json({ message: 'Trip deleted successfully' }); // Return a success message
};
