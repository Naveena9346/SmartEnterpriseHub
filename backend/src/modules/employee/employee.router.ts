import { Router } from 'express';
import { EmployeeController } from './employee.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/rbac.middleware';
import { UserRole } from '../../config/constants';
import { auditLogger } from '../../middleware/audit.middleware';

const router = Router();
const controller = new EmployeeController();

router.use(authenticateJwt);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post(
  '/',
  requireRoles(UserRole.SUPER_ADMIN, UserRole.ORG_ADMIN, UserRole.HR_MANAGER),
  auditLogger('CREATE_EMPLOYEE', 'EMPLOYEE'),
  controller.create
);
router.put(
  '/:id',
  requireRoles(UserRole.SUPER_ADMIN, UserRole.ORG_ADMIN, UserRole.HR_MANAGER),
  auditLogger('UPDATE_EMPLOYEE', 'EMPLOYEE'),
  controller.update
);

export default router;
