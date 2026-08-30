import { Response, NextFunction } from 'express';
import { CrmService } from './crm.service';
import { ResponseUtils } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';

export class CrmController {
  private crmService = new CrmService();

  public getCustomers = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const search = req.query.search as string;
      const result = await this.crmService.getCustomers(req.user!.orgId, search);
      ResponseUtils.success(res, result, 'Customers retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  public getLeads = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.crmService.getLeads(req.user!.orgId);
      ResponseUtils.success(res, result, 'Leads retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  public createCustomer = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.crmService.createCustomer(req.user!.orgId, req.body);
      ResponseUtils.created(res, result, 'Customer directory record created');
    } catch (error) {
      next(error);
    }
  };

  public createLead = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.crmService.createLead(req.user!.orgId, req.user!.userId, req.body);
      ResponseUtils.created(res, result, 'Sales lead created');
    } catch (error) {
      next(error);
    }
  };
}
