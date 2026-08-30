import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { DatabaseContext, AuditLogEntity } from '../database/db';

export const auditLogger = (actionName: string, entityName: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    res.on('finish', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        if (req.user) {
          const auditEntry: AuditLogEntity = {
            id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            orgId: req.user.orgId,
            userId: req.user.userId,
            action: actionName,
            entityName: entityName,
            entityId: req.params.id || req.body?.id || 'N/A',
            changesJson: req.body ? JSON.stringify(req.body) : undefined,
            ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1',
            timestamp: new Date().toISOString()
          };
          DatabaseContext.auditLogs.push(auditEntry);
        }
      }
    });
    next();
  };
};
