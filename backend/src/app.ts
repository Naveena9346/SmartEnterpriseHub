import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRouter from './modules/auth/auth.router';
import employeeRouter from './modules/employee/employee.router';
import projectRouter from './modules/project/project.router';
import taskRouter from './modules/task/task.router';
import workflowRouter from './modules/workflow/workflow.router';
import analyticsRouter from './modules/analytics/analytics.router';

import { globalErrorHandler } from './middleware/error.middleware';
import { DatabaseContext } from './database/db';

export const createApp = async (): Promise<Application> => {
  const app: Application = express();

  // Initialize seed data
  await DatabaseContext.initializeSeedData();

  // Global Middleware
  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'UP',
      system: 'SmartEnterpriseHub Enterprise API Engine',
      timestamp: new Date().toISOString()
    });
  });

  // API Routes
  const apiV1 = '/api/v1';
  app.use(`${apiV1}/auth`, authRouter);
  app.use(`${apiV1}/employees`, employeeRouter);
  app.use(`${apiV1}/projects`, projectRouter);
  app.use(`${apiV1}/tasks`, taskRouter);
  app.use(`${apiV1}/workflows`, workflowRouter);
  app.use(`${apiV1}/analytics`, analyticsRouter);

  // Global Error Handler
  app.use(globalErrorHandler);

  return app;
};
