import request from 'supertest';
import { createApp } from '../src/app';
import { Application } from 'express';

describe('1. Authentication Module Test Suite', () => {
  let app: Application;

  beforeAll(async () => {
    app = await createApp();
  });

  it('should successfully authenticate super admin with valid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@smartenterprisehub.com',
        password: 'Admin@123456'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('refreshToken');
    expect(res.body.data.user.role).toBe('SUPER_ADMIN');
  });

  it('should reject login attempt with invalid password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@smartenterprisehub.com',
        password: 'WrongPassword123'
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Invalid credentials');
  });

  it('should register a new employee user account', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'newemployee@smartenterprisehub.com',
        password: 'Password@123',
        firstName: 'John',
        lastName: 'Doe'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('newemployee@smartenterprisehub.com');
  });
});
