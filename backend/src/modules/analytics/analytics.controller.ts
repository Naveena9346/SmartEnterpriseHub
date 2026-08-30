import { Response, NextFunction } from 'express';
import { AnalyticsService } from './analytics.service';
import { ResponseUtils } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';

export class AnalyticsController {
  private analyticsService = new AnalyticsService();

  public getDashboard = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.analyticsService.getExecutiveDashboardStats(req.user!.orgId);
      ResponseUtils.success(res, result, 'Executive dashboard metrics retrieved');
    } catch (error) {
      next(error);
    }
  };
}
