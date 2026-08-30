import request from 'supertest';
import { createApp } from '../src/app';
import { Application } from 'express';

describe('4. Multi-Step Workflow & Approval Engine Test Suite', () => {
  let app: Application;
  let teamMgrToken: string;

  beforeAll(async () => {
    app = await createApp();
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'teammanager@smartenterprisehub.com', password: 'Admin@123456' });
    teamMgrToken = loginRes.body.data.accessToken;
  });

  it('should retrieve pending approval requests for team manager', async () => {
    const res = await request(app)
      .get('/api/v1/workflows/approvals')
      .set('Authorization', `Bearer ${teamMgrToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should process and approve a pending step in workflow', async () => {
    const approvalsRes = await request(app)
      .get('/api/v1/workflows/approvals')
      .set('Authorization', `Bearer ${teamMgrToken}`);

    const reqId = approvalsRes.body.data[0]?.id;
    if (reqId) {
      const actionRes = await request(app)
        .post(`/api/v1/workflows/approvals/${reqId}/action`)
        .set('Authorization', `Bearer ${teamMgrToken}`)
        .send({
          action: 'APPROVED',
          comments: 'Expense verified against receipt'
        });

      expect(actionRes.status).toBe(200);
      expect(actionRes.body.success).toBe(true);
    }
  });
});
