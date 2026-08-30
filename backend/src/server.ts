import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { Logger } from './utils/logger';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const app = await createApp();
    app.listen(PORT, () => {
      Logger.info(`🚀 SmartEnterpriseHub API Server running on port ${PORT}`);
    });
  } catch (error) {
    Logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
