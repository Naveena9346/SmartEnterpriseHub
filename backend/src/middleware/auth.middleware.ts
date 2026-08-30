import { Request, Response, NextFunction } from 'express';
import { JwtUtils, TokenPayload } from '../utils/jwt';
import { UnauthorizedError } from '../utils/errors';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const authenticateJwt = (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Access token required in Authorization header');
    }

    const token = authHeader.split(' ')[1];
    const decoded = JwtUtils.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid or expired authentication token'));
  }
};
