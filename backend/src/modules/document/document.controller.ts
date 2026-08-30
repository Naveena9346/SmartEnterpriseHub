import { Response, NextFunction } from 'express';
import { DocumentService } from './document.service';
import { ResponseUtils } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';

export class DocumentController {
  private docService = new DocumentService();

  public getDocuments = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.docService.getDocuments(req.user!.orgId);
      ResponseUtils.success(res, result, 'Document library list retrieved');
    } catch (error) {
      next(error);
    }
  };

  public uploadDocument = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.docService.uploadDocument(req.user!.orgId, req.user!.userId, req.body);
      ResponseUtils.created(res, result, 'Document uploaded to repository');
    } catch (error) {
      next(error);
    }
  };
}
