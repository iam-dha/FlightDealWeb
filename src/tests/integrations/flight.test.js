const request = require('supertest');  
const app = require('../../app');  
const mongoose = require('mongoose');  
  
describe('Flight Search API', () => {  
  beforeAll(async () => {  
    // Connect to test database  
    await mongoose.connect(process.env.MONGO_URI_TEST);  
  });  
  
  afterAll(async () => {  
    // Disconnect from test database  
    await mongoose.connection.close();  
  });  
  
  test('should return flights for valid search criteria', async () => {  
    const response = await request(app)  
      .post('/api/flights/search')  
      .send({  
        origin: 'JFK',  
        destination: 'LAX',  
        departureDate: '2023-12-25',  
        returnDate: '2023-12-30',  
        passengers: {  
          adults: 2,  
          children: 0,  
          infants: 0  
        },  
        cabinClass: 'ECONOMY'  
      });  
      
    expect(response.status).toBe(200);  
    expect(response.body.success).toBe(true);  
    expect(Array.isArray(response.body.data)).toBe(true);  
  });  
  
  test('should return 400 for invalid search criteria', async () => {  
    const response = await request(app)  
      .post('/api/flights/search')  
      .send({  
        origin: 'JFK',  
        // Missing destination field  
        departureDate: '2023-12-25'  
      });  
      
    expect(response.status).toBe(400);  
    expect(response.body.success).toBe(false);  
  });  
});