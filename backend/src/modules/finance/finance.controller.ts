import { Response, NextFunction } from 'express';
import { FinanceService } from './finance.service';
import { ResponseUtils } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';

export class FinanceController {
  private financeService = new FinanceService();

  public getInvoices = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.financeService.getInvoices(req.user!.orgId);
      ResponseUtils.success(res, result, 'Invoices retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  public getExpenses = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.financeService.getExpenses(req.user!.orgId);
      ResponseUtils.success(res, result, 'Expenses retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  public createInvoice = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.financeService.createInvoice(req.user!.orgId, req.body);
      ResponseUtils.created(res, result, 'Invoice created successfully');
    } catch (error) {
      next(error);
    }
  };
}
