import { Response, NextFunction } from 'express';
import { TaskService } from './task.service';
import { ResponseUtils } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';

export class TaskController {
  private taskService = new TaskService();

  public getByProject = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.taskService.getByProject(req.params.projectId);
      ResponseUtils.success(res, result, 'Project tasks retrieved');
    } catch (error) {
      next(error);
    }
  };

  public getMyTasks = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.taskService.getMyTasks(req.user!.userId);
      ResponseUtils.success(res, result, 'Assigned tasks retrieved');
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.taskService.create(req.user!.userId, req.body);
      ResponseUtils.created(res, result, 'Task created successfully');
    } catch (error) {
      next(error);
    }
  };

  public updateStatus = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.taskService.updateStatus(req.params.id, req.body.status);
      ResponseUtils.success(res, result, 'Task status updated');
    } catch (error) {
      next(error);
    }
  };

  public addWorklog = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { hours, description } = req.body;
      const result = await this.taskService.addWorklog(req.params.id, req.user!.userId, hours, description);
      ResponseUtils.created(res, result, 'Worklog recorded');
    } catch (error) {
      next(error);
    }
  };
}
