import request from 'supertest';
import { createApp } from '../src/app';
import { Application } from 'express';

describe('2. Employee Management Test Suite', () => {
  let app: Application;
  let adminToken: string;

  beforeAll(async () => {
    app = await createApp();
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'hrmanager@smartenterprisehub.com', password: 'Admin@123456' });
    adminToken = loginRes.body.data.accessToken;
  });

  it('should list all employees for authorized HR Manager', async () => {
    const res = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should create a new employee profile', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        email: 'alice.engineer@smartenterprisehub.com',
        password: 'SecurePass@123',
        firstName: 'Alice',
        lastName: 'Smith',
        designation: 'Senior Backend Engineer',
        salaryAmount: 110000
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('alice.engineer@smartenterprisehub.com');
  });
});
