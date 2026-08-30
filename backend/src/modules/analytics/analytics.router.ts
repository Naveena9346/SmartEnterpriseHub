import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';

const router = Router();
const controller = new AnalyticsController();

router.use(authenticateJwt);
router.get('/dashboard', controller.getDashboard);

export default router;
