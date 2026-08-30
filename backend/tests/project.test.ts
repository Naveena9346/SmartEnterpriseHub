import request from 'supertest';
import { createApp } from '../src/app';
import { Application } from 'express';

describe('3. Project & Task Management Test Suite', () => {
  let app: Application;
  let token: string;
  let createdProjectId: string;

  beforeAll(async () => {
    app = await createApp();
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'projmanager@smartenterprisehub.com', password: 'Admin@123456' });
    token = loginRes.body.data.accessToken;
  });

  it('should create a new enterprise project', async () => {
    const res = await request(app)
      .post('/api/v1/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'CRM Pipeline Automation Engine',
        code: 'CRM-AUTO',
        description: 'Automating leads and sales pipelines',
        budget: 120000
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('CRM Pipeline Automation Engine');
    createdProjectId = res.body.data.id;
  });

  it('should add a task to the project and update its status', async () => {
    const taskRes = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        projectId: createdProjectId,
        title: 'Design Sales Pipeline Database Schema',
        estimatedHours: 16
      });

    expect(taskRes.status).toBe(201);
    const taskId = taskRes.body.data.id;

    const patchRes = await request(app)
      .patch(`/api/v1/tasks/${taskId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'IN_PROGRESS' });

    expect(patchRes.status).toBe(200);
    expect(patchRes.body.data.status).toBe('IN_PROGRESS');
  });
});
