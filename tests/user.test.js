const request = require('supertest');
const app = require('../src/app');
const db = require('./utils/testDb');

let token;

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

const createTestUser = async () => {
  const res = await request(app).post('/api/auth/register').send({
    name: 'Profile User',
    email: 'profile@example.com',
    password: 'password123',
    age: 30,
    bloodGroup: 'O+'
  });
  return res.body.data.token;
};

describe('User Profile API', () => {
  beforeEach(async () => {
    token = await createTestUser();
  });

  it('should get user profile details', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.name).toBe('Profile User');
    expect(res.body.data.bloodGroup).toBe('O+');
    expect(res.body.data).not.toHaveProperty('password'); 
  });

  it('should update user details via API', async () => {
    // Even if frontend is read-only, backend API supports updates
    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        weight: 80,
        height: 180
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.weight).toBe(80);
    expect(res.body.data.height).toBe(180);
  });
});