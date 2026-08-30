import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { UserRole, ROLE_HIERARCHY } from '../config/constants';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';

export const requireRoles = (...allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (req.user.role === UserRole.SUPER_ADMIN) {
      return next(); // Super Admin bypasses role checks
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ForbiddenError(
          `Role '${req.user.role}' is not authorized to access this endpoint. Required roles: ${allowedRoles.join(', ')}`
        )
      );
    }

    next();
  };
};

export const requireMinRoleLevel = (minRole: UserRole) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    const userLevel = ROLE_HIERARCHY[req.user.role] || 0;
    const requiredLevel = ROLE_HIERARCHY[minRole] || 100;

    if (userLevel < requiredLevel) {
      return next(
        new ForbiddenError(
          `Insufficient permission level. Your role level (${userLevel}) is lower than required level (${requiredLevel}).`
        )
      );
    }

    next();
  };
};
