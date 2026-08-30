import { Router } from 'express';
import { WorkflowController } from './workflow.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';
import { auditLogger } from '../../middleware/audit.middleware';

const router = Router();
const controller = new WorkflowController();

router.use(authenticateJwt);

router.get('/approvals', controller.getApprovalRequests);
router.post('/approvals/:requestId/action', auditLogger('PROCESS_APPROVAL', 'WORKFLOW'), controller.processStep);
router.post('/templates', auditLogger('CREATE_WORKFLOW', 'WORKFLOW'), controller.createWorkflow);

export default router;
