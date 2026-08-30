import { Router } from 'express';
import { TaskController } from './task.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';

const router = Router();
const controller = new TaskController();

router.use(authenticateJwt);

router.get('/my-tasks', controller.getMyTasks);
router.get('/project/:projectId', controller.getByProject);
router.post('/', controller.create);
router.patch('/:id/status', controller.updateStatus);
router.post('/:id/worklog', controller.addWorklog);

export default router;
