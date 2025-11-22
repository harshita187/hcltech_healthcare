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
    password: 'password123'
  });
  return res.body.data.token;
};

describe('User Profile API', () => {
  beforeEach(async () => {
    token = await createTestUser();
  });

  it('should get user profile', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.name).toBe('Profile User');
    expect(res.body.data).not.toHaveProperty('password'); // Security check
  });

  it('should update user details (age and blood group)', async () => {
    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: 30,
        bloodGroup: 'O+'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.age).toBe(30);
    expect(res.body.data.bloodGroup).toBe('O+');
  });
});