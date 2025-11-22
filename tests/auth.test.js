const request = require('supertest');
const app = require('../src/app');
const db = require('./utils/testDb');

// Setup Database
beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('Auth API', () => {
  
  it('should register a new user with full health profile', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        age: 25,
        gender: 'Male',
        bloodGroup: 'O+',
        height: 175,
        weight: 70
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.name).toBe('Test User');
  });

  it('should not register user with existing email', async () => {
    // First registration
    await request(app).post('/api/auth/register').send({
      name: 'User 1',
      email: 'duplicate@example.com',
      password: '123'
    });

    // Duplicate registration
    const res = await request(app).post('/api/auth/register').send({
      name: 'User 2',
      email: 'duplicate@example.com',
      password: '456'
    });

    expect(res.statusCode).toEqual(400); 
    expect(res.body.success).toBe(false);
  });

  it('should login with correct credentials', async () => {
    // Register first
    await request(app).post('/api/auth/register').send({
      name: 'Login User',
      email: 'login@example.com',
      password: 'password123'
    });

    // Login
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@example.com',
      password: 'password123'
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('token');
  });

  it('should reject login with invalid password', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Hacker',
      email: 'hacker@example.com',
      password: 'securepassword'
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'hacker@example.com',
      password: 'wrongpassword'
    });

    expect(res.statusCode).toEqual(401);
  });
});