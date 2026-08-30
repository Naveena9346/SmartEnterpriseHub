import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { ResponseUtils } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';

export class AuthController {
  private authService = new AuthService();

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.login(req.body);
      ResponseUtils.success(res, result, 'User logged in successfully');
    } catch (error) {
      next(error);
    }
  };

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.register(req.body);
      ResponseUtils.created(res, result, 'User registered successfully');
    } catch (error) {
      next(error);
    }
  };

  public getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.authService.getProfile(req.user!.userId);
      ResponseUtils.success(res, result, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  };
}
