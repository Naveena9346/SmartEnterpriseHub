import { Response, NextFunction } from 'express';
import { WorkflowService } from './workflow.service';
import { ResponseUtils } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';

export class WorkflowController {
  private workflowService = new WorkflowService();

  public getApprovalRequests = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.workflowService.getApprovalRequests(req.user!.userId, req.user!.role);
      ResponseUtils.success(res, result, 'Approval requests retrieved');
    } catch (error) {
      next(error);
    }
  };

  public processStep = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { action, comments } = req.body;
      const result = await this.workflowService.processApprovalStep(
        req.params.requestId,
        req.user!.userId,
        req.user!.role,
        action,
        comments
      );
      ResponseUtils.success(res, result, 'Approval action recorded successfully');
    } catch (error) {
      next(error);
    }
  };

  public createWorkflow = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.workflowService.createWorkflow(req.user!.orgId, req.body);
      ResponseUtils.created(res, result, 'Workflow template created');
    } catch (error) {
      next(error);
    }
  };
}
