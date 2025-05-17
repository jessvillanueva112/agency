import request from 'supertest';
import express from 'express';

const app = express();
app.get('/', (req, res) => res.json({ message: 'Welcome to Agency API' }));

describe('Agency Assistant API', () => {
  it('should return a welcome message on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBeDefined();
  });

  // Add more tests for your endpoints and logic here
}); 