import { Router } from 'express';
import { ProjectController } from './project.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';
import { requireRoles } from '../../middleware/rbac.middleware';
import { UserRole } from '../../config/constants';

const router = Router();
const controller = new ProjectController();

router.use(authenticateJwt);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post(
  '/',
  requireRoles(UserRole.SUPER_ADMIN, UserRole.ORG_ADMIN, UserRole.PROJECT_MANAGER),
  controller.create
);
router.put(
  '/:id',
  requireRoles(UserRole.SUPER_ADMIN, UserRole.ORG_ADMIN, UserRole.PROJECT_MANAGER),
  controller.update
);

export default router;
