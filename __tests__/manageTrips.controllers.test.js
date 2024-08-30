const request = require('supertest');
const express = require('express');
const tripManagerRoutes = require('../src/routes/manageTrips.routes');

const app = express();
app.use(express.json());
app.use('/trip-manager', tripManagerRoutes);

describe('Trip Manager', () => {
  it('should save a trip successfully', async () => {
    const newTrip = {
      id: '1',
      origin: 'SYD',
      destination: 'GRU',
      cost: 100,
      duration: 10,
      type: 'flight',
      display_name: 'from SYD to GRU by flight'
    };

    const response = await request(app)
      .post('/trip-manager/save')
      .send(newTrip);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Trip saved successfully', trip: newTrip });
  });

  it('should return all saved trips', async () => {
    const response = await request(app).get('/trip-manager/list');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should delete a trip by ID', async () => {
    const newTrip = {
      id: '2',
      origin: 'SYD',
      destination: 'GRU',
      cost: 100,
      duration: 10,
      type: 'flight',
      display_name: 'from SYD to GRU by flight'
    };

    // First, save the trip
    await request(app).post('/trip-manager/save').send(newTrip);

    // Then, delete the trip
    const response = await request(app).delete(`/trip-manager/delete/${newTrip.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Trip deleted successfully' });
  });
});
