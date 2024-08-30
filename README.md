# Trip Planner API

## Overview

The Trip Planner API allows users to search for trips from an origin to a destination and sort the results by the fastest or cheapest option. Additionally, the API includes a simple Trip Manager that allows users to save, list, and delete trips.

## Features

- **Get Trips**: Retrieve trips from an external API, filtered by origin and destination, and sorted by the fastest or cheapest option.
- **Trip Manager**: Save, list, and delete trips locally.

## Technologies

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **Jest**: Testing framework
- **Supertest**: HTTP assertions for testing
- **Nodemon**: Automatically restarts the server when file changes are detected

## Prerequisites

- **Node.js** (version 20.x)
- **npm** (Node package manager)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/franceskahoxha/trip-planner
   cd trip-planner-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   API_URL=https://api-url.com/path
   API_KEY=api-key
   PORT=3000
   ```

## Running the Application

1. **Start the server:**

   ```bash
   npm start
   ```

   The server will start on the port specified in the `.env` file (default is `3000`).

2. **Access the API:**

   - **Search Trips**: `GET /search-trips?origin=SYD&destination=GRU&sort_by=cheapest`
   - **Trip Manager**:
     - Save a trip: `POST /trip-manager/save`
     - List all trips: `GET /trip-manager/list`
     - Delete a trip: `DELETE /trip-manager/delete/:id`

## Testing

1. **Run tests:**

   To run the tests, execute the following command:

   ```bash
   npm test
   ```

   This will run all the tests using Jest and Supertest.

2. **Test Coverage:**

   To generate a test coverage report, run:

   ```bash
   npm test -- --coverage
   ```

