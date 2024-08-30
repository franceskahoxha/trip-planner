const axios = require('axios');
const dotenv = require('dotenv');


dotenv.config();

const API_KEY = process.env.API_KEY; 
const API_URL = process.env.API_URL; 

/**
 * Controller function to fetch and sort trips based on origin, destination, and sorting strategy.
 * This function is exposed as an API endpoint handler.
 */
exports.getTrips = async (req, res) => {
  const { origin, destination, sort_by } = req.query; // Extract query parameters from the request

  // Validate that both origin and destination are provided
  if (!origin || !destination) {
    return res.status(400).json({ error: 'Origin and destination are required' });
  }

  try {
    // Fetch and sort trips using the helper function
    const trips = await fetchAndSortTrips(origin, destination, sort_by);
    res.json(trips); // Send the sorted trips back to the client as JSON
  } catch (error) {
    console.error('Error fetching trips:', error.message); // Log any errors

    // Check if the error has a response from the API
    if (error.response) {
      return res.status(error.response.status).json(error.response.data); // Forward the error status and data
    } else {
      return res.status(500).json({ error: 'An error occurred while fetching trips' }); // Handle generic errors
    }
  }
};

/**
 * Helper function to fetch trips from the API and sort them based on the specified criteria.
 * @param {string} origin - The IATA code for the origin airport
 * @param {string} destination - The IATA code for the destination airport
 * @param {string} sort_by - The sorting strategy, either 'fastest' or 'cheapest'
 * @returns {Array} - A sorted array of trips
 */
async function fetchAndSortTrips(origin, destination, sort_by) {
  // Make a GET request to the external API to fetch trip data
  const response = await axios.get(API_URL, {
    headers: {
      'x-api-key': API_KEY, // Include the API key in the request headers
      'Content-Type': 'application/json', // Set the content type to JSON
    },
    params: { origin, destination }, // Pass the origin and destination as query parameters
  });

  let trips = response.data; // Extract the trip data from the API response

  // Apply sorting based on the sort_by parameter
  if (sort_by === 'fastest') {
    trips.sort((a, b) => a.duration - b.duration); // Sort by duration (fastest first)
  } else if (sort_by === 'cheapest') {
    trips.sort((a, b) => a.cost - b.cost); // Sort by cost (cheapest first)
  }

  return trips; // Return the sorted array of trips
}
