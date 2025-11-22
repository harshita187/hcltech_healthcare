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
    expect(res.body.data.steps.target).toBe(6000); 
    expect(res.body.data.customGoals).toEqual([]); // Initialized empty
  });

  it('should update steps count via metric route', async () => {
    // Note: Route changed to /metric/:metric
    const res = await request(app)
      .patch('/api/wellness/metric/steps')
      .set('Authorization', `Bearer ${token}`)
      .send({ current: 5000 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.steps.current).toBe(5000);
  });

  it('should update activity metrics', async () => {
    const res = await request(app)
      .patch('/api/wellness/metric/activity')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        minutes: 45,
        caloriesBurned: 300
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.activity.minutes).toBe(45);
  });

  // --- New Tests for Custom Goals ---

  it('should add a new custom goal', async () => {
    const res = await request(app)
      .post('/api/wellness/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Drink Water' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.customGoals).toHaveLength(1);
    expect(res.body.data.customGoals[0].title).toBe('Drink Water');
    expect(res.body.data.customGoals[0].isCompleted).toBe(false);
  });

  it('should toggle a custom goal status', async () => {
    // 1. Add Goal
    const addRes = await request(app)
      .post('/api/wellness/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Meditate' });
    
    const goalId = addRes.body.data.customGoals[0]._id;

    // 2. Toggle Goal
    const toggleRes = await request(app)
      .patch(`/api/wellness/goals/${goalId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(toggleRes.statusCode).toEqual(200);
    expect(toggleRes.body.data.customGoals[0].isCompleted).toBe(true);
  });

  it('should delete a custom goal', async () => {
    // 1. Add Goal
    const addRes = await request(app)
      .post('/api/wellness/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Delete Me' });
    
    const goalId = addRes.body.data.customGoals[0]._id;

    // 2. Delete Goal
    const deleteRes = await request(app)
      .delete(`/api/wellness/goals/${goalId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteRes.statusCode).toEqual(200);
    expect(deleteRes.body.data.customGoals).toHaveLength(0);
  });
});