import { Router, Response, NextFunction } from 'express';
import { DatabaseContext } from '../../database/db';
import { ResponseUtils } from '../../utils/response';
import { authenticateJwt, AuthenticatedRequest } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticateJwt);

router.get('/', (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const logs = DatabaseContext.auditLogs.slice(-50).reverse();
    return ResponseUtils.success(res, logs, 'System audit logs retrieved');
  } catch (err) {
    next(err);
  }
});

export default router;
