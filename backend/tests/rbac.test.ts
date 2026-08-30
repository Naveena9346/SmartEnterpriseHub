import request from 'supertest';
import { createApp } from '../src/app';
import { Application } from 'express';

describe('5. Role-Based Access Control (RBAC) & Security Test Suite', () => {
  let app: Application;
  let employeeToken: string;

  beforeAll(async () => {
    app = await createApp();
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'employee1@smartenterprisehub.com', password: 'Admin@123456' });
    employeeToken = loginRes.body.data.accessToken;
  });

  it('should block regular EMPLOYEE from creating new employee profiles (Forbidden 403)', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send({
        email: 'hacker@unauthorized.com',
        password: 'Password123',
        firstName: 'Unauthorized',
        lastName: 'User'
      });

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('is not authorized');
  });

  it('should block unauthenticated requests without bearer token (Unauthorized 401)', async () => {
    const res = await request(app).get('/api/v1/analytics/dashboard');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
