import { Router, Response, NextFunction } from 'express';
import { DatabaseContext } from '../../database/db';
import { ResponseUtils } from '../../utils/response';
import { authenticateJwt, AuthenticatedRequest } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticateJwt);

router.get('/', (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const org = DatabaseContext.organizations.find((o) => o.id === req.user!.orgId) || DatabaseContext.organizations[0];
    return ResponseUtils.success(res, {
      organizationName: org.name,
      orgCode: org.code,
      domain: org.domain,
      settings: org.settings,
      securityPolicy: {
        mfaRequired: true,
        passwordExpiryDays: 90,
        sessionTimeoutMinutes: 30
      }
    }, 'System settings retrieved');
  } catch (err) {
    next(err);
  }
});

export default router;
