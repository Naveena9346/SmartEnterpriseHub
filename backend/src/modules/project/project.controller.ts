import { Response, NextFunction } from 'express';
import { ProjectService } from './project.service';
import { ResponseUtils } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';

export class ProjectController {
  private projectService = new ProjectService();

  public getAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const search = req.query.search as string;
      const result = await this.projectService.getAll(req.user!.orgId, search);
      ResponseUtils.success(res, result, 'Projects retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.projectService.getById(req.params.id, req.user!.orgId);
      ResponseUtils.success(res, result, 'Project details retrieved');
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.projectService.create(req.user!.orgId, req.user!.userId, req.body);
      ResponseUtils.created(res, result, 'Project created successfully');
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.projectService.update(req.params.id, req.user!.orgId, req.body);
      ResponseUtils.success(res, result, 'Project updated');
    } catch (error) {
      next(error);
    }
  };
}
