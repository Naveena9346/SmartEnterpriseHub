import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { ResponseUtils } from '../utils/response';
import { Logger } from '../utils/logger';

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  Logger.error(err.message, { stack: err.stack });

  if (err instanceof AppError) {
    return ResponseUtils.error(res, err.message, err.statusCode, err.errors);
  }

  // Handle default internal server errors
  return ResponseUtils.error(
    res,
    process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    500
  );
};
