import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    [key: string]: any;
  };
  errors?: any;
  timestamp: string;
}

export class ResponseUtils {
  public static success<T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200,
    meta?: ApiResponse['meta']
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      meta,
      timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(response);
  }

  public static created<T>(
    res: Response,
    data: T,
    message: string = 'Resource created successfully'
  ): Response {
    return this.success(res, data, message, 201);
  }

  public static error(
    res: Response,
    message: string = 'An error occurred',
    statusCode: number = 500,
    errors?: any
  ): Response {
    const response: ApiResponse = {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(response);
  }
}
