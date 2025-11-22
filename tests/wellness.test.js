const request = require('supertest');
const app = require('../src/app');
const db = require('./utils/testDb');

let token;

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

// Helper to create user and get token
const createTestUser = async () => {
  const res = await request(app).post('/api/auth/register').send({
    name: 'Wellness User',
    email: 'wellness@example.com',
    password: 'password123'
  });
  return res.body.data.token;
};

describe('Wellness API', () => {
  beforeEach(async () => {
    token = await createTestUser();
  });

  it('should fetch dashboard data (auto-initialized)', async () => {
    const res = await request(app)
      .get('/api/wellness')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('steps');
    expect(res.body.data.steps.target).toBe(6000); // Default from Service
    expect(res.body.data.sleep.bedTime).toBe('11:30 PM'); // Default from Service
  });

  it('should update steps count', async () => {
    const res = await request(app)
      .patch('/api/wellness/steps')
      .set('Authorization', `Bearer ${token}`)
      .send({ current: 5000 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.steps.current).toBe(5000);
  });

  it('should update activity metrics', async () => {
    const res = await request(app)
      .patch('/api/wellness/activity')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        minutes: 45,
        caloriesBurned: 300
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.activity.minutes).toBe(45);
    expect(res.body.data.activity.caloriesBurned).toBe(300);
  });
});