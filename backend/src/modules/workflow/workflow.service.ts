import { DatabaseContext, WorkflowEntity, ApprovalRequestEntity, ApprovalStepEntity } from '../../database/db';
import { NotFoundError, ForbiddenError } from '../../utils/errors';
import { UserRole, ApprovalAction, WorkflowModuleType } from '../../config/constants';

export class WorkflowService {
  public async getApprovalRequests(userId: string, userRole: UserRole) {
    const requests = DatabaseContext.approvalRequests;
    const userSteps = DatabaseContext.approvalSteps;

    return requests.map((req) => {
      const steps = userSteps.filter((s) => s.approvalRequestId === req.id);
      const currentStepObj = steps.find((s) => s.stepNumber === req.currentStep);
      const requester = DatabaseContext.users.find((u) => u.id === req.requesterId);
      const requesterProfile = DatabaseContext.userProfiles.find((p) => p.userId === req.requesterId);

      const canApprove =
        req.status === ApprovalAction.PENDING &&
        currentStepObj &&
        (currentStepObj.approverRole === userRole || userRole === UserRole.SUPER_ADMIN);

      return {
        ...req,
        requesterName: requesterProfile ? `${requesterProfile.firstName} ${requesterProfile.lastName}` : requester?.email || 'N/A',
        steps,
        currentApproverRole: currentStepObj?.approverRole,
        canUserApprove: canApprove
      };
    });
  }

  public async processApprovalStep(
    requestId: string,
    userId: string,
    userRole: UserRole,
    action: ApprovalAction,
    comments?: string
  ) {
    const request = DatabaseContext.approvalRequests.find((r) => r.id === requestId);
    if (!request) throw new NotFoundError('Approval request not found');

    if (request.status !== ApprovalAction.PENDING) {
      throw new ForbiddenError('This approval request has already been finalized');
    }

    const steps = DatabaseContext.approvalSteps.filter((s) => s.approvalRequestId === request.id);
    const currentStepObj = steps.find((s) => s.stepNumber === request.currentStep);

    if (!currentStepObj) throw new NotFoundError('Approval step configuration missing');

    if (currentStepObj.approverRole !== userRole && userRole !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenError(`Only users with role '${currentStepObj.approverRole}' can approve this step.`);
    }

    currentStepObj.action = action;
    currentStepObj.approverUserId = userId;
    currentStepObj.comments = comments;
    currentStepObj.actedAt = new Date().toISOString();

    if (action === ApprovalAction.REJECTED) {
      request.status = ApprovalAction.REJECTED;
    } else if (action === ApprovalAction.APPROVED) {
      const nextStepObj = steps.find((s) => s.stepNumber === request.currentStep + 1);
      if (nextStepObj) {
        request.currentStep += 1;
      } else {
        request.status = ApprovalAction.APPROVED;
        // Update linked entity status (e.g. Expense status)
        if (request.entityType === 'EXPENSE') {
          const expense = DatabaseContext.expenses.find((e) => e.id === request.entityId);
          if (expense) expense.status = 'APPROVED' as any;
        }
      }
    }

    return {
      request,
      currentStep: currentStepObj
    };
  }

  public async createWorkflow(orgId: string, data: any) {
    const newWf: WorkflowEntity = {
      id: `wf-${Date.now()}`,
      orgId,
      name: data.name,
      moduleType: data.moduleType || WorkflowModuleType.CUSTOM,
      description: data.description || '',
      isActive: true
    };
    DatabaseContext.workflows.push(newWf);
    return newWf;
  }
}
