import { Response, NextFunction } from 'express';
import { EmployeeService } from './employee.service';
import { ResponseUtils } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';

export class EmployeeController {
  private employeeService = new EmployeeService();

  public getAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const search = req.query.search as string;
      const deptId = req.query.deptId as string;
      const result = await this.employeeService.getAll(req.user!.orgId, search, deptId);
      ResponseUtils.success(res, result, 'Employees retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.employeeService.getById(req.params.id, req.user!.orgId);
      ResponseUtils.success(res, result, 'Employee details retrieved');
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.employeeService.create(req.user!.orgId, req.body);
      ResponseUtils.created(res, result, 'Employee profile created successfully');
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.employeeService.update(req.params.id, req.user!.orgId, req.body);
      ResponseUtils.success(res, result, 'Employee profile updated');
    } catch (error) {
      next(error);
    }
  };
}
