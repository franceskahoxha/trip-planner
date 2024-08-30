const request = require("supertest");
const express = require("express");
const tripRoutes = require("../src/routes/getTrips.routes.js");
const axios = require("axios");
const dotenv = require('dotenv');


dotenv.config();

jest.mock("axios"); // Mock axios to avoid real API calls

const app = express();
app.use(express.json());
app.use("/search-trips", tripRoutes);

describe("Trip Controller", () => {

  afterAll(() => {
    jest.clearAllMocks(); // Clear all mocks after tests
  });

  it("should return 400 if origin or destination is missing", async () => {
    const response = await request(app).get("/search-trips");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Origin and destination are required",
    });
  });

  it("should return trips sorted by cheapest if sort_by is cheapest", async () => {
    // Mock API response with unsorted data
    const mockTrips = [
      {
        id: "1",
        origin: "SYD",
        destination: "GRU",
        cost: 300,
        duration: 5,
        type: "flight",
      },
      {
        id: "2",
        origin: "SYD",
        destination: "GRU",
        cost: 200,
        duration: 6,
        type: "flight",
      },
      {
        id: "3",
        origin: "SYD",
        destination: "GRU",
        cost: 400,
        duration: 4,
        type: "flight",
      },
    ];

    // Mock axios.get to return the above mockTrips data
    axios.get.mockResolvedValue({ data: mockTrips });

    const response = await request(app)
      .get("/search-trips")
      .query({ origin: "SYD", destination: "GRU", sort_by: "cheapest" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: "2",
        origin: "SYD",
        destination: "GRU",
        cost: 200,
        duration: 6,
        type: "flight",
      },
      {
        id: "1",
        origin: "SYD",
        destination: "GRU",
        cost: 300,
        duration: 5,
        type: "flight",
      },
      {
        id: "3",
        origin: "SYD",
        destination: "GRU",
        cost: 400,
        duration: 4,
        type: "flight",
      },
    ]);
  });

  it("should return trips sorted by fastest if sort_by is fastest", async () => {
    // Mock API response with unsorted data
    const mockTrips = [
      {
        id: "1",
        origin: "SYD",
        destination: "GRU",
        cost: 300,
        duration: 5,
        type: "flight",
      },
      {
        id: "2",
        origin: "SYD",
        destination: "GRU",
        cost: 200,
        duration: 6,
        type: "flight",
      },
      {
        id: "3",
        origin: "SYD",
        destination: "GRU",
        cost: 400,
        duration: 4,
        type: "flight",
      },
    ];

    // Mock axios.get to return the above mockTrips data
    axios.get.mockResolvedValue({ data: mockTrips });

    const response = await request(app)
      .get("/search-trips")
      .query({ origin: "SYD", destination: "GRU", sort_by: "fastest" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: "3",
        origin: "SYD",
        destination: "GRU",
        cost: 400,
        duration: 4,
        type: "flight",
      },
      {
        id: "1",
        origin: "SYD",
        destination: "GRU",
        cost: 300,
        duration: 5,
        type: "flight",
      },
      {
        id: "2",
        origin: "SYD",
        destination: "GRU",
        cost: 200,
        duration: 6,
        type: "flight",
      },
    ]);
  });
});
